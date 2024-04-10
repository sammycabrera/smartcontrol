import React from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function RTGraph({ data }) {
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="id" type="number" domain={[0, 100]} />
      <YAxis />

      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart>
  );
}
