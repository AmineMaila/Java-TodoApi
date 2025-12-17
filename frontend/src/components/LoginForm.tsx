import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginFormSchema = z.object({
	username: z.string().nonempty("Field required").max(100),
	password: z.string().nonempty("Field required").max(100)
})

type LoginFormType = z.infer<typeof LoginFormSchema>

const LoginForm = () => {
	const { register, formState: { errors }, handleSubmit} = useForm({
		resolver: zodResolver(LoginFormSchema),
		mode: "onChange"
	})

	const onSubmit = (data: LoginFormType) => {
		alert(JSON.stringify(data));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col px-10 gap-3 mt-25 w-[500px] border border-white/5 bg-white/5 rounded-lg'>
			<h2 className='text-3xl self-center'>Log in</h2>

			<input type="text" placeholder='Username' {...register("username")}/>
			<div className='min-h-6'>
				{errors.username && <span className='text-red-500'>{errors.username.message as string}</span>}
			</div>

			<input type="password" placeholder='Password' {...register("password")}/>
			<div className='min-h-6'>
				{errors.password && <span className='text-red-500'>{errors.password.message as string}</span>}
			</div>
			<button type='submit' className='border self-center rounded-xl px-4 uppercase cursor-pointer transition-all duration-300 hover:scale-105 focus:scale-98 py-1 text-xl text-black bg-white/90'>Login</button>
		</form>
	);
}

export default LoginForm;