import { Routes,Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Page/Login";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { Clients } from "./AdminDashboard/Clients/Clients";
import { Master } from "./AdminDashboard/Masters/Master";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="clients" element={<Clients />} />
        <Route path="masters" element={<Master />} />
      </Route>
    </Routes>
  );
}

export default App;
