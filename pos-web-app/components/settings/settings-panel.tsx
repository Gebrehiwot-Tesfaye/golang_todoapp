"use client"

import { useState } from "react"
import LanguageSettings from "@/components/settings/language-settings"
import CurrencySettings from "@/components/settings/currency-settings"
import TaxSettings from "@/components/settings/tax-settings"

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    currency: "USD",
    taxRate: 10,
  })

  const handleUpdateSettings = (newSettings: any) => {
    setSettings(newSettings)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <LanguageSettings />
      <CurrencySettings settings={settings} onUpdate={handleUpdateSettings} />
      <TaxSettings settings={settings} onUpdate={handleUpdateSettings} />
    </div>
  )
}
