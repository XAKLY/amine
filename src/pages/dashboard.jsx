import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts"; 
import { Bar, BarChart } from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableDemo } from "../components/table";



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive line chart";



const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#1E3A8A", // Dark blue color
  },
  mobile: {
    label: "Mobile",
    color: "#3B82F6", // Light blue color
  },
};

const SecondChartData = [
  { date: "2024-04-01", value: 120 },
  { date: "2024-04-02", value: 200 },
  { date: "2024-04-03", value: 150 },
  { date: "2024-04-04", value: 300 },
  { date: "2024-04-05", value: 500 },
];

export default function DashboardPage() {
  const [activeChart, setActiveChart] = React.useState("desktop");
  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <div className="flex flex-col p-4">
      {/* Title and Subtitle Section */}
      <div className="mb-0 items-center border-l-4 border-blue-500 pl-4">
        <h1 className="text-3xl font-bold text-gray-800 font-nunito">Dashboard</h1>
        <h2 className="text-lg text-gray-600 font-nunito">Dashboard &gt; Home</h2>

        
      </div>
      <div className="mb-4 items-center">
  <nav className="mt-4">
    <ul className="flex space-x-6">
      {['Home', 'Details', 'Other'].map((item) => (
        <li key={item}>
          <a
            href="#"
            className={`font-nunito text-lg py-2 px-1 border-b-4 transition-all ${
              item === 'Home'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent hover:border-blue-500 hover:text-blue-500 text-gray-600'
            }`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</div>

<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4">
  <Card className="w-full sm:flex-1">
    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <CardTitle>Line Chart - Interactive</CardTitle>
        <CardDescription>
          Showing total visitors for the last 3 months
        </CardDescription>
      </div>
      <div className="flex">
        {["desktop", "mobile"].map((key) => (
          <button
            key={key}
            data-active={activeChart === key}
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart(key)}
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig[key].label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total[key].toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </CardHeader>
    <CardContent className="px-2 sm:p-6">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <LineChart
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey="views"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey={activeChart}
            stroke={chartConfig[activeChart].color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }} 
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>

  <Card className="sm:w-1/4">
    <CardHeader>
      <CardTitle>Bar Chart - Advanced</CardTitle>
      <CardDescription>
        Displaying additional data points.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig} >
        <BarChart
          data={SecondChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString("en-US", {
                weekday: "short",
              });
            }}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="value"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
</div>
      <div className="grid grid-cols-1 gap-4 mt-4">
       
        <div className="flex-1">
          <TableDemo />
        </div>
      </div>
    </div>
  );
}
