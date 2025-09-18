import { NavLink } from "react-router-dom";

export const NavBar = () => {
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
          <li className="pl-5 text-xl mt-16 hover:bg-[var(--dali-purple)] hover:text-white">
            Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
};
	