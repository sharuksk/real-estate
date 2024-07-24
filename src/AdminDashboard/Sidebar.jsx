
import { sidebarLinks } from "../data/adminSideBarLink";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <nav className="h-full bg-slate-300 text-black p-3 overflow-y-auto">
      <ul className="space-y-2">
        {sidebarLinks.map((link) => (
          <li key={link.id}>
            <SidebarLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

