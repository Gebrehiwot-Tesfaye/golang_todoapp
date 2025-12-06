"use client"

import { Menu, Bell, User, LogOut } from "lucide-react"
import LanguageSwitcher from "@/components/language/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

interface TopNavbarProps {
  onMenuClick: () => void
  onNavigate?: () => void
}

export default function TopNavbar({ onMenuClick, onNavigate }: TopNavbarProps) {
  const { language, t } = useLanguage()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const [notifications] = useState([
    {
      id: 1,
      message: language === "am" ? "ሪፖርት ዝግጁ ነው" : language === "ar" ? "التقرير جاهز" : "Report is ready",
      time: "5m ago",
    },
    {
      id: 2,
      message: language === "am" ? "አዲስ ትዕዛዝ ደርሷል" : language === "ar" ? "تم استقبال طلب جديد" : "New order received",
      time: "10m ago",
    },
    {
      id: 3,
      message: language === "am" ? "ስቶክ ዝቅ ማሳወቅ" : language === "ar" ? "تنبيه انخفاض المخزون" : "Low stock alert",
      time: "1h ago",
    },
  ])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} className="text-foreground" />
      </button>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            aria-label={t("notifications")}
          >
            <Bell size={20} className="text-foreground" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{t("notifications")}</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">{t("noData")}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full"
            aria-label={t("profile")}
          >
            <User size={20} />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{user?.name || "Admin User"}</p>
                <p className="text-sm text-gray-600">{user?.email || "admin@pos.com"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-200 transition-colors"
              >
                <LogOut size={16} />
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
