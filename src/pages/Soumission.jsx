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
  BarChart,
  Bar
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

export default function Soumission() {
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
        <h1 className="text-3xl font-bold text-gray-800 font-nunito">Soumission</h1>
        <h2 className="text-lg text-gray-600 font-nunito">Soumission &gt; Home</h2>
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
                    className={`block px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-white ${item === 'Home' ? 'font-bold' : ''}`}
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
                    item === 'Home'
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

      {/* Section Graphiques */}
      <div className="flex flex-wrap -mx-2">
        {/* Graphique en zone */}
        <div className="w-full sm:w-2/5 p-2">
          <Card>
            <CardHeader>
              <CardTitle>Graphique en zone - Empilé</CardTitle>
              <CardDescription>Visiteurs totaux pour les 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}  >
                <AreaChart
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="mobile"
                    type="monotone"
                    fill={chartConfig.mobile.color}
                    fillOpacity={0.4}
                    stroke={chartConfig.mobile.color}
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="monotone"
                    fill={chartConfig.desktop.color}
                    fillOpacity={0.4}
                    stroke={chartConfig.desktop.color}
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Graphique à barres */}
        <div className="w-full sm:w-2/5 p-2">
          <Card>
            <CardHeader>
              <CardTitle>Graphique à barres - Visiteurs mensuels</CardTitle>
              <CardDescription>Affichage des visiteurs quotidiens pour les 20 derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Bar dataKey="desktop" fill={chartConfig.desktop.color} />
                  <Bar dataKey="mobile" fill={chartConfig.mobile.color} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Graphique en secteurs */}
       
      </div>

      {/* Table Demo */}
      <TableDemo addButton={false}  addClient={false}/>
    </div>
  );
}
