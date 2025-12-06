"use client"

import SettingsPanel from "@/components/settings/settings-panel"
import { useLanguage } from "@/hooks/use-language"

export default function SettingsPage() {
  const { t } = useLanguage()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{t("settings")}</h1>
      <SettingsPanel />
    </div>
  )
}
