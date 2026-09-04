"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Sparkles, AlertCircle } from "lucide-react";

export default function EoqCalculatorPage() {
  const [annualDemand, setAnnualDemand] = useState(120000); // D
  const [orderingCost, setOrderingCost] = useState(50000); // S (Biaya pesan per PO)
  const [holdingCost, setHoldingCost] = useState(2000); // H (Biaya simpan per KG/tahun)
  const [leadTimeDays, setLeadTimeDays] = useState(2); // L (Lead time hari)
  const [dailyDemand, setDailyDemand] = useState(400); // d (Kebutuhan harian)
  const [safetyStock, setSafetyStock] = useState(186); // SS (Safety stock)

  // Formula EOQ = sqrt((2 * D * S) / H)
  const eoq = Math.round(Math.sqrt((2 * annualDemand * orderingCost) / holdingCost));

  // Formula ROP = (d * L) + Safety Stock
  const rop = Math.round(dailyDemand * leadTimeDays + safetyStock);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-[#172019]">EOQ, ROP & Safety Stock Calculator</h2>
        <p className="text-sm text-[#5F6961]">
          Kalkulator matematis parameter SCM untuk menentukan Kuantitas Pemesanan Ekonomis (EOQ) dan Titik Pemesanan Ulang (ROP).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#4F7C59]" /> Parameter Input SCM
            </CardTitle>
            <CardDescription>Masukkan parameter historis bahan baku Kedelai</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Kebutuhan Tahunan / Annual Demand D (KG)"
              type="number"
              value={annualDemand}
              onChange={(e) => setAnnualDemand(Number(e.target.value))}
            />
            <Input
              label="Biaya Pemesanan / Setup Cost S (Rp/PO)"
              type="number"
              value={orderingCost}
              onChange={(e) => setOrderingCost(Number(e.target.value))}
            />
            <Input
              label="Biaya Penyimpanan / Holding Cost H (Rp/KG/thn)"
              type="number"
              value={holdingCost}
              onChange={(e) => setHoldingCost(Number(e.target.value))}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Lead Time L (Hari)"
                type="number"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(Number(e.target.value))}
              />
              <Input
                label="Daily Demand d (KG/hr)"
                type="number"
                value={dailyDemand}
                onChange={(e) => setDailyDemand(Number(e.target.value))}
              />
            </div>
            <Input
              label="Safety Stock SS (KG)"
              type="number"
              value={safetyStock}
              onChange={(e) => setSafetyStock(Number(e.target.value))}
            />
          </CardContent>
        </Card>

        {/* Calculation Output Card */}
        <div className="space-y-6">
          <Card className="bg-[#F3F7F3] border-[#4F7C59]/30">
            <CardHeader>
              <CardTitle className="text-[#4F7C59] flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Hasil Kalkulasi SCM Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#5F6961] block">
                  Economic Order Quantity (EOQ)
                </span>
                <div className="text-36px font-bold text-[#4F7C59]">
                  {eoq.toLocaleString("id-ID")} <span className="text-base font-normal">KG</span>
                </div>
                <p className="text-xs text-[#5F6961] mt-1">
                  Jumlah kuantitas paling ekonomis per pemesanan untuk meminimalkan biaya total simpan & pesan.
                </p>
              </div>

              <div className="pt-4 border-t border-[#CBDDCE]">
                <span className="text-xs font-semibold text-[#5F6961] block">
                  Reorder Point (ROP Threshold)
                </span>
                <div className="text-36px font-bold text-[#C58A28]">
                  {rop.toLocaleString("id-ID")} <span className="text-base font-normal">KG</span>
                </div>
                <p className="text-xs text-[#5F6961] mt-1">
                  Saat stok riil menyentuh {rop} KG, pemesanan ulang harus segera dilakukan.
                </p>
              </div>

              <div className="p-3 bg-white rounded-[8px] border border-[#DDE3DE] text-xs text-[#172019] space-y-1">
                <div className="font-semibold">Rumus Matematika:</div>
                <div>• EOQ = √((2 × D × S) / H)</div>
                <div>• ROP = (d × L) + Safety Stock</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
