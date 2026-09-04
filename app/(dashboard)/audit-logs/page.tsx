"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    {
      id: "AL-550e8400-e29b-41d4-a716-446655440000",
      user: "Budi Manager (US-b2c3d4e5...)",
      action: "APPROVE",
      entity_type: "PURCHASE_ORDER",
      entity_id: "PO-e5f67890-abcd-ef12-3456-7890abcdef12",
      timestamp: "2026-09-05T08:30:00Z",
    },
    {
      id: "AL-660f9501-f30c-52e5-b827-557766551111",
      user: "Gudang Staff (US-a1b2c3d4...)",
      action: "INSERT_STOCK_IN",
      entity_type: "GOODS_RECEIPT",
      entity_id: "GR-4372a567-0e02-b2c3-d479-9b1deb4d3b7d",
      timestamp: "2026-09-04T10:00:00Z",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#172019] flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#4F7C59]" /> System Security Audit Logs
        </h2>
        <p className="text-sm text-[#5F6961]">
          Pencatatan jejak aktivitas user (Audit Trail) terenkripsi untuk keamanan sistem SCM.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas Pengguna</CardTitle>
          <CardDescription>Riwayat pengubahan data terpenting di sistem</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F1F4F1] text-[#5F6961] text-xs font-semibold uppercase tracking-wider border-b border-[#E8ECE8]">
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Aksi</th>
                <th className="py-3 px-4">Entitas</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECE8]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAF8] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-xs text-[#879088]">{log.id}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#172019]">{log.user}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-1 bg-[#E5EEE6] text-[#4F7C59] font-bold rounded text-xs">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#172019]">
                    {log.entity_type} ({log.entity_id.substring(0, 10)}...)
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#5F6961]">
                    {new Date(log.timestamp).toLocaleString("id-ID")}
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
