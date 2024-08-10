import {
  VscDashboard,
  VscProject,
  VscHome,
  VscIssueReopened,
  VscMegaphone,
} from "react-icons/vsc";

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/agent-dashboard/",
    activePath: ["/agent-dashboard/"],
    icon: VscDashboard,
  },
  {
    id: 2,
    path: "/agent-dashboard/clients",
    activePath: [
      "/agent-dashboard/clients",
      "/agent-dashboard/clientlist",
      "/agent-dashboard/update-client/:id",
    ],
    name: "Clients",
    icon: VscIssueReopened,
  },

  {
    id: 3,
    name: "Projects",
    path: "/agent-dashboard/projects",
    activePath: [
      "/agent-dashboard/projects",
      "/agent-dashboard/project/add",
      "/agent-dashboard/project/edit",
    ],
    icon: VscProject,
  },
  {
    id: 4,
    name: "Properties",
    path: "/agent-dashboard/properties",
    activePath: [
      "/agent-dashboard/properties",
      "/agent-dashboard/properties/add",
      "/agent-dashboard/properties/edit",
    ],
    icon: VscHome,
  },
  {
    id: 5,
    name: "Leads",
    path: "/agent-dashboard/leads",
    activePath: [
      "/agent-dashboard/leads",
      "/agent-dashboard/leadlist",
      "/agent-dashboard/update-lead/:id",
    ],
    icon: VscMegaphone,
  },
];
