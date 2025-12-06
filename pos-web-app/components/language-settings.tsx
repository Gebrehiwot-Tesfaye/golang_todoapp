"use client"

import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export default function LanguageSettings() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "am" as const, name: "አማርኛ", flag: "🇪🇹" },
    { code: "ar" as const, name: "العربية", flag: "🇸🇦" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
      <div className="flex items-center gap-3 mb-6">
        <Globe size={24} className="text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Language</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`p-4 rounded-lg border-2 transition-all ${
              language === lang.code
                ? "border-accent bg-accent bg-opacity-10"
                : "border-border-color hover:border-accent"
            }`}
          >
            <div className="text-3xl mb-2">{lang.flag}</div>
            <div className="font-semibold text-foreground">{lang.name}</div>
            <div className="text-xs text-neutral-dark uppercase">{lang.code}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
