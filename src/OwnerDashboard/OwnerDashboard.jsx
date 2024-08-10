import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const OwnerDashboard = () => {
  return (
    <div className="flex flex-row h-full w-11/12">
      <Sidebar />
      <main className="flex-1 p-3 m-5 ">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerDashboard;
