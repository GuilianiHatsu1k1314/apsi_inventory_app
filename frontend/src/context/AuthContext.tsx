import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/SupabaseClient";

type AuthContextType = {
  user: User | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    setUser(data.user);

    const { data: account, error: roleError } = await supabase
      .from("accounts")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (roleError) throw roleError;

    if (account?.role) {
      setRole(account.role);
      localStorage.setItem("role", account.role);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    localStorage.removeItem("role");
  };

  useEffect(() => {
    supabase.auth.getUser().then(async (res: { data: { user: User | null } }) => {
      const user = res.data?.user;
      if (user) {
        setUser(user);
        const { data: account } = await supabase
          .from("accounts")
          .select("role")
          .eq("id", user.id)
          .single();
        if (account?.role) {
          setRole(account.role);
          localStorage.setItem("role", account.role);
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
