import RegisterForm from "../components/forms/RegisterForm";
import { useState, useEffect } from "react";
import { supabase } from "../lib/SupabaseClient";
import logo from "../assets/logo.png";
import background from '../assets/login-background.png'


export const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>(""); //Start empty, must select a role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleRegister = async () => {
    setLoading(true);
    setError(null);

    if (!email.trim() || !password.trim() || !role.trim()) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      //Sign up the user then attach a role in metadata
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }, //Role goes into raw_user_meta_data
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      alert(
        "Registration successful! Please check your email to confirm your account."
      );
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    document.title = "Register";
  },[]);

  return (
    <main style={{ backgroundImage: `url(${background})` }} className="h-screen flex flex-col justify-center items-center space-y-4 bg-cover bg-center">
      <img src={logo} className="h-82" alt="logo" />

      <RegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        onSubmit={handleRegister}
        loading={loading}
        error={error}
        registered={false}
      />
    </main>
  );
};
