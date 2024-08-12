import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            padding={{ left: 20, right: 20 }}
            interval={0}
          />
          <YAxis hide />
          <Tooltip />
          <Line
            type="natural"
            dataKey="value"
            stroke="#8b572a"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardChart;
