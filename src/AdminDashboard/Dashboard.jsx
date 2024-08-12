import React from "react";
import image1 from "../assests/image1.png";
import image2 from "../assests/image2.png";
import image3 from "../assests/image3.png";
import image4 from "../assests/image4.png";
import { useSelector } from "react-redux";
import DashboardChart from "../common/DashboardChart";

const data = [
  { name: "Jan", value: 50 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 100 },
  { name: "Apr", value: 120 },
  { name: "May", value: 80 },
  { name: "Jun", value: 200 },
  { name: "Jul", value: 140 },
];

const stats = [
  { label: "Total Properties", value: "1,200" },
  { label: "Total Projects", value: "300" },
  { label: "Active Projects", value: "250" },
  { label: "Total Clients", value: "500" },
  { label: "Total Agents", value: "100" },
];

const recentActivities = [
  {
    image: image1,
    action: "Invite to join the team",
    time: "2 days ago",
    status: "Resend",
  },
  {
    image: image2,
    action: "Mark as complete",
    time: "3 days ago",
    status: "Complete",
  },
  {
    image: image3,
    action: "Update project plan",
    time: "4 days ago",
    status: "View",
  },
  {
    image: image4,
    action: "Invite to join the team",
    time: "1 week ago",
    status: "Resend",
  },
];

const getCurrentGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Good Morning";
  if (hours < 18) return "Good Afternoon";
  return "Good Evening";
};

const Dashboard = () => {
  const { user, admin } = useSelector((state) => state.user);
  const greeting = getCurrentGreeting();

  return (
    <div className="p-4 md:p-8 border border-1 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-4xl font-bold  mb-4 md:mb-0">
          {greeting}, {user?.name ? user?.name : admin?.name}
        </h1>
        <button className="px-4 py-2 bg-[#fcfaf7] text-[#292f50] rounded-lg shadow-md">
          Edit
        </button>
      </header>

      <section className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-5 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#fcfaf7] p-4 rounded-lg shadow-md">
            <p className="text-sm md:text-lg font-medium">{stat.label}</p>
            <h3 className="text-xl md:text-2xl font-bold ">{stat.value}</h3>
          </div>
        ))}
      </section>

      <section className="bg-[#fcfaf7] p-4 md:p-6 rounded-lg shadow-md mb-6 md:mb-8">
        <h2 className="text-md md:text-lg font-semibold mb-4">
          Project Performance
        </h2>
        <DashboardChart data={data} />
      </section>

      <section className="bg-[#fcfaf7] p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl font-bold mb-4">Recent Activity</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4"
            >
              <div className="flex items-start md:items-center mb-4 md:mb-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full mr-4">
                  <img
                    src={activity.image}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-[#96784f]">{activity.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 mt-2 md:mt-0 rounded-lg shadow-md w-full md:w-auto bg-[#f5efe7] font-medium">
                {activity.status}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
