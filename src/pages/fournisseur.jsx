import React, { useState } from "react";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Label,
  BarChart, // Importer BarChart
  Bar // Importer Bar
} from "recharts"; 
import { Button } from "@/components/ui/button";
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

import { Link } from "react-router-dom"; // Importer Link

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
    color: "#1E3A8A", // Couleur bleu foncé
  },
  mobile: {
    label: "Mobile",
    color: "#3B82F6", // Couleur bleu clair
  },
};

export default function Fournisseur() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-4">
      {/* Titre et sous-titre */}
      <div className="mb-0 items-center border-l-4 border-blue-500 pl-4">
        <h1 className="text-3xl font-bold text-gray-800 font-nunito">Fournisseurs</h1>
        <h2 className="text-lg text-gray-600 font-nunito">Soumission &gt; Fournisseurs</h2>
      </div>

      {/* Section Navigation */}
      <div className="mb-4 items-center">
      <nav className="mt-4">
          {/* Menu déroulant mobile */}
          <div className="md:hidden relative">
            <Button onClick={toggleDropdown} className="flex items-center">
              Menu
            </Button>
            {isDropdownOpen && (
              <ul className="absolute bg-white border rounded shadow-lg mt-2 z-10">
                {['Home', 'Client', 'Fournisseurs et sous-traitants', 'Estimations et budgets'].map((item) => (
                  <li key={item}>
                  <Link
                    to={`/${item === 'Home' ? 'soumission' : item === 'Fournisseurs et sous-traitants' ? 'fournisseur' : item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white ${item === 'Fournisseur' ? 'font-bold' : ''}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigation desktop */}
          <ul className="hidden md:flex flex-wrap justify-center md:justify-start space-x-6">
            {['Home', 'Client', 'Fournisseurs et sous-traitants', 'Estimations et budgets'].map((item) => (
              <li key={item}>
                <Link
                    to={`/${item === 'Home' ? 'soumission' : item === 'Fournisseurs et sous-traitants' ? 'fournisseur' : item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`font-nunito text-lg py-2 px-1 border-b-4 transition-all ${
                    item === 'Fournisseurs et sous-traitants'
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent hover:border-blue-500 hover:text-blue-500 text-gray-600'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Section Table */}
      <div className="w-full p-2">

          <TableDemo addButton={false}  addClient={false} addfour={true}/>

      </div>
    </div>
  );
}
