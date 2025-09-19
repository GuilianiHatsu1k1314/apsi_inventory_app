import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/forms/LoginForm";

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
      } else if (role === "Team Leader") {
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

  return (
    <div className="flex justify-center items-center min-h-screen">
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
