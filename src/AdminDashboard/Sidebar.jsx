import { useMutation } from "@tanstack/react-query";
import { sidebarLinks } from "../data/adminSideBarLink";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc"
import { logoutAPI } from "../APIServices/usersAPI/usersAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModel";
const Sidebar = () => {
  const [confirmationModal,setconfirmationModel]=useState(null);
  const navigate=useNavigate();
  const mutation=useMutation({
    mutationFn:logoutAPI,
  });
const handleLogout=()=>{
  const loadToats=toast.loading("Loading")
  mutation.mutate();
  toast.success("Admin Logged Out Successfully")
  toast.dismiss(loadToats)
  navigate("/");
}
  return (
    <>
    <nav className="h-full bg-slate-300 text-black p-3 overflow-y-auto">
      <ul className="space-y-2">
        {sidebarLinks.map((link) => (
          <li key={link.id}>
            <SidebarLink link={link} />
          </li>
        ))}
      </ul>
      <button onClick={()=>setconfirmationModel({
      text1:"Are you sure want to Logout?",
      text2:"You will be Logged Out",
      btn1text:"Logout",
      btn2text:"Cancel",
      button1Handler:()=>handleLogout(),
      button2Handler:()=>setconfirmationModel(null)
      }) } className=" px-12 border-red-500 text-black flex">
      {/* <button  onClick={handleLogout}> */}
      <div className=" bg-green-300 flex items-center gap-x-2 m-6">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
            </button>
    
    </nav>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  );
 
};

export default Sidebar;

