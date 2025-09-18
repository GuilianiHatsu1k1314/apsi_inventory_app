import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
    localStorage.clear(); 
    navigate("/");        
  };
  return (
    <aside className="h-full w-3xs bg-gray-200">
      <nav className="pt-5">
        <ul>
          <li>
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/customer"
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/distributor"
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Distributor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/warehouse"
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Warehouse Module
            </NavLink>
          </li>
					<li>
            <NavLink
              to="/app/accounting"
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Accounting
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/app/customer-service"
              className={({ isActive }) =>
                `block pl-5 text-xl py-2 ${
                  isActive
                    ? "bg-[var(--dali-purple)] text-white"
                    : "hover:bg-[var(--dali-purple)] hover:text-white"
                }`
              }
            >
              Customer Service
            </NavLink>
          </li>
          <li className="pl-5 text-xl mt-16 hover:bg-[var(--dali-purple)] hover:text-white">
            Reports
          </li>
					<li
						onClick={handleLogout} 
						className="pl-5 py-2 text-xl mt-16 hover:bg-[var(--dali-purple)] hover:text-white cursor-pointer">
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};
	