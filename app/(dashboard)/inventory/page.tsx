"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { inventoryService, InventoryBalance } from "@/services/inventory.service";
import { Package, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function InventoryPage() {
  const [balances, setBalances] = useState<InventoryBalance[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  useEffect(() => {
    inventoryService.getBalances().then(setBalances);
  }, []);

  const filtered = filterStatus === "ALL"
    ? balances
    : balances.filter((b) => b.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Real-time Inventory Balances</h2>
          <p className="text-sm text-[#5F6961]">
            Posisi stok fisik bahan baku riil vs Reorder Point (ROP) & Stok Minimum.
          </p>
        </div>
        <Button variant="secondary" onClick={() => inventoryService.getBalances().then(setBalances)}>
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh Stok
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#E8ECE8] pb-2 overflow-x-auto">
        {["ALL", "SAFE", "APPROACHING_ROP", "REORDER", "CRITICAL"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors ${
              filterStatus === status
                ? "bg-[#4F7C59] text-white"
                : "bg-white text-[#5F6961] border border-[#DDE3DE] hover:bg-[#F1F4F1]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Balances Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stok Gudang Aktif</CardTitle>
          <CardDescription>Menampilkan {filtered.length} item material</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">Kode Material</th>
                <th className="py-3 px-4">Nama Bahan Baku</th>
                <th className="py-3 px-4">Lokasi Gudang</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Minimum Stock</th>
                <th className="py-3 px-4 text-right">ROP Threshold</th>
                <th className="py-3 px-4 text-center">Status Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {filtered.map((b) => (
                <tr key={b.material_id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#879088]">{b.material_code}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{b.material_name}</td>
                  <td className="py-3.5 px-4 text-[#5F6961]">{b.location}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#172019] text-base">
                    {b.current_stock.toLocaleString("id-ID")} {b.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#5F6961]">
                    {b.minimum_stock.toLocaleString("id-ID")} {b.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#5F6961]">
                    {b.reorder_point.toLocaleString("id-ID")} {b.unit}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={b.status as any} />
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
