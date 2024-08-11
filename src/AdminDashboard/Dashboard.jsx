import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { TiSpanner } from "react-icons/ti";
import { IoCartOutline, IoRocketOutline } from "react-icons/io5";
import { PiFolderSimpleUserBold } from "react-icons/pi";
import MyAreaChart from "../common/MyAreaChart";

const Dashboard = () => {
  const barData = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        label: "Active Users",
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="p-3 max-w-[1500px]">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg shadow p-5 flex-1 h-full w-full">
          <div
            className="flex rounded-xl text-white"
            style={{
              backgroundColor: "#292f50",
              maxHeight: "400px",
              color: "white",
            }}
          >
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold">Active Users</p>
            <p>
              <span className="text-green-500">(+23) </span>than last week
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mt-10 text-xs">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#4fd1c4] p-2 rounded-xl">
                  <PiFolderSimpleUserBold className="text-2xl text-white" />
                </div>
                <p>Users</p>
              </div>
              <p className="font-bold">32,984</p>
              <div className="h-[6px] w-[100px] bg-gray-200 rounded-full">
                <div className="h-[6px] w-[80px] bg-[#4fd1c4]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#4fd1c4] p-2 rounded-xl">
                  <IoRocketOutline className="text-2xl text-white" />
                </div>
                <p>Clicks</p>
              </div>
              <p className="font-bold">2,42m</p>
              <div className="h-[6px] w-[100px] bg-gray-200 rounded-full">
                <div className="h-[6px] w-[90px] bg-[#4fd1c4]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#4fd1c4] p-2 rounded-xl">
                  <IoCartOutline className="text-2xl text-white" />
                </div>
                <p>Sales</p>
              </div>
              <p className="font-bold">2,400$</p>
              <div className="h-[6px] w-[100px] bg-gray-200 rounded-full">
                <div className="h-[6px] w-[40px] bg-[#4fd1c4]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#4fd1c4] p-2 rounded-xl">
                  <TiSpanner className="text-2xl text-white" />
                </div>
                <p>Items</p>
              </div>
              <p className="font-bold">320</p>
              <div className="h-[6px] w-[100px] bg-gray-200 rounded-full">
                <div className="h-[6px] w-[50px] bg-[#4fd1c4]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex-1 w-full h-full">
          <div className="mb-5">
            <p className="text-base font-bold">Sales Overview</p>
            <p>
              <span className="text-green-500">(+5) more </span>in 2021
            </p>
          </div>
          <MyAreaChart />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="bg-gray-300 rounded-lg shadow p-5 text-center flex gap-4 items-center">
          <p className="text-xl">Today Pending Calls</p>
          <div className="bg-white h-[50px] w-[50px] rounded-full p-1">
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg shadow p-5 text-center flex gap-4 items-center">
          <p className="text-xl">Old Pending Calls</p>
          <div className="bg-white h-[50px] w-[50px] rounded-full p-1">
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        <div className="bg-gray-300 rounded-lg shadow p-5 text-center flex gap-4 items-center">
          <p className="text-xl">Un-Attempted Calls</p>
          <div className="bg-white h-[50px] w-[50px] rounded-full p-1">
            <p className="text-3xl font-bold">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
