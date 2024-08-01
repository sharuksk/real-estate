import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Page/Login";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { Clients } from "./AdminDashboard/Clients/Clients";
import { Master } from "./AdminDashboard/Masters/Master";
import { Owners } from "./AdminDashboard/Owners/Owners";

import { OwnersList } from "./AdminDashboard/Owners/OwnersList";
import { Lead } from "./AdminDashboard/Lead/Lead";
import  {UpdateOwner}  from "./AdminDashboard/Owners/UpdateOwners";
import { LeadList } from "./AdminDashboard/Lead/LeadList";
import { UpdateLead } from "./AdminDashboard/Lead/UpdateLead";
import AddProjects from "./AdminDashboard/Projects/AddProjects";
import EditProjects from "./AdminDashboard/Projects/EditProjects";
import ProjectLists from "./AdminDashboard/Projects/ProjectLists";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="clients" element={<Clients />} />
        <Route path="masters" element={<Master />} />
        <Route path="owners" element={<Owners/>} />
               <Route path="leads" element={<Lead/>} />
               <Route path="/admin-dashboard/ownerlist" element={<OwnersList />} />
               <Route path='/admin-dashboard/update-owner/:id' element={<UpdateOwner/>} />
               <Route path="/admin-dashboard/leadlist" element={<LeadList/>}/>
               <Route path="/admin-dashboard/update-lead/:id" element={<UpdateLead/>}/>
               <Route path="project/add" element={<AddProjects />} />
               <Route path="project/edit" element={<EditProjects />} />
               <Route path="projects" element={<ProjectLists />} />
               {/* <Route path="dashboard" element={<Das/>} /> */}
       
        {/* <Route path="dashboard" element={<Das/>} /> */}
      </Route>
    </Routes>
  );
}
//private section //isauthetocated pedning
export default App;
