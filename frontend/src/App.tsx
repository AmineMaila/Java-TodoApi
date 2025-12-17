import './App.css'
import Logo from './components/Header';
import { Plus } from 'lucide-react';
import LoginForm from './components/LoginForm';
import SecureSignupForm from './components/SignupForm';

function App() {

	return (
		<div className='h-screen flex flex-col'>
			<header className='flex justify-between bg-[#242424] fixed top-0 left-0 shadow-black/8 shadow-4xl z-50 w-full px-10 h-[100px] items-center'>
				<Logo />
				<button 
					className='flex group transition-all *:duration-300 *:ease-in-out items-center justify-center gap-2 rounded-lg h-20 cursor-pointer'

				>
					<div className='flex group-hover:scale-110 group-active:scale-95'>
						<Plus className='w-8 h-8'/>
						<span className='playwrite text-3xl'>New</span>
					</div>
				</button>
			</header>
			<LoginForm />
			<SecureSignupForm/>
		</div>
	)
}

export default App
