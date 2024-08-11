import { useMutation } from "@tanstack/react-query";
import { sidebarLinks } from "../data/adminSideBarLink";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import { BsList } from "react-icons/bs"; // Import icon for the toggle button
import { logoutAPI } from "../APIServices/usersAPI/usersAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModel";
import { useDispatch } from "react-redux";
import { setAdmin } from "../redux/slices/userSlice";

const Sidebar = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manage sidebar visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: logoutAPI,
  });

  const handleLogout = () => {
    const loadToats = toast.loading("Loading");
    mutation.mutate();
    dispatch(setAdmin({}));
    toast.success("Admin Logged Out Successfully");
    toast.dismiss(loadToats);
    navigate("/");
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="fixed top-4 left-4 text-2xl text-black lg:hidden z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <BsList />
      </button>

      {/* Sidebar for large screens and conditional rendering for small screens */}
      <nav
        className={`fixed top-0 left-0 h-full bg-slate-300 text-black p-3 overflow-y-auto rounded-3xl m-5 lg:w-64 lg:block lg:static lg:translate-x-0 lg:translate-y-0 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
        style={{ zIndex: 40 }}
      >
        {/* Full sidebar text for large screens */}
        <div className="hidden lg:block">
          <div className="justify-between text-2xl text-center m-4">
            Navigations
          </div>
        </div>

        <ul className="space-y-2">
          {sidebarLinks.map((link) => (
            <li key={link.id}>
              <SidebarLink link={link} />
            </li>
          ))}
        </ul>

        {/* Logout button */}
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure you want to Logout?",
              text2: "You will be Logged Out",
              btn1text: "Logout",
              btn2text: "Cancel",
              button1Handler: () => handleLogout(),
              button2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-12 border-red-500 text-black flex"
        >
          <div className="bg-green-300 flex items-center gap-x-2 m-6">
            <VscSignOut className="text-lg" />
            <span className="hidden lg:inline">Logout</span>
          </div>
        </button>
      </nav>

      {/* Modal for confirmation */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
