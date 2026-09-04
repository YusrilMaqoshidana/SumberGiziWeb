"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { masterService, Product } from "@/services/master.service";
import { Plus, Layers, PackageCheck } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    masterService.getProducts().then(setProducts);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#172019]">Products & Bill of Materials (BOM)</h2>
          <p className="text-sm text-[#5F6961]">
            Kelola katalog produk tahu hasil olahan dan rasio resep penggunaan bahan baku.
          </p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-1" /> Tambah Produk Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <Card key={prod.id} className="flex flex-col justify-between">
            <div>
              <CardHeader className="flex flex-row items-start justify-between pb-3">
                <div>
                  <span className="text-xs font-semibold text-[#879088]">{prod.code}</span>
                  <CardTitle className="text-xl font-bold text-[#172019]">{prod.name}</CardTitle>
                </div>
                <StatusBadge status="APPROVED" label="AKTIF" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-[#5F6961]">{prod.description}</p>

                <div className="bg-[#F8FAF8] p-4 rounded-[12px] border border-[#E8ECE8]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#4F7C59] uppercase tracking-wider mb-2">
                    <Layers className="w-3.5 h-3.5" /> Recipe Bill of Materials (BOM)
                  </div>
                  <div className="space-y-2 text-xs">
                    {prod.bom.map((b, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-[#E8ECE8] last:border-none">
                        <span className="text-[#172019] font-medium">{b.material_name}</span>
                        <span className="font-bold text-[#4F7C59]">
                          {b.quantity} {b.unit} / 100 {prod.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-[#F1F4F1] rounded-b-[12px] flex justify-end gap-2">
              <Button variant="secondary" size="sm">
                Edit Resep BOM
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
