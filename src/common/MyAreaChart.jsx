import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", data1: 200, data2: 500 },
  { name: "Feb", data1: 220, data2: 220 },
  { name: "Mar", data1: 170, data2: 210 },
  { name: "Apr", data1: 270, data2: 350 },
  { name: "May", data1: 220, data2: 370 },
  { name: "Jun", data1: 210, data2: 430 },
  { name: "Jul", data1: 250, data2: 430 },
  { name: "Aug", data1: 200, data2: 300 },
  { name: "Sep", data1: 110, data2: 345 },
  { name: "Oct", data1: 130, data2: 280 },
  { name: "Nov", data1: 180, data2: 400 },
  { name: "Dec", data1: 130, data2: 430 },
];

const MyAreaChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorData1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorData2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="data1"
        stroke="#4f46e5"
        fill="url(#colorData1)"
      />
      <Area
        type="monotone"
        dataKey="data2"
        stroke="#f43f5e"
        fill="url(#colorData2)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default MyAreaChart;
