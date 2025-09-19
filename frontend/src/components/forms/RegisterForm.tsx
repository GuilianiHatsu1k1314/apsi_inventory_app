interface Props {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
  registered: boolean;
}

export default function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  onSubmit,
  loading,
  error,
  registered
}: Props) {
    return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col w-sm p-14 pt-0 gap-6"
    >
      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 p-2 rounded-lg"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 p-2 rounded-lg"
      />

      {/* Role Dropdown */}
      <select
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border-2 p-2 rounded-lg"
      >
        <option value="">-- Select Role --</option>
        <option value="Admin">Admin</option>
        <option value="Customer Service">Customer Service</option>
        <option value="Team Lead">Team Lead</option>
        <option value="Accounting">Accounting</option>
        <option value="Warehouse">Warehouse</option>
      </select>

      {/* Error Display */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        {loading
          ? "Registering..."
          : registered
          ? "Registered!"
          : "Register"
        }
      </button>
    </form>
  );
}
