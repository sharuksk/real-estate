import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Page/Login";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { Clients } from "./AdminDashboard/Clients/Clients";
import { ClientsList } from "./AdminDashboard/Clients/ClientsList";
import { UpdateClient } from "./AdminDashboard/Clients/UpdateClients";
import { Agents } from "./AdminDashboard/Agents/Agents";
import { AgentsList } from "./AdminDashboard/Agents/AgentsList";
import { UpdateAgent } from "./AdminDashboard/Agents/UpdateAgents";
import { Master } from "./AdminDashboard/Masters/Master";
import { Owners } from "./AdminDashboard/Owners/Owners";
import { OwnersList } from "./AdminDashboard/Owners/OwnersList";
import { Lead } from "./AdminDashboard/Lead/Lead";
import { UpdateOwner } from "./AdminDashboard/Owners/UpdateOwners";
import { LeadList } from "./AdminDashboard/Lead/LeadList";
import { UpdateLead } from "./AdminDashboard/Lead/UpdateLead";
import AddProjects from "./AdminDashboard/Projects/AddProjects";
import EditProjects from "./AdminDashboard/Projects/EditProjects";
import ProjectLists from "./AdminDashboard/Projects/ProjectLists";
import { Amenity } from "./AdminDashboard/Masters/Amenty/Amenity";
import { Source } from "./AdminDashboard/Masters/Source/Source";
import { PropertyType } from "./AdminDashboard/PropertyType/PropertyType";
import { useQuery } from "@tanstack/react-query";
// import { checkAuthenticatedAPI } from "./APIServices/usersAPI/usersAPI";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { isAuthenticated } from "./redux/slices/authSlices";
import { Spinner } from "./common/Spinner";
import AuthRoute from "./AuthRoute/AuthRoute";
import PropertiesLists from "./AdminDashboard/Properties/PropertiesLists";
import AddProperties from "./AdminDashboard/Properties/AddProperties";
import EditProperties from "./AdminDashboard/Properties/EditProperties";
import Register from "./components/Page/Register";
import AgentForm from "./AgentsDashboard/OnBoardingForm/AgentForm";
import { useSelector } from "react-redux";
import AgentDash from "./AgentsDashboard/Dashboard/index";
import AgentDashboard from "./AgentsDashboard/AgentDashboard";
import OwnerDashboard from "./OwnerDashboard/OwnerDashboard";
import OwnerDash from "./OwnerDashboard/Dashboard/index";

function App() {
  const { user } = useSelector((state) => state.user);

  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
  });
  if (isLoading) {
    <Spinner />;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<AgentForm />} />
      <Route
        path="/agent-dashboard"
        element={
          user?.role === "Agent" ? <AgentDashboard /> : <Navigate to="/" />
        }
      >
        <Route path="" element={<AgentDash />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clientlist" element={<ClientsList />} />
        <Route path="update-client/:id" element={<UpdateClient />} />
        <Route path="leads" element={<Lead />} />
        <Route path="leadlist" element={<LeadList />} />
        <Route path="update-lead/:id" element={<UpdateLead />} />
        <Route path="project/add" element={<AddProjects />} />
        <Route path="project/edit" element={<EditProjects />} />
        <Route path="projects" element={<ProjectLists />} />
        <Route path="properties" element={<PropertiesLists />} />
        <Route path="properties/add" element={<AddProperties />} />
        <Route path="properties/edit" element={<EditProperties />} />
      </Route>
      <Route
        path="/owner-dashboard"
        element={
          user?.role === "Owner" ? <OwnerDashboard /> : <Navigate to="/" />
        }
      >
        <Route path="" element={<OwnerDash />} />
        <Route path="project/add" element={<AddProjects />} />
        <Route path="project/edit" element={<EditProjects />} />
        <Route path="projects" element={<ProjectLists />} />
        <Route path="properties" element={<PropertiesLists />} />
        <Route path="properties/add" element={<AddProperties />} />
        <Route path="properties/edit" element={<EditProperties />} />
        <Route path="masters" element={<Master />} />
        <Route path="addamenity" element={<Amenity />} />
        <Route path="addsource" element={<Source />} />
        <Route path="addtype" element={<PropertyType />} />
      </Route>
      <Route
        path="/admin-dashboard"
        element={
          <AuthRoute adminOnly>
            <AdminDashboard />
          </AuthRoute>
        }
      >
        <Route
          path="clients"
          element={
            <AuthRoute adminOnly>
              <Clients />
            </AuthRoute>
          }
        />
        <Route
          path="clientlist"
          element={
            <AuthRoute adminOnly>
              <ClientsList />
            </AuthRoute>
          }
        />
        <Route
          path="update-client/:id"
          element={
            <AuthRoute adminOnly>
              <UpdateClient />
            </AuthRoute>
          }
        />
        <Route
          path="agents"
          element={
            <AuthRoute adminOnly>
              <Agents />
            </AuthRoute>
          }
        />
        <Route
          path="agentlist"
          element={
            <AuthRoute adminOnly>
              <AgentsList />
            </AuthRoute>
          }
        />
        <Route
          path="update-agent/:id"
          element={
            <AuthRoute adminOnly>
              <UpdateAgent />
            </AuthRoute>
          }
        />
        <Route
          path="masters"
          element={
            <AuthRoute adminOnly>
              <Master />
            </AuthRoute>
          }
        />
        <Route
          path="owners"
          element={
            <AuthRoute adminOnly>
              <Owners />
            </AuthRoute>
          }
        />
        <Route
          path="leads"
          element={
            <AuthRoute adminOnly>
              <Lead />
            </AuthRoute>
          }
        />
        <Route
          path="ownerlist"
          element={
            <AuthRoute adminOnly>
              <OwnersList />
            </AuthRoute>
          }
        />
        <Route
          path="update-owner/:id"
          element={
            <AuthRoute adminOnly>
              <UpdateOwner />
            </AuthRoute>
          }
        />
        <Route
          path="leadlist"
          element={
            <AuthRoute adminOnly>
              <LeadList />
            </AuthRoute>
          }
        />
        <Route
          path="update-lead/:id"
          element={
            <AuthRoute adminOnly>
              <UpdateLead />
            </AuthRoute>
          }
        />
        <Route
          path="addamenity"
          element={
            <AuthRoute adminOnly>
              <Amenity />
            </AuthRoute>
          }
        />
        <Route
          path="addtype"
          element={
            <AuthRoute adminOnly>
              <PropertyType />
            </AuthRoute>
          }
        />
        <Route
          path="addsource"
          element={
            <AuthRoute adminOnly>
              <Source />
            </AuthRoute>
          }
        />
        <Route
          path="project/add"
          element={
            <AuthRoute adminOnly>
              <AddProjects />
            </AuthRoute>
          }
        />
        <Route
          path="project/edit"
          element={
            <AuthRoute adminOnly>
              <EditProjects />
            </AuthRoute>
          }
        />
        <Route
          path="projects"
          element={
            <AuthRoute adminOnly>
              <ProjectLists />
            </AuthRoute>
          }
        />
        <Route
          path="properties"
          element={
            <AuthRoute adminOnly>
              <PropertiesLists />
            </AuthRoute>
          }
        />
        <Route
          path="properties/add"
          element={
            <AuthRoute adminOnly>
              <AddProperties />
            </AuthRoute>
          }
        />
        <Route
          path="properties/edit"
          element={
            <AuthRoute adminOnly>
              <EditProperties />
            </AuthRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
