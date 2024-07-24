import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarLink({ link }) {
  const location = useLocation();
  return (
    <NavLink
      to={link.path}
      className={`relative block px-3 py-2 text-sm font-medium rounded-md ${
        location.pathname === link.path ? ' text-black' : 'bg-opacity-0 text-richblack-300'
      } transition-all duration-200`}
    >
      <div className={`flex items-center gap-x-2 p-2 rounded-lg ${
        location.pathname === link.path ? 'bg-green-200' : 'bg-gray-50'
      }`}>
        <link.icon className="text-xl bg-green-200" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}