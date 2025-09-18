import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { InventoryAppPage } from "./pages/InventoryAppPage";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Customer } from "./pages/Admin/Customer";
import WarehouseModule from "./pages/Admin/Warehouse";
import { Distributor } from "./pages/Admin/Distributor";
import { AccountingPage } from "./pages/Admin/Accounting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
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
        element: <WarehouseModule />
      },
      {
        path: "distributor",
        element: <Distributor />
      },
      {
        path: "accounting",
        element: <AccountingPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
