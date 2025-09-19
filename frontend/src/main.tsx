import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import { InventoryAppPage } from "./pages/InventoryAppPage";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Customer } from "./pages/Admin/Customer";
import { WarehousePage } from "./pages/Admin/Warehouse";
import { Distributor } from "./pages/Admin/Distributor";
import { AccountingPage } from "./pages/Admin/Accounting";
import { RegisterPage } from "./pages/RegisterPage";
import { CSRPage } from "./pages/Admin/CustomerService";
import { TeamLeaderPage } from "./pages/Admin/TeamLead";
import { ReportsPage } from "./pages/Admin/Reports";
import RoleRoute from "./routes/RoleRoutes";
import Unauthorized from "./pages/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "app",
    element: <InventoryAppPage />,
    children: [
      {
        index: true,
        element: (
          <RoleRoute allowedRoles={["Admin", "Warehouse", "Customer Service", "Team Lead", "Accounting"]}>
            <Dashboard />
          </RoleRoute>
        ),
      },
      {
        path: "customer",
        element: (
          <RoleRoute allowedRoles={["Admin", "Customer Service"]}>
            <Customer />
          </RoleRoute>
        ),
      },
      {
        path: "warehouse",
        element: (
          <RoleRoute allowedRoles={["Admin", "Warehouse"]}>
            <WarehousePage />
          </RoleRoute>
        ),
      },
      {
        path: "distributor",
        element: (
          <RoleRoute allowedRoles={["Admin", "Warehouse"]}>
            <Distributor />
          </RoleRoute>
        ),
      },
      {
        path: "accounting",
        element: (
          <RoleRoute allowedRoles={["Admin", "Accounting"]}>
            <AccountingPage />
          </RoleRoute>
        ),
      },
      {
        path: "customer-service",
        element: (
          <RoleRoute allowedRoles={["Admin", "Customer Service"]}>
            <CSRPage />
          </RoleRoute>
        ),
      },
      {
        path: "team-lead",
        element: (
          <RoleRoute allowedRoles={["Admin", "Team Lead"]}>
            <TeamLeaderPage />
          </RoleRoute>
        ),
      },
      {
        path: "report",
        element: (
          <RoleRoute allowedRoles={["Admin", "Team Lead", "Accounting"]}>
            <ReportsPage />
          </RoleRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
