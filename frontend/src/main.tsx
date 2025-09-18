import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { InventoryAppPage } from "./pages/InventoryAppPage";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Customer } from "./pages/Admin/Customer";
import {WarehousePage} from "./pages/Admin/Warehouse";
import { Distributor } from "./pages/Admin/Distributor";
import { AccountingPage } from "./pages/Admin/Accounting";
import { RegisterPage } from "./pages/RegisterPage";
import { CSRPage } from "./pages/Admin/CustomerService";
import { TeamLeaderPage } from "./pages/Admin/TeamLead";

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
        element: <Dashboard /> 
      },
      {
        path: "customer",
        element: <Customer />
      },
      {
        path: "warehouse",
        element: <WarehousePage />
      },
      {
        path: "distributor",
        element: <Distributor />
      },
      {
        path: "accounting",
        element: <AccountingPage />
      },
      {
        path: "customer-service",
        element: <CSRPage />
      },
            {
        path: "team-lead",
        element: <TeamLeaderPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
