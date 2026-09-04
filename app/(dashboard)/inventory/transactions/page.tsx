"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { inventoryService, InventoryTransaction } from "@/services/inventory.service";
import { ArrowLeftRight, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function StockTransactionsPage() {
  const [txs, setTxs] = useState<InventoryTransaction[]>([]);

  useEffect(() => {
    inventoryService.getTransactions().then(setTxs);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#172019]">Stock Transactions Ledger</h2>
        <p className="text-sm text-[#5F6961]">
          Riwayat mutasi barang masuk (STOCK_IN) dan barang keluar (PRODUCTION_USAGE).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buku Besar Mutasi Inventaris</CardTitle>
          <CardDescription>Pencatatan transaksional otomatis</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">Waktu Transaksi</th>
                <th className="py-3 px-4">Tipe Mutasi</th>
                <th className="py-3 px-4">Bahan Baku</th>
                <th className="py-3 px-4 text-right">Kuantitas Mutasi</th>
                <th className="py-3 px-4">No. Referensi</th>
                <th className="py-3 px-4">Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {txs.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 text-xs text-[#5F6961]">
                    {new Date(tx.timestamp).toLocaleString("id-ID")}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    {tx.type === "STOCK_IN" ? (
                      <span className="inline-flex items-center gap-1 text-[#3F8F5F] bg-[#EDF7F0] px-2 py-0.5 rounded text-xs font-bold">
                        <ArrowDownLeft className="w-3.5 h-3.5" /> STOCK IN (+)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#C94A4A] bg-[#FCEEEE] px-2 py-0.5 rounded text-xs font-bold">
                        <ArrowUpRight className="w-3.5 h-3.5" /> STOCK OUT (-)
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{tx.material_name}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#172019]">
                    {tx.quantity > 0 ? `+${tx.quantity}` : tx.quantity}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#4F7C59]">{tx.reference_no}</td>
                  <td className="py-3.5 px-4 text-xs text-[#5F6961]">{tx.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
