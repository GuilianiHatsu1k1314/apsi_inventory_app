import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import type { ReactNode } from "react";

interface RoleRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const { role } = useAuth();

  if (!role) {
    return <p>Loading...</p>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
}
