"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { t, language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/")
    } catch (err) {
      setError(t("invalidCredentials") || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-accent mb-2">POS</h1>
            <p className="text-neutral-dark">{t("loginTitle") || "Point of Sale System"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("email") || "Email"}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pos.com"
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("password") || "Password"}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? t("loading") || "Loading..." : t("login") || "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-neutral-light rounded-lg text-sm text-neutral-dark">
            <p className="font-medium mb-2">{t("demoCredentials") || "Demo Credentials"}:</p>
            <p>Email: admin@pos.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
