import { NavLink, useNavigate } from "react-router-dom";

type Role = "Admin" | "Warehouse" | "Customer Service" | "Team Lead" | "Accounting";

export const NavBar = () => {
  const navigate = useNavigate();
  const role: Role | null = localStorage.getItem("role") as Role | null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Define which links are visible per role
  const links = [
    { to: "/app", label: "Dashboard", roles: ["Admin", "Warehouse", "Customer Service", "Team Lead", "Accounting"] },
    { to: "/app/customer", label: "Customer", roles: ["Admin", "Customer Service"] },
    { to: "/app/distributor", label: "Distributor", roles: ["Admin", "Warehouse"] },
    { to: "/app/warehouse", label: "Warehouse Module", roles: ["Admin", "Warehouse"] },
    { to: "/app/accounting", label: "Accounting", roles: ["Admin", "Accounting"] },
    { to: "/app/customer-service", label: "Customer Service", roles: ["Admin", "Customer Service"] },
    { to: "/app/team-lead", label: "Team Lead", roles: ["Admin", "Team Lead"] },
  ];

  return (
    <aside className="h-full w-3xs bg-gray-200">
      <nav className="pt-5">
        <ul>
          {links.map(
            (link) =>
              role && link.roles.includes(role) && (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `block pl-5 text-xl py-2 ${
                        isActive
                          ? "bg-[var(--dali-purple)] text-white"
                          : "hover:bg-[var(--dali-purple)] hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
          )}

          <li>
            <NavLink 
              to="report"
              className={({ isActive }) =>
                      `block pl-5 text-xl py-2 ${
                        isActive
                          ? "bg-[var(--dali-purple)] text-white"
                          : "hover:bg-[var(--dali-purple)] hover:text-white"
                      }`
                    }
            >
              Reports
            </NavLink>
          </li>
          <li
            onClick={handleLogout}
            className="pl-5 py-2 text-xl mt-16 hover:bg-[var(--dali-purple)] hover:text-white cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};
