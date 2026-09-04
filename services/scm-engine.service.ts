import { apiClient } from "@/lib/api-client";

export interface ReorderRecommendation {
  id: string;
  material_id: string;
  material_code: string;
  material_name: string;
  current_stock: number;
  unit: string;
  reorder_point: number;
  predicted_demand: number;
  recommended_quantity: number;
  recommended_supplier_id: string;
  recommended_supplier_name: string;
  moora_score: number;
  reason: string;
  status: "PENDING_REVIEW" | "CONVERTED_TO_PO" | "DISMISSED";
}

export interface SupplierPerformance {
  supplier_id: string;
  supplier_name: string;
  on_time_delivery_rate: number;
  quality_rate: number;
  price_index: number;
  moora_score: number;
  rank: number;
}

export interface ForecastResult {
  material_id: string;
  material_name: string;
  model_name: string;
  mae: number;
  rmse: number;
  forecast_data: Array<{
    date: string;
    historical?: number;
    predicted: number;
  }>;
}

export const scmEngineService = {
  getReorderRecommendations: async (): Promise<ReorderRecommendation[]> => {
    try {
      return await apiClient.get("/inventory-control/recommendations");
    } catch {
      return [
        {
          id: "RC-cb6d550e-8400-e29b-41d4-a71644665544",
          material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          material_code: "MAT-001",
          material_name: "Kedelai Impor Super",
          current_stock: 700,
          unit: "KG",
          reorder_point: 986,
          predicted_demand: 430,
          recommended_quantity: 2449,
          recommended_supplier_id: "SP-f47ac10b-58cc-4372-a567-0e02b2c3d479",
          recommended_supplier_name: "PT Kedelai Makmur",
          moora_score: 93.5,
          reason: "Stok riil (700 KG) di bawah ROP (986 KG). Forecast demand 7 hari: 430 KG/minggu.",
          status: "PENDING_REVIEW",
        },
      ];
    }
  },

  getEoqParams: async (materialId: string) => {
    return await apiClient.get(`/inventory-control/${materialId}/eoq`);
  },

  getForecast: async (materialId: string): Promise<ForecastResult> => {
    try {
      return await apiClient.get(`/forecasting/${materialId}`);
    } catch {
      return {
        material_id: materialId,
        material_name: "Kedelai Impor Super",
        model_name: "XGBoost + Exponential Smoothing",
        mae: 12.4,
        rmse: 18.2,
        forecast_data: [
          { date: "01 Sep", historical: 410, predicted: 415 },
          { date: "02 Sep", historical: 425, predicted: 420 },
          { date: "03 Sep", historical: 430, predicted: 428 },
          { date: "04 Sep", historical: 418, predicted: 422 },
          { date: "05 Sep", predicted: 430 },
          { date: "06 Sep", predicted: 435 },
          { date: "07 Sep", predicted: 440 },
        ],
      };
    }
  },

  trainForecastModel: async (materialId: string) => {
    return await apiClient.post(`/forecasting/${materialId}/train`);
  },

  getSupplierScores: async (): Promise<SupplierPerformance[]> => {
    try {
      return await apiClient.get("/analytics/supplier-scores");
    } catch {
      return [
        {
          supplier_id: "SP-f47ac10b-58cc-4372-a567-0e02b2c3d479",
          supplier_name: "PT Kedelai Makmur",
          on_time_delivery_rate: 98.0,
          quality_rate: 99.2,
          price_index: 90.0,
          moora_score: 93.5,
          rank: 1,
        },
        {
          supplier_id: "SP-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          supplier_name: "CV Sumber Kedelai Jaya",
          on_time_delivery_rate: 92.5,
          quality_rate: 95.0,
          price_index: 94.0,
          moora_score: 88.2,
          rank: 2,
        },
      ];
    }
  },
};
