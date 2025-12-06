"use client"

import { TrendingUp, Package, Users, DollarSign } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function ReportsSummary() {
  const { t } = useLanguage()

  const SUMMARY_DATA = [
    {
      title: t("total") + " " + t("orders"),
      value: "$12,450.50",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-accent",
    },
    {
      title: t("orders"),
      value: "324",
      change: "+8.2%",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: t("customers"),
      value: "156",
      change: "+5.1%",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: t("products"),
      value: "1,842",
      change: "+15.3%",
      icon: Package,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {SUMMARY_DATA.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="bg-white rounded-lg shadow-sm border border-border-color p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${item.color} text-white p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
              <span className="text-green-600 font-semibold text-sm">{item.change}</span>
            </div>
            <h3 className="text-neutral-dark text-sm font-medium mb-1">{item.title}</h3>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
          </div>
        )
      })}
    </div>
  )
}
