"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/badge";
import { masterService, Material } from "@/services/master.service";
import { Plus, Search, Package } from "lucide-react";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    code: "MAT-004",
    name: "",
    category: "Bahan Baku Utama",
    unit: "KG",
    minimum_stock: 100,
  });

  useEffect(() => {
    masterService.getMaterials().then(setMaterials);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newMat: Material = {
      id: `MT-${Math.random().toString(36).substring(2, 9)}`,
      ...formData,
      is_active: true,
    };
    setMaterials([...materials, newMat]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Raw Materials Master</h2>
          <p className="text-sm text-[#5F6961]">
            Kelola katalog bahan baku, satuan unit, dan batas minimum stock.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Tambah Bahan Baku
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Daftar Bahan Baku</CardTitle>
            <CardDescription>Total {materials.length} material terdaftar</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#879088] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari bahan baku..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs bg-[#F1F4F1] border-none rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">Kode Material</th>
                <th className="py-3 px-4">Nama Material</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-center">Satuan</th>
                <th className="py-3 px-4 text-right">Min Stock</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {materials
                .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
                .map((m) => (
                  <tr key={m.id} className="hover:bg-[#F8FAF8] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#879088]">{m.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#172019]">{m.name}</td>
                    <td className="py-3.5 px-4 text-[#5F6961]">{m.category}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-[#4F7C59]">{m.unit}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#172019]">
                      {m.minimum_stock.toLocaleString("id-ID")} {m.unit}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status="SAFE" label="AKTIF" />
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
        title="Tambah Bahan Baku Baru"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Kode Material"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />
          <Input
            label="Nama Material"
            placeholder="Kedelai Impor Super"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Satuan Unit"
              placeholder="KG / L"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              required
            />
            <Input
              label="Minimum Stock"
              type="number"
              value={formData.minimum_stock}
              onChange={(e) => setFormData({ ...formData, minimum_stock: Number(e.target.value) })}
              required
            />
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-[#E8ECE8]">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Material
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
