import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import { AuthProvider } from "@/hooks/use-auth"
import MainLayout from "@/components/layout/main-layout"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "POS System",
  description: "Modern Point of Sale Management System",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
