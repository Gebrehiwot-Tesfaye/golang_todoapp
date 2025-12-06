"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import TopNavbar from "@/components/layout/top-navbar"
import { useAuth } from "@/hooks/use-auth"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const isLoginPage = pathname === "/login"

  const handleNavigate = useCallback(() => {
    if (pathname !== "/" && pathname !== "/dashboard") {
      setSidebarOpen(false)
    }
  }, [pathname])

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-auto bg-neutral-light">{children}</main>
      </div>
    </div>
  )
}
