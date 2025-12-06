"use client"

import { ShoppingCart, TrendingUp, Users, Package } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function DashboardPage() {
  const { t } = useLanguage()

  const stats = [
    {
      title: t("dashboard"),
      value: "$2,450.50",
      change: "+12.5%",
      icon: ShoppingCart,
      color: "bg-accent",
    },
    {
      title: t("orders"),
      value: "45",
      change: "+8.2%",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: t("newProduct"),
      value: "12",
      change: "+5.1%",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: t("stock"),
      value: "1,250",
      change: "-2.3%",
      icon: Package,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{t("dashboard")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-border-color p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
                <span className="text-green-600 font-semibold text-sm">{stat.change}</span>
              </div>
              <h3 className="text-neutral-dark text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-border-color p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t("orders")} {t("total")}
          </h2>
          <div className="space-y-3">
            {[
              { id: "ORD-001", customer: "John Doe", amount: "$125.50", time: "2 min ago" },
              { id: "ORD-002", customer: "Jane Smith", amount: "$89.99", time: "15 min ago" },
              { id: "ORD-003", customer: "Bob Johnson", amount: "$156.30", time: "1 hour ago" },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 hover:bg-card-bg rounded-lg transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">{order.customer}</p>
                  <p className="text-sm text-neutral-dark">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-accent">{order.amount}</p>
                  <p className="text-xs text-neutral-dark">{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-neutral-dark">Daily Target</p>
                <p className="text-sm font-semibold text-foreground">65%</p>
              </div>
              <div className="w-full bg-card-bg rounded-full h-2">
                <div className="bg-accent rounded-full h-2" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-neutral-dark">Stock Levels</p>
                <p className="text-sm font-semibold text-foreground">82%</p>
              </div>
              <div className="w-full bg-card-bg rounded-full h-2">
                <div className="bg-blue-500 rounded-full h-2" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-neutral-dark">Customer Satisfaction</p>
                <p className="text-sm font-semibold text-foreground">95%</p>
              </div>
              <div className="w-full bg-card-bg rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: "95%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
