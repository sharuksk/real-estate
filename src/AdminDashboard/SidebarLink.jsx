import { NavLink, useLocation } from "react-router-dom";

export default function SidebarLink({ link }) {
  const location = useLocation();

  const activePaths = link.activePath || [link.path];

  const isActive = activePaths.some((path) => {
    const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
    return regex.test(location.pathname);
  });

  return (
    <NavLink
      to={link.path}
      className={`relative block px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? "text-black" : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <div
        className={`flex items-center gap-x-2 p-2 rounded-lg ${
          isActive ? "bg-green-300 border-black" : "bg-gray-50"
        }`}
      >
        <link.icon className="text-xl bg-green-200" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
