import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/forms/LoginForm";
import logo from '../assets/logo.png'
import background from '../assets/login-background.png'

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(username, password);

      const role = localStorage.getItem("role");

      if (role === "Customer Service") {
        window.location.href = "/app/customer-service";
      } else if (role === "Admin") {
        window.location.href = "/app";
      } else if (role === "Team Lead") {
        window.location.href = "/app/team-lead";
      } else if (role === "Warehouse") {
        window.location.href = "/app/warehouse";
      } else if (role === "Accounting") {
        window.location.href = "/app/accounting";
      } else {
        window.location.href = "/unauthorized";
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    document.title = "Login";
  },[]);
  
  return (
    <div style={{ backgroundImage: `url(${background})` }} className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center" >
      <img src={logo} className="h-64 mb-5"/>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
