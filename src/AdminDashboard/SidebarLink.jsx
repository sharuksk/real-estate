import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarLink({ link }) {
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = location.pathname.startsWith(link.path);

  return (
    <NavLink
      to={link.path}
      className={`relative block px-3 py-2 text-sm font-medium rounded-md ${
        isActive ? 'text-black' : 'bg-opacity-0 text-richblack-300'
      } transition-all duration-200`}
    >
      <div className={`flex items-center gap-x-2 p-2 rounded-lg ${
        isActive ? 'bg-green-300 border-black' : 'bg-gray-50'
      }`}>
        <link.icon className="text-xl bg-green-200" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
