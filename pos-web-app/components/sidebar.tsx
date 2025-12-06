"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, ShoppingCart, ListOrdered, Package, Users, BarChart3, Settings } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useCallback } from "react"

const getNavigationItems = (t: (key: string) => string) => [
  { name: t("dashboard"), key: "dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: t("pos"), key: "pos", href: "/", icon: ShoppingCart },
  { name: t("orders"), key: "orders", href: "/orders", icon: ListOrdered },
  { name: t("products"), key: "products", href: "/products", icon: Package },
  { name: t("customers"), key: "customers", href: "/customers", icon: Users },
  { name: t("reports"), key: "reports", href: "/reports", icon: BarChart3 },
  { name: t("settings"), key: "settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const navigationItems = getNavigationItems(t)

  const handleLinkClick = useCallback(
    (href: string) => {
      if (href !== "/" && href !== "/dashboard" && onClose) {
        onClose()
      }
    },
    [onClose],
  )

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-sidebar-bg text-sidebar-text transition-all duration-300 flex flex-col border-r border-gray-700`}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-center">
        <div className="text-2xl font-bold text-accent">POS</div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/" && pathname === "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-accent text-primary-foreground" : "text-sidebar-text hover:bg-gray-700"
              }`}
              title={item.name}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">v2.0.0</div>
      </div>
    </aside>
  )
}
