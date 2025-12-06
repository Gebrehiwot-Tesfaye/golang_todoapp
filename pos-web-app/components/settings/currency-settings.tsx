"use client"

import { DollarSign } from "lucide-react"

interface CurrencySettingsProps {
  settings: any
  onUpdate: (settings: any) => void
}

export default function CurrencySettings({ settings, onUpdate }: CurrencySettingsProps) {
  const currencies = ["USD", "EUR", "GBP", "JPY", "CNY", "INR", "ETB"]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign size={24} className="text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Currency</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-neutral-dark">Select your preferred currency for transactions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currencies.map((currency) => (
            <button
              key={currency}
              onClick={() => onUpdate({ ...settings, currency })}
              className={`p-3 rounded-lg border-2 transition-all font-medium ${
                settings.currency === currency
                  ? "border-accent bg-accent bg-opacity-10 text-accent"
                  : "border-border-color text-foreground hover:border-accent"
              }`}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
