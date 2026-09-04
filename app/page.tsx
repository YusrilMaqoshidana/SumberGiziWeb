"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SmartRecommendationCard } from "@/components/ui/smart-recommendation";
import {
  Package,
  Factory,
  ShoppingCart,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react";

export default function Home() {
  const [activeRoute, setActiveRoute] = useState("/dashboard");

  // Sample data conforming to DATABASE.md & DESIGN_SYSTEM.md
  const inventoryItems = [
    {
      code: "MAT-001",
      name: "Kedelai Impor Super",
      stock: 700,
      unit: "KG",
      rop: 986,
      minStock: 500,
      status: "REORDER" as const,
    },
    {
      code: "MAT-002",
      name: "Garam Konsumsi",
      stock: 120,
      unit: "KG",
      rop: 50,
      minStock: 30,
      status: "SAFE" as const,
    },
    {
      code: "MAT-003",
      name: "Kunyit Pewarna Alami",
      stock: 45,
      unit: "KG",
      rop: 40,
      minStock: 25,
      status: "APPROACHING_ROP" as const,
    },
    {
      code: "MAT-004",
      name: "Asam Cuka Pengendap",
      stock: 15,
      unit: "L",
      rop: 60,
      minStock: 40,
      status: "CRITICAL" as const,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      {/* 240px Sidebar */}
      <Sidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#DDE3DE] px-6 flex items-center justify-between gap-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#879088] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari bahan baku, PO, atau supplier..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-[#F1F4F1] border-none rounded-[8px] text-[#172019] placeholder-[#879088] focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              <Filter className="w-3.5 h-3.5 mr-1" />
              Filter
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Buat Purchase Order
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#172019]">Dashboard Overview</h2>
              <p className="text-sm text-[#5F6961]">
                Ringkasan inventaris real-time, status produksi, dan keputusan SCM.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5F6961] bg-white px-3 py-1.5 rounded-[8px] border border-[#DDE3DE]">
              <span className="w-2 h-2 rounded-full bg-[#3F8F5F]"></span>
              Sistem Aktif • Sync Otomatis
            </div>
          </div>

          {/* 3 Metric Cards (Big Numbers display) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-[#5F6961]">
                  Current Total Stock
                </CardTitle>
                <Package className="w-5 h-5 text-[#4F7C59]" />
              </CardHeader>
              <CardContent>
                <div className="text-36px font-bold text-[#172019] leading-tight">
                  1,650 <span className="text-lg font-normal text-[#5F6961]">KG</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-[#3F8F5F] mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>↑ 8.4% dibanding minggu lalu</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-[#5F6961]">
                  Daily Production
                </CardTitle>
                <Factory className="w-5 h-5 text-[#3978A8]" />
              </CardHeader>
              <CardContent>
                <div className="text-36px font-bold text-[#172019] leading-tight">
                  980 <span className="text-lg font-normal text-[#5F6961]">KG</span>
                </div>
                <div className="text-xs text-[#5F6961] mt-2">
                  Target harian: 1,000 KG (Efisiensi 98%)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-[#5F6961]">
                  Active Purchase Orders
                </CardTitle>
                <ShoppingCart className="w-5 h-5 text-[#C58A28]" />
              </CardHeader>
              <CardContent>
                <div className="text-36px font-bold text-[#172019] leading-tight">
                  2 <span className="text-lg font-normal text-[#5F6961]">Orders</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-[#C58A28] mt-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>1 PO Menunggu Persetujuan Manager</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Decision Support System Card */}
          <SmartRecommendationCard
            materialCode="MAT-001"
            materialName="Kedelai Impor Super"
            currentStock={700}
            unit="KG"
            rop={986}
            forecastDemand={430}
            eoq={2449}
            recommendedSupplier="PT Kedelai Makmur"
            mooraScore={93.5}
            reason="Stok saat ini (700 KG) berada di bawah batas Reorder Point (986 KG). Hasil peramalan AI memprediksi kebutuhan 430 KG/minggu."
            onApprove={() => alert("PO berhasil dibuat dari rekomendasi DSS!")}
            onIgnore={() => alert("Rekomendasi diabaikan.")}
          />

          {/* SCM Inventory Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inventory Material Status</CardTitle>
                <CardDescription>
                  Daftar stok bahan baku riil vs Reorder Point (ROP) & Minimum Stock
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Lihat Semua <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                    <th className="py-3 px-4">Kode</th>
                    <th className="py-3 px-4">Nama Bahan Baku</th>
                    <th className="py-3 px-4 text-right">Current Stock</th>
                    <th className="py-3 px-4 text-right">Minimum Stock</th>
                    <th className="py-3 px-4 text-right">ROP</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECE8]">
                  {inventoryItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#879088]">{item.code}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#172019]">{item.name}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-[#172019]">
                        {item.stock.toLocaleString("id-ID")} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#5F6961]">
                        {item.minStock.toLocaleString("id-ID")} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right text-[#5F6961]">
                        {item.rop.toLocaleString("id-ID")} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="secondary" size="sm">
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
