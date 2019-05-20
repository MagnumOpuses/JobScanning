import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area
} from 'recharts';

const data = [
  {
    month: 'Jan',
    uv: 98
  },
  {
    month: 'Feb',
    uv: 145
  },
  {
    month: 'Mars',
    uv: 145
  },
  {
    month: 'April',
    uv: 205
  },
  {
    month: 'Maj',
    uv: 175
  },
  {
    month: 'Juni',
    uv: 204
  },
  {
    month: 'Juli',
    uv: 0
  },
  {
    month: 'Aug',
    uv: 219
  },
  {
    month: 'Sep',
    uv: 135
  },
  {
    month: 'Okt',
    uv: 185
  },
  {
    month: 'Nov',
    uv: 170
  },
  {
    month: 'Dec',
    uv: 205
  },
  {
    month: 'Jan',
    uv: 195
  },
  {
    month: 'Feb',
    uv: 301
  },
  {
    month: 'Mars',
    uv: 145
  },
  {
    month: 'April',
    uv: 205
  },
  {
    month: 'Maj',
    uv: 175
  },
  {
    month: 'Juni',
    uv: 204
  },
  {
    month: 'Juli',
    uv: 0
  },
  {
    month: 'Aug',
    uv: 219
  },
  {
    month: 'Sep',
    uv: 135
  },
  {
    month: 'Okt',
    uv: 185
  },
  {
    month: 'Nov',
    uv: 170
  },
  {
    month: 'Dec',
    uv: 205
  },
  {
    month: 'Jan',
    uv: 195
  },
  {
    month: 'Feb',
    uv: 301
  },
  {
    month: 'Mars',
    uv: 145
  },
  {
    month: 'April',
    uv: 205
  },
  {
    month: 'Maj',
    uv: 175
  },
  {
    month: 'Juni',
    uv: 204
  },
  {
    month: 'Juli',
    uv: 0
  },
  {
    month: 'Aug',
    uv: 219
  },
  {
    month: 'Sep',
    uv: 135
  },
  {
    month: 'Okt',
    uv: 185
  },
  {
    month: 'Nov',
    uv: 170
  },
  {
    month: 'Dec',
    uv: 205
  }
];

const Chart = () => {
  return (
    <ResponsiveContainer width="99%" aspect={2}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#49efe1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#49efe1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          label={{ value: 'Månad', position: 'insideBottom', offset: 0 }}
        />
        <YAxis
          label={{
            value: 'Antal annonser',
            angle: -90,
            position: 'insideLeft'
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          itemStyle={{ color: '#000' }}
          separator=" "
          formatter={(value, name, props) => ['annonser', value]}
        />
        <Area
          type="linear"
          dataKey="uv"
          stroke="#49efe1"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
