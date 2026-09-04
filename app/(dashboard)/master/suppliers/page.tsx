"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { StatusBadge } from "@/components/ui/badge";
import { masterService, Supplier } from "@/services/master.service";
import { Plus, Search, Truck, Phone, Mail, MapPin } from "lucide-react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    code: "SUP-003",
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    payment_terms: "NET-14",
  });

  useEffect(() => {
    masterService.getSuppliers().then(setSuppliers);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSup: Supplier = {
      id: `SP-${Math.random().toString(36).substring(2, 9)}`,
      ...formData,
      is_active: true,
    };
    setSuppliers([...suppliers, newSup]);
    setIsModalOpen(false);
    setFormData({
      code: `SUP-00${suppliers.length + 2}`,
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
      payment_terms: "NET-14",
    });
  };

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Suppliers Management</h2>
          <p className="text-sm text-[#5F6961]">
            Kelola data pemasok bahan baku kedelai dan bahan baku pendukung.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Tambah Supplier
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Daftar Supplier</CardTitle>
            <CardDescription>Total {suppliers.length} supplier terdaftar</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#879088] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari supplier..."
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
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Nama Supplier</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Kontak</th>
                <th className="py-3 px-4">Payment Terms</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {filtered.map((sup) => (
                <tr key={sup.id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#879088]">{sup.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{sup.name}</td>
                  <td className="py-3.5 px-4 text-[#5F6961]">{sup.contact_person}</td>
                  <td className="py-3.5 px-4 text-[#5F6961]">
                    <div className="flex flex-col text-xs">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#879088]" /> {sup.phone}
                      </span>
                      <span className="flex items-center gap-1 text-[#879088]">
                        <Mail className="w-3 h-3" /> {sup.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 bg-[#F1F4F1] rounded text-xs font-medium text-[#172019]">
                      {sup.payment_terms}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={sup.is_active ? "APPROVED" : "DRAFT"} label={sup.is_active ? "AKTIF" : "NON-AKTIF"} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal Add Supplier */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Supplier Baru"
        description="Lengkapi informasi detail pemasok bahan baku pabrik."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Kode Supplier"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
            <Input
              label="Nama Supplier"
              placeholder="PT Kedelai Makmur"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Person"
              placeholder="Budi Santoso"
              value={formData.contact_person}
              onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              required
            />
            <Input
              label="Telepon"
              placeholder="081234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="budi@supplier.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Alamat Lengkap"
            placeholder="Jl. Raya Industri No. 45"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-2 border-t border-[#E8ECE8]">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Supplier
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
