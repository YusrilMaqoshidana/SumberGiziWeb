"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { scmEngineService, SupplierPerformance } from "@/services/scm-engine.service";
import { ShieldCheck, Award, Star } from "lucide-react";

export default function SupplierScorePage() {
  const [scores, setScores] = useState<SupplierPerformance[]>([]);

  useEffect(() => {
    scmEngineService.getSupplierScores().then(setScores);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#172019]">Supplier Performance Evaluation (MOORA)</h2>
        <p className="text-sm text-[#5F6961]">
          Evaluasi objektif kinerja supplier berbasis metode Multi-Objective Optimization on the basis of Ratio Analysis (MOORA).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Peringkat & Skor Performa Supplier</CardTitle>
          <CardDescription>
            Kriteria penilaian: Ketepatan Waktu (On-Time %), Kualitas Barang (Quality %), dan Indeks Harga
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4 text-center">Rank</th>
                <th className="py-3 px-4">Nama Supplier</th>
                <th className="py-3 px-4 text-right">On-Time Delivery %</th>
                <th className="py-3 px-4 text-right">Quality Pass %</th>
                <th className="py-3 px-4 text-right">Indeks Harga</th>
                <th className="py-3 px-4 text-center">MOORA Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {scores.map((sp) => (
                <tr key={sp.supplier_id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 text-center font-bold">
                    {sp.rank === 1 ? (
                      <span className="inline-flex items-center gap-1 text-[#C58A28] font-bold">
                        <Award className="w-4 h-4" /> #1
                      </span>
                    ) : (
                      `#${sp.rank}`
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{sp.supplier_name}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#3F8F5F]">
                    {sp.on_time_delivery_rate}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#3F8F5F]">
                    {sp.quality_rate}%
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#5F6961]">{sp.price_index}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-3 py-1 bg-[#EDF7F0] text-[#3F8F5F] font-bold rounded-full text-xs">
                      {sp.moora_score.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
