"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const CHART_DATA = [
  { date: "Jan 1", sales: 2400, orders: 24 },
  { date: "Jan 2", sales: 1398, orders: 22 },
  { date: "Jan 3", sales: 9800, orders: 29 },
  { date: "Jan 4", sales: 3908, orders: 20 },
  { date: "Jan 5", sales: 4800, orders: 30 },
  { date: "Jan 6", sales: 3800, orders: 25 },
  { date: "Jan 7", sales: 4300, orders: 28 },
]

const TOP_PRODUCTS = [
  { name: "Coffee Beans", sales: 2400, revenue: 12000 },
  { name: "Espresso Cups", sales: 1398, revenue: 11840 },
  { name: "Tea Leaves", sales: 1800, revenue: 12600 },
  { name: "Milk Frother", sales: 908, revenue: 31780 },
  { name: "Sugar Cubes", sales: 1234, revenue: 4925 },
]

export default function SalesChart() {
  return (
    <div className="space-y-6">
      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Sales & Orders Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
              name="Sales ($)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={TOP_PRODUCTS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#10b981" name="Units Sold" radius={[8, 8, 0, 0]} />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
