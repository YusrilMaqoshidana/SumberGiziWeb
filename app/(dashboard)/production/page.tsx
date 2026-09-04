"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/badge";
import { productionService, ProductionBatch } from "@/services/production.service";
import { Plus, Factory, CheckCircle2 } from "lucide-react";

export default function ProductionPage() {
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    production_number: `PROD-202609-000${Math.floor(Math.random() * 90 + 10)}`,
    product_name: "Tahu Putih Premium",
    planned_quantity: 1000,
    actual_quantity: 980,
  });

  useEffect(() => {
    productionService.getProductionBatches().then(setBatches);
  }, []);

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: ProductionBatch = {
      id: `PB-${Math.random().toString(36).substring(2, 9)}`,
      production_number: formData.production_number,
      product_id: "PR-7890abcd-ef12-3456-7890-abcdef123456",
      product_name: formData.product_name,
      production_date: new Date().toISOString().split("T")[0],
      planned_quantity: formData.planned_quantity,
      actual_quantity: formData.actual_quantity,
      status: "COMPLETED",
      material_usages: [
        {
          material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          material_name: "Kedelai Impor Super",
          planned_quantity: (formData.planned_quantity * 10) / 10,
          actual_quantity: (formData.actual_quantity * 10.2) / 10,
          unit: "KG",
        },
      ],
    };

    setBatches([newBatch, ...batches]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Production Batches & Material Usages</h2>
          <p className="text-sm text-[#5F6961]">
            Kelola perencanaan batch produksi harian dan catat pemakaian bahan baku aktual.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Buat Batch Produksi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Batch Produksi</CardTitle>
          <CardDescription>Perbandingan target vs hasil aktual & efisiensi bahan baku</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">No. Batch</th>
                <th className="py-3 px-4">Produk Tahu</th>
                <th className="py-3 px-4">Tgl Produksi</th>
                <th className="py-3 px-4 text-right">Planned (Pcs)</th>
                <th className="py-3 px-4 text-right">Actual (Pcs)</th>
                <th className="py-3 px-4 text-right">Kedelai Terpakai</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {batches.map((pb) => (
                <tr key={pb.id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#4F7C59]">{pb.production_number}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{pb.product_name}</td>
                  <td className="py-3.5 px-4 text-xs text-[#5F6961]">{pb.production_date}</td>
                  <td className="py-3.5 px-4 text-right text-[#5F6961]">
                    {pb.planned_quantity.toLocaleString()} Pcs
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#172019]">
                    {pb.actual_quantity.toLocaleString()} Pcs
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#C94A4A]">
                    {pb.material_usages[0]?.actual_quantity || 820} KG
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={pb.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buat Batch Produksi Baru"
      >
        <form onSubmit={handleCreateBatch} className="space-y-4">
          <Input
            label="No. Batch Produksi"
            value={formData.production_number}
            onChange={(e) => setFormData({ ...formData, production_number: e.target.value })}
            required
          />

          <div>
            <label className="text-xs font-semibold text-[#172019] block mb-1">
              Produk Tahu
            </label>
            <select
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              className="w-full h-10 px-3 bg-white border border-[#DDE3DE] rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
            >
              <option value="Tahu Putih Premium">Tahu Putih Premium</option>
              <option value="Tahu Kuning Gurih">Tahu Kuning Gurih</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Target Output (Pcs)"
              type="number"
              value={formData.planned_quantity}
              onChange={(e) => setFormData({ ...formData, planned_quantity: Number(e.target.value) })}
              required
            />
            <Input
              label="Output Aktual (Pcs)"
              type="number"
              value={formData.actual_quantity}
              onChange={(e) => setFormData({ ...formData, actual_quantity: Number(e.target.value) })}
              required
            />
          </div>

          <div className="p-3 bg-[#F8FAF8] rounded-[8px] border border-[#E8ECE8] text-xs text-[#5F6961]">
            Estimasi kebutuhan kedelai otomatis berdasarkan BOM:{" "}
            <span className="font-bold text-[#4F7C59]">
              {(formData.planned_quantity * 10) / 10} KG Kedelai
            </span>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#E8ECE8]">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Mulai Batch Produksi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
