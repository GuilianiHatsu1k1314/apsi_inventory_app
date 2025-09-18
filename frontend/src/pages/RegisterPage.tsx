import RegisterForm from "../components/forms/RegisterForm";
import { useState } from "react";
import { supabase } from "../lib/SupabaseClient";
import logo from "../assets/logo.png";

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("CSR");
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
      //Sign up the user
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      alert(
        "Registration has been confirmed. Please check your email and confirm the account creation. NO EMAILS ARE SENT IF EMAIL ALREADY EXISTS."
      );
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
      />
    </main>
  );
};
