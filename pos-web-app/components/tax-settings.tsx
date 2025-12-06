"use client"

import { Percent } from "lucide-react"
import { useState } from "react"

interface TaxSettingsProps {
  settings: any
  onUpdate: (settings: any) => void
}

export default function TaxSettings({ settings, onUpdate }: TaxSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempTaxRate, setTempTaxRate] = useState(settings.taxRate)

  const handleSave = () => {
    onUpdate({ ...settings, taxRate: Number.parseFloat(tempTaxRate) })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6">
      <div className="flex items-center gap-3 mb-6">
        <Percent size={24} className="text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Tax Configuration</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-neutral-dark">Set the default tax rate for all transactions</p>

        {!isEditing ? (
          <div className="flex items-center justify-between p-4 bg-card-bg rounded-lg border border-border-color">
            <div>
              <p className="text-sm text-neutral-dark mb-1">Current Tax Rate</p>
              <p className="text-3xl font-bold text-accent">{settings.taxRate}%</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent-dark transition-colors font-medium"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-4 bg-card-bg rounded-lg border border-border-color">
              <input
                type="number"
                value={tempTaxRate}
                onChange={(e) => setTempTaxRate(e.target.value)}
                className="flex-1 bg-white px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="text-xl font-bold text-foreground">%</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent-dark transition-colors font-medium"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setTempTaxRate(settings.taxRate)
                }}
                className="flex-1 px-4 py-2 border border-border-color rounded-lg text-foreground hover:bg-card-bg transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> The tax rate will be automatically applied to all new orders and sales calculations.
          </p>
        </div>
      </div>
    </div>
  )
}
