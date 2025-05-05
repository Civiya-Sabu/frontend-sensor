import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DetailedChart.module.css';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(Math.random() * 100),
}));

const DetailedChart = () => {
  return (
    <div className={styles.chart}>
      <h2>Detailed Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4e73df" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetailedChart;
