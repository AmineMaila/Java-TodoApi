import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

const NewAccount = z.object({
	username: z.string().nonempty("This Field is required").min(3).max(25),
	email: z.string().nonempty("This Field is required").email().max(100),
	password: z.string().nonempty("This Field is required").min(6).max(100),
	confirmPassword: z.string().nonempty("This Field is required")
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"]
})

type NewAccount = z.infer<typeof NewAccount>

const useDebounce = (value: any, delay : number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue({ value })
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);
	return debouncedValue
}

const SecureSignupForm = () => {
	const [checking, setChecking] = useState(false);
	const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors } = useForm({
		resolver: zodResolver(NewAccount),
		mode: "onChange"
	});
	const count = useRef(0);

	count.current++;

	const usernameValue = watch("username");

	const debouncedUsername: { value : string } = useDebounce(usernameValue, 2000);

	const onSubmit = (data: NewAccount) => {
		alert(JSON.stringify(data));
	}

	useEffect(() => {
		console.log(errors);
		console.log("UsernameValue: ", debouncedUsername);
		if (!debouncedUsername?.value || errors.username) {
			console.log("Test");
			return;
		}
		
		const checkAvailablility = async () => {
			setChecking(true);
			try {
				await new Promise(resolve => setTimeout(resolve, 1000)); // execution pauses here 7na kanbdlo admin admi
				console.log("Received Response");
				if (debouncedUsername.value === 'admin') {
					setError("username", {
						type: "manual",
						message: "Username is taken"
					});
				}


			} catch (e) {
				console.log("error checking availability: ", e);
			} finally {
				setChecking(false);
			}
		}

		checkAvailablility();
	}, [debouncedUsername])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mt-25 rounded-lg border border-white/10'>
			<label htmlFor="email" >Email: </label>
			<input type="text" {...register("email")} />
			<div className="h-7">
				{errors.email && <span className="font-bold text-red-500">{errors.email.message}</span>}
			</div>

			<label htmlFor="username" >Username: </label>
			<input type="text" {...register("username", {	
				onChange: () => {clearErrors('username'); console.log("Cleared Errors")}
			})}></input>
			<div className="h-7">
				{errors.username && <span className="font-bold text-red-500">{errors.username.message}</span>}
				{checking && <span className="font-bold text-blue-400">Checking availability...</span>}
			</div>

			<label htmlFor="password" >Password: </label>
			<input type="password" {...register("password")}></input>
			<div className="h-7">
				{errors.password && <span className="font-bold text-red-500">{errors.password.message}</span>}
			</div>

			<label htmlFor="confirmPassword" >Confirm Password: </label>
			<input type="password" {...register("confirmPassword")}></input>
			<div className="h-7">
				{errors.confirmPassword && <span className="font-bold text-red-500">{errors.confirmPassword.message}</span>}
			</div>

			<button type="submit" disabled={Object.keys(errors).length > 0} className="border rounded-xl bg-white/5 px-7 cursor-pointer hover:scale-105 transition-all duration-250">Sign up</button>
		</form>
	);
}

export default SecureSignupForm;
