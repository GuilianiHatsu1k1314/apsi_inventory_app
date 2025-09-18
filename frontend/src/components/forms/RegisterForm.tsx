import { useNavigate } from "react-router-dom";
//copied the style of LoginForm.tsx
interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegisterForm({
  username,
  setUsername,
  password,
  setPassword,
}: Props) {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please fill out all fields");
      return;
    }

    alert(`Account for "${username}" created (mock). Please log in.`);
    navigate("/"); //back to login
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col w-sm p-14 pt-0 gap-8"
    >
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-3 p-2 font-semibold 
                   placeholder-[var(--dali-purple)]
                   border-[var(--dali-purple)] rounded-[16px]
                   focus:border-violet-600 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-3 p-2 font-semibold
                   placeholder-[var(--dali-purple)]
                   border-[var(--dali-purple)] rounded-[16px]
                   focus:border-violet-600 focus:outline-none"
      />
      <button
        type="submit"
        className="w-34 px-4 py-3 self-center bg-green-500 text-white font-semibold rounded-[17px]
                   hover:bg-green-600"
      >
        Register
      </button>
    </form>
  );
}
