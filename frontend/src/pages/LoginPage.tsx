import LoginForm from "../components/forms/LoginForm";
import logo from '../assets/logo.png'
export default function LoginPage(){
	return (
		<main className="h-screen flex flex-col justify-center items-center">
			<img src={logo} className="h-82"/>
			<LoginForm />
		</main>
	);
}