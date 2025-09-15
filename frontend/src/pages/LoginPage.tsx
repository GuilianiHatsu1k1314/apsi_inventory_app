import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import logo from '../assets/logo.png'
export default function LoginPage(){
	const[username, setUsername] = useState<string>("");
	const[password, setPassword] = useState<string>("");
	return (
		<main className="h-screen flex flex-col justify-center items-center">
			<img src={logo} className="h-82"/>
			<LoginForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}	
			/>
		</main>
	);
}