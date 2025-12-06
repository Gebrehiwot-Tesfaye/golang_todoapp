"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en" as const, name: "English" },
    { code: "am" as const, name: "አማርኛ" },
    { code: "ar" as const, name: "العربية" },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-foreground font-medium"
      >
        <Globe size={18} />
        <span className="text-sm uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-border-color rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code ? "bg-accent text-white font-semibold" : "text-foreground"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
