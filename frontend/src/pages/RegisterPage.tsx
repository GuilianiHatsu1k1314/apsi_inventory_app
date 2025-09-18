import RegisterForm from "../components/forms/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-4">
      <img src={logo} className="h-82" alt="logo" />

      <RegisterForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />

      <button
        onClick={() => navigate("/")}
        className="text-blue-500 hover:underline"
      >
        Back to Login
      </button>
    </main>
  );
};
