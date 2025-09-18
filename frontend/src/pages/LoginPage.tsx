import LoginForm from "../components/forms/LoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";
import logo from "../assets/logo.png";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        console.log("Logged in:", data.user);
        alert(`Welcome ${data.user.email}!`);
        
        //Redirect
        navigate("/app"); //will add logic to this in the future, depending on the roles.
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-4">
      <img src={logo} className="h-82" alt="logo" />

      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </main>
  );
};
