import { apiClient } from "@/lib/api-client";
import { StatusType } from "@/components/ui/badge";

export interface ProductionBatch {
  id: string;
  production_number: string;
  product_id: string;
  product_name: string;
  production_date: string;
  planned_quantity: number;
  actual_quantity: number;
  status: StatusType;
  material_usages: Array<{
    material_id: string;
    material_name: string;
    planned_quantity: number;
    actual_quantity: number;
    unit: string;
  }>;
}

export const productionService = {
  getProductionBatches: async (): Promise<ProductionBatch[]> => {
    try {
      return await apiClient.get("/production");
    } catch {
      return [
        {
          id: "PB-a5670e02-b2c3-d479-9b1deb4d3b7d",
          production_number: "PROD-202609-0001",
          product_id: "PR-7890abcd-ef12-3456-7890-abcdef123456",
          product_name: "Tahu Putih Premium",
          production_date: "2026-09-04",
          planned_quantity: 1000,
          actual_quantity: 980,
          status: "COMPLETED",
          material_usages: [
            {
              material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
              material_name: "Kedelai Impor Super",
              planned_quantity: 800,
              actual_quantity: 820,
              unit: "KG",
            },
          ],
        },
      ];
    }
  },

  createProductionBatch: async (data: {
    product_id: string;
    planned_quantity: number;
    production_date: string;
  }) => {
    return await apiClient.post("/production", data);
  },

  recordMaterialUsage: async (
    batchId: string,
    data: {
      actual_product_quantity: number;
      usages: Array<{ material_id: string; actual_quantity: number }>;
    }
  ) => {
    return await apiClient.post(`/production/${batchId}/usage`, data);
  },
};
