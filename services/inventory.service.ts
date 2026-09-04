import { apiClient } from "@/lib/api-client";
import { StockStatusLevel } from "@/lib/design-tokens";

export interface InventoryBalance {
  material_id: string;
  material_code: string;
  material_name: string;
  current_stock: number;
  unit: string;
  minimum_stock: number;
  reorder_point: number;
  status: StockStatusLevel;
  location: string;
  updated_at: string;
}

export interface InventoryTransaction {
  id: string;
  material_id: string;
  material_name: string;
  type: "STOCK_IN" | "PRODUCTION_USAGE" | "ADJUSTMENT";
  quantity: number;
  reference_no: string;
  timestamp: string;
  notes: string;
}

export const inventoryService = {
  getBalances: async (): Promise<InventoryBalance[]> => {
    try {
      return await apiClient.get("/inventory");
    } catch {
      return [
        {
          material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          material_code: "MAT-001",
          material_name: "Kedelai Impor Super",
          current_stock: 700,
          unit: "KG",
          minimum_stock: 500,
          reorder_point: 986,
          status: "REORDER",
          location: "Gudang Utama A",
          updated_at: "2026-09-05T08:00:00Z",
        },
        {
          material_id: "MT-4c8e5cbe-0cee-3c1e-8c4e-dc7e661f9501",
          material_code: "MAT-002",
          material_name: "Garam Konsumsi",
          current_stock: 120,
          unit: "KG",
          minimum_stock: 30,
          reorder_point: 50,
          status: "SAFE",
          location: "Gudang B",
          updated_at: "2026-09-05T08:00:00Z",
        },
        {
          material_id: "MT-5d9f6dcf-1dff-4d2f-9d5f-ed8f772fa602",
          material_code: "MAT-003",
          material_name: "Kunyit Pewarna Alami",
          current_stock: 45,
          unit: "KG",
          minimum_stock: 25,
          reorder_point: 40,
          status: "APPROACHING_ROP",
          location: "Gudang B",
          updated_at: "2026-09-05T08:00:00Z",
        },
      ];
    }
  },

  getTransactions: async (): Promise<InventoryTransaction[]> => {
    try {
      return await apiClient.get("/inventory/transactions");
    } catch {
      return [
        {
          id: "TX-9bdd2b0d-7b3d-cb6d-550e-8400e29b41d4",
          material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          material_name: "Kedelai Impor Super",
          type: "STOCK_IN",
          quantity: 2450,
          reference_no: "GR-202609-0001",
          timestamp: "2026-09-04T10:00:00Z",
          notes: "Penerimaan Barang PO-202609-0001 dari PT Kedelai Makmur",
        },
        {
          id: "TX-8acc1a0c-6a2c-5b5c-440d-7300d18a30c3",
          material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          material_name: "Kedelai Impor Super",
          type: "PRODUCTION_USAGE",
          quantity: -820,
          reference_no: "PROD-202609-0001",
          timestamp: "2026-09-04T15:30:00Z",
          notes: "Pemakaian bahan produksi Batch Tahu Putih",
        },
      ];
    }
  },

  processStockIn: async (data: {
    material_id: string;
    quantity: number;
    reference_no: string;
    location: string;
    notes?: string;
  }) => {
    return await apiClient.post("/inventory/stock-in", data);
  },

  processStockOut: async (data: {
    material_id: string;
    quantity: number;
    reference_no: string;
    notes?: string;
  }) => {
    return await apiClient.post("/inventory/stock-out", data);
  },
};
