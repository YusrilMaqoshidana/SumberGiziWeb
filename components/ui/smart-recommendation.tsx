import React from "react";
import { AlertTriangle, Sparkles, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Button } from "./button";

export interface SmartRecommendationProps {
  materialCode: string;
  materialName: string;
  currentStock: number;
  unit: string;
  rop: number;
  forecastDemand: number;
  eoq: number;
  recommendedSupplier: string;
  mooraScore: number;
  reason: string;
  onApprove?: () => void;
  onIgnore?: () => void;
}

export function SmartRecommendationCard({
  materialCode,
  materialName,
  currentStock,
  unit,
  rop,
  forecastDemand,
  eoq,
  recommendedSupplier,
  mooraScore,
  reason,
  onApprove,
  onIgnore,
}: SmartRecommendationProps) {
  return (
    <div className="bg-white border border-[#DDE3DE] rounded-[16px] p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E8ECE8]">
        <div className="flex items-center gap-2 text-[#4F7C59] font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-[#4F7C59]" />
          <span>Smart Reorder Recommendation (DSS)</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF7E8] text-[#C58A28]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Needs Action
        </span>
      </div>

      <div className="mb-4">
        <div className="text-xs text-[#5F6961] font-medium">{materialCode}</div>
        <h4 className="text-lg font-bold text-[#172019]">{materialName}</h4>
        <p className="text-sm text-[#C94A4A] font-medium mt-1">
          ⚠️ Stok saat ini di bawah Reorder Point (ROP). Pemesanan ulang direkomendasikan.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAF8] p-4 rounded-[12px] border border-[#E8ECE8] mb-4 text-sm">
        <div>
          <span className="text-xs text-[#5F6961] block">Current Stock</span>
          <span className="font-bold text-[#172019] text-base">
            {currentStock.toLocaleString("id-ID")} {unit}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#5F6961] block">Reorder Point (ROP)</span>
          <span className="font-semibold text-[#172019]">
            {rop.toLocaleString("id-ID")} {unit}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#5F6961] block">AI Demand (7 Days)</span>
          <span className="font-semibold text-[#3978A8]">
            {forecastDemand.toLocaleString("id-ID")} {unit}
          </span>
        </div>
        <div>
          <span className="text-xs text-[#5F6961] block">Recommended EOQ</span>
          <span className="font-bold text-[#4F7C59] text-base">
            {eoq.toLocaleString("id-ID")} {unit}
          </span>
        </div>
      </div>

      <div className="text-xs text-[#5F6961] bg-[#F1F4F1] p-3 rounded-[8px] mb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span>Recommended Supplier (MOORA Rank #1):</span>
          <span className="font-semibold text-[#172019]">
            {recommendedSupplier} (Score: {mooraScore.toFixed(1)})
          </span>
        </div>
        <div>Reason: {reason}</div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="secondary" size="sm" onClick={onIgnore}>
          Abaikan
        </Button>
        <Button variant="primary" size="sm" onClick={onApprove}>
          <ShoppingCart className="w-4 h-4 mr-1.5" />
          Buat Purchase Order (PO)
        </Button>
      </div>
    </div>
  );
}
