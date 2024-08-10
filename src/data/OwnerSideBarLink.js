import {
  VscDashboard,
  VscProject,
  VscHome,
  VscSettingsGear,
} from "react-icons/vsc";

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/owner-dashboard/",
    activePath: ["/owner-dashboard/"],
    icon: VscDashboard,
  },
  {
    id: 2,
    name: "Projects",
    path: "/owner-dashboard/projects",
    activePath: [
      "/owner-dashboard/projects",
      "/owner-dashboard/project/add",
      "/owner-dashboard/project/edit",
    ],
    icon: VscProject,
  },
  {
    id: 3,
    name: "Properties",
    path: "/owner-dashboard/properties",
    activePath: [
      "/owner-dashboard/properties",
      "/owner-dashboard/properties/add",
      "/owner-dashboard/properties/edit",
    ],
    icon: VscHome,
  },
  {
    id: 4,
    name: "Master",
    path: "/owner-dashboard/masters",
    activePath: [
      "/owner-dashboard/masters",
      "/owner-dashboard/addamenity",
      "/owner-dashboard/addsource",
      "/owner-dashboard/addtype",
    ],
    icon: VscSettingsGear,
  },
];
