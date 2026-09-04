"use client";

import React, { useState, useEffect } from "react";
import { SmartRecommendationCard } from "@/components/ui/smart-recommendation";
import { scmEngineService, ReorderRecommendation } from "@/services/scm-engine.service";
import { Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  const [recs, setRecs] = useState<ReorderRecommendation[]>([]);

  useEffect(() => {
    scmEngineService.getReorderRecommendations().then(setRecs);
  }, []);

  const handleApprove = (id: string) => {
    setRecs(recs.filter((r) => r.id !== id));
    alert("Purchase Order berhasil diterbitkan dari rekomendasi DSS!");
  };

  const handleIgnore = (id: string) => {
    setRecs(recs.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-[#172019] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#4F7C59]" /> Smart Reorder Recommendations (DSS)
        </h2>
        <p className="text-sm text-[#5F6961]">
          Rekomendasi pemesanan ulang otomatis yang menggabungkan kalkulasi ROP, EOQ, AI Demand Forecast 7 Hari, dan MOORA Supplier Scoring.
        </p>
      </div>

      {recs.length === 0 ? (
        <div className="p-8 bg-white border border-[#DDE3DE] rounded-[16px] text-center space-y-2">
          <div className="text-4xl">🎉</div>
          <h3 className="font-bold text-[#172019]">Stok Bahan Baku dalam Kondisi Aman</h3>
          <p className="text-xs text-[#5F6961]">
            Tidak ada rekomendasi pemesanan ulang yang aktif saat ini. Seluruh stok bahan baku berada di atas batas Reorder Point.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {recs.map((rec) => (
            <SmartRecommendationCard
              key={rec.id}
              materialCode={rec.material_code}
              materialName={rec.material_name}
              currentStock={rec.current_stock}
              unit={rec.unit}
              rop={rec.reorder_point}
              forecastDemand={rec.predicted_demand}
              eoq={rec.recommended_quantity}
              recommendedSupplier={rec.recommended_supplier_name}
              mooraScore={rec.moora_score}
              reason={rec.reason}
              onApprove={() => handleApprove(rec.id)}
              onIgnore={() => handleIgnore(rec.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
