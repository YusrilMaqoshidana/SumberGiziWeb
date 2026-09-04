"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";

export default function ReportsPage() {
  const reportsList = [
    { title: "Laporan Relevansi Pemakaian Bahan Baku (BOM vs Actual)", category: "Production", date: "Agustus 2026" },
    { title: "Laporan Rekapitulasi Purchase Order & Supplier", category: "Purchasing", date: "Agustus 2026" },
    { title: "Laporan Mutasi Stok & Nilai Persediaan Gudang", category: "Inventory", date: "Agustus 2026" },
    { title: "Laporan Evaluasi Performa Supplier (MOORA Ranking)", category: "Analytics", date: "Agustus 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">SCM Operational Reports</h2>
          <p className="text-sm text-[#5F6961]">
            Cetak dan ekspor laporan bulanan operasional pabrik tahu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((r, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <span className="text-xs font-semibold text-[#4F7C59] uppercase">{r.category}</span>
                <CardTitle className="text-base font-bold text-[#172019] mt-1">{r.title}</CardTitle>
                <CardDescription className="mt-1">Periode: {r.date}</CardDescription>
              </div>
              <FileText className="w-6 h-6 text-[#879088]" />
            </CardHeader>
            <CardContent className="pt-2 flex justify-end gap-2 border-t border-[#E8ECE8]">
              <Button variant="secondary" size="sm">
                <Printer className="w-3.5 h-3.5 mr-1" /> Cetak
              </Button>
              <Button variant="primary" size="sm">
                <Download className="w-3.5 h-3.5 mr-1" /> Export PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
