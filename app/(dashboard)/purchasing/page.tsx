"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/badge";
import { purchasingService, PurchaseOrder } from "@/services/purchasing.service";
import { masterService, Supplier, Material } from "@/services/master.service";
import { Plus, ShoppingCart, CheckCircle2, Truck } from "lucide-react";

export default function PurchasingPage() {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isPoModalOpen, setIsPoModalOpen] = useState(false);
  const [isGrModalOpen, setIsGrModalOpen] = useState(false);
  const [selectedPo, setSelectedPo] = useState<PurchaseOrder | null>(null);

  const [poForm, setPoForm] = useState({
    supplier_id: "",
    material_id: "",
    quantity: 1000,
    unit_price: 10000,
  });

  const [grForm, setGrForm] = useState({
    receipt_number: `GR-202609-000${Math.floor(Math.random() * 90 + 10)}`,
    received_quantity: 1000,
    rejected_quantity: 0,
  });

  useEffect(() => {
    purchasingService.getPurchases().then(setPurchases);
    masterService.getSuppliers().then((sups) => {
      setSuppliers(sups);
      if (sups.length > 0) setPoForm((prev) => ({ ...prev, supplier_id: sups[0].id }));
    });
    masterService.getMaterials().then((mats) => {
      setMaterials(mats);
      if (mats.length > 0) setPoForm((prev) => ({ ...prev, material_id: mats[0].id }));
    });
  }, []);

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === poForm.supplier_id);
    const mat = materials.find((m) => m.id === poForm.material_id);

    const newPo: PurchaseOrder = {
      id: `PO-${Math.random().toString(36).substring(2, 9)}`,
      po_number: `PO-202609-000${purchases.length + 3}`,
      supplier_id: poForm.supplier_id,
      supplier_name: sup?.name || "PT Kedelai Makmur",
      order_date: new Date().toISOString().split("T")[0],
      expected_date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
      status: "APPROVED",
      total_amount: poForm.quantity * poForm.unit_price,
      items: [
        {
          material_id: poForm.material_id,
          material_name: mat?.name || "Kedelai Impor Super",
          quantity: poForm.quantity,
          unit_price: poForm.unit_price,
          subtotal: poForm.quantity * poForm.unit_price,
        },
      ],
    };

    setPurchases([newPo, ...purchases]);
    setIsPoModalOpen(false);
  };

  const handleReceiveGoods = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPo) return;

    setPurchases(
      purchases.map((p) => (p.id === selectedPo.id ? { ...p, status: "COMPLETED" as const } : p))
    );
    setIsGrModalOpen(false);
    alert(`Goods Receipt ${grForm.receipt_number} berhasil diinput! Stok otomatis bertambah +${grForm.received_quantity} KG di inventaris.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Purchase Orders & Goods Receipt</h2>
          <p className="text-sm text-[#5F6961]">
            Kelola pengadaan bahan baku, penerbitan PO ke supplier, dan Goods Receipt (GR).
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsPoModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Buat Purchase Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Purchase Order (PO)</CardTitle>
          <CardDescription>Status pengadaan bahan baku pabrik</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">No. PO</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">Tgl Pesan</th>
                <th className="py-3 px-4">Item Material</th>
                <th className="py-3 px-4 text-right">Total (Rp)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {purchases.map((po) => (
                <tr key={po.id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#4F7C59]">{po.po_number}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{po.supplier_name}</td>
                  <td className="py-3.5 px-4 text-xs text-[#5F6961]">{po.order_date}</td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#172019]">
                    {po.items.map((i) => `${i.material_name} (${i.quantity.toLocaleString()} KG)`).join(", ")}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#172019]">
                    Rp {po.total_amount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {po.status === "APPROVED" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedPo(po);
                          setIsGrModalOpen(true);
                        }}
                      >
                        <Truck className="w-3.5 h-3.5 mr-1" /> Terima Barang (GR)
                      </Button>
                    )}
                    {po.status === "COMPLETED" && (
                      <span className="text-xs font-semibold text-[#3F8F5F] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal Create PO */}
      <Modal
        isOpen={isPoModalOpen}
        onClose={() => setIsPoModalOpen(false)}
        title="Terbitkan Purchase Order Baru"
        description="Pilih supplier dan kuantitas material yang dipesan."
      >
        <form onSubmit={handleCreatePo} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#172019] block mb-1">
              Pilih Supplier
            </label>
            <select
              value={poForm.supplier_id}
              onChange={(e) => setPoForm({ ...poForm, supplier_id: e.target.value })}
              className="w-full h-10 px-3 bg-white border border-[#DDE3DE] rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#172019] block mb-1">
              Pilih Material
            </label>
            <select
              value={poForm.material_id}
              onChange={(e) => setPoForm({ ...poForm, material_id: e.target.value })}
              className="w-full h-10 px-3 bg-white border border-[#DDE3DE] rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
            >
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Kuantitas Order (KG)"
              type="number"
              value={poForm.quantity}
              onChange={(e) => setPoForm({ ...poForm, quantity: Number(e.target.value) })}
              required
            />
            <Input
              label="Harga Satuan (Rp/KG)"
              type="number"
              value={poForm.unit_price}
              onChange={(e) => setPoForm({ ...poForm, unit_price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="p-3 bg-[#F8FAF8] rounded-[8px] border border-[#E8ECE8] flex justify-between items-center text-sm">
            <span className="text-[#5F6961]">Total Tagihan PO:</span>
            <span className="font-bold text-[#4F7C59] text-base">
              Rp {(poForm.quantity * poForm.unit_price).toLocaleString("id-ID")}
            </span>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#E8ECE8]">
            <Button type="button" variant="secondary" onClick={() => setIsPoModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Terbitkan PO
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Goods Receipt (GR) */}
      <Modal
        isOpen={isGrModalOpen}
        onClose={() => setIsGrModalOpen(false)}
        title={`Input Goods Receipt (${selectedPo?.po_number})`}
        description="Catat jumlah barang yang diterima fisik di gudang."
      >
        <form onSubmit={handleReceiveGoods} className="space-y-4">
          <Input
            label="No. Receipt (GR)"
            value={grForm.receipt_number}
            onChange={(e) => setGrForm({ ...grForm, receipt_number: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Jumlah Diterima (KG)"
              type="number"
              value={grForm.received_quantity}
              onChange={(e) => setGrForm({ ...grForm, received_quantity: Number(e.target.value) })}
              required
            />
            <Input
              label="Jumlah Reject (KG)"
              type="number"
              value={grForm.rejected_quantity}
              onChange={(e) => setGrForm({ ...grForm, rejected_quantity: Number(e.target.value) })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#E8ECE8]">
            <Button type="button" variant="secondary" onClick={() => setIsGrModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan GR & Update Stok
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
