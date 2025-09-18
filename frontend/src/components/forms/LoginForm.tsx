interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  loading: boolean;
  error?: string | null;
}

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  loading,
  error,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col w-sm p-14 pt-0 gap-8"
    >
      <input
        type="email"
        placeholder="Email"
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
        disabled={loading}
        className="w-34 px-4 py-3 self-center bg-[var(--dali-purple)] text-white font-semibold rounded-[17px]
                   hover:bg-violet-600"
      >
        {loading ? "Logging in..." : "Submit"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
