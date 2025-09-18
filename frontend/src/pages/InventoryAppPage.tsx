import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { NavBar } from "../components/SideBar/SideBarNav";

export const InventoryAppPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="h-full flex flex-1 overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
