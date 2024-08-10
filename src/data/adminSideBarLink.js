import {
  VscDashboard,
  VscAccount,
  VscPerson,
  VscProject,
  VscHome,
  VscIssueReopened,
  VscMegaphone,
  VscSettingsGear,
} from "react-icons/vsc";

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    activePath: ["/dashboard"],
    icon: VscDashboard,
  },
  {
    id: 2,
    path: "/admin-dashboard/clients",
    activePath: [
      "/admin-dashboard/clients",
      "/admin-dashboard/clientlist",
      "/admin-dashboard/update-client/:id",
    ],
    name: "Clients",
    icon: VscIssueReopened,
  },
  {
    id: 3,
    name: "Agents",
    path: "/admin-dashboard/agents",
    activePath: [
      "/admin-dashboard/agents",
      "/admin-dashboard/agentlist",
      "/admin-dashboard/update-agent/:id",
    ],
    icon: VscPerson,
  },
  {
    id: 4,
    name: "Projects",
    path: "/admin-dashboard/projects",
    activePath: [
      "/admin-dashboard/projects",
      "/admin-dashboard/project/add",
      "/admin-dashboard/project/edit",
    ],
    icon: VscProject,
  },
  {
    id: 5,
    name: "Properties",
    path: "/admin-dashboard/properties",
    activePath: [
      "/admin-dashboard/properties",
      "/admin-dashboard/properties/add",
      "/admin-dashboard/properties/edit",
    ],
    icon: VscHome,
  },
  {
    id: 6,
    name: "Leads",
    path: "/admin-dashboard/leads",
    activePath: [
      "/admin-dashboard/leads",
      "/admin-dashboard/leadlist",
      "/admin-dashboard/update-lead/:id",
    ],
    icon: VscMegaphone,
  },
  {
    id: 7,
    name: "Owners",
    path: "/admin-dashboard/owners",
    activePath: [
      "/admin-dashboard/owners",
      "/admin-dashboard/ownerlist",
      "/admin-dashboard/update-owner/:id",
    ],
    icon: VscPerson,
  },
  {
    id: 8,
    name: "Master",
    path: "/admin-dashboard/masters",
    activePath: [
      "/admin-dashboard/masters",
      "/admin-dashboard/addamenity",
      "/admin-dashboard/addsource",
      "/admin-dashboard/addtype",
    ],
    icon: VscSettingsGear,
  },
];
//1.chnag ethe path /admin-dashbord/dashboard
//app.js
