import { VscDashboard, VscAccount, VscPerson, VscProject, VscHome, VscIssueReopened,VscMegaphone, VscSettingsGear } from "react-icons/vsc";

export const sidebarLinks = [
  { id: 1, name: "Dashboard", path: "/dashboard", icon: VscDashboard },
  { id: 2, path: '/admin-dashboard/clients', name: 'Clients', icon: VscIssueReopened },
  { id: 3, name: "Agents", path: "/dashboard/agents", icon: VscPerson },
  { id: 4, name: "Projects", path: "/dashboard/projects", icon: VscProject },
  { id: 5, name: "Properties", path: "/dashboard/properties", icon: VscHome },
  { id: 6, name: "Leads", path: "/dashboard/leads", icon: VscMegaphone },
  { id: 7, name: "Owners", path: "/dashboard/owners", icon: VscPerson },
  { id: 8, name: "Master", path: "/dashboard/master", icon: VscSettingsGear },
];
