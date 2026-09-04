import { apiClient } from "@/lib/api-client";
import { StatusType } from "@/components/ui/badge";

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id: string;
  supplier_name: string;
  order_date: string;
  expected_date: string;
  status: StatusType;
  total_amount: number;
  items: Array<{
    material_id: string;
    material_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }>;
}

export const purchasingService = {
  getPurchases: async (): Promise<PurchaseOrder[]> => {
    try {
      return await apiClient.get("/purchases");
    } catch {
      return [
        {
          id: "PO-e5f67890-abcd-ef12-3456-7890abcdef12",
          po_number: "PO-202609-0001",
          supplier_id: "SP-f47ac10b-58cc-4372-a567-0e02b2c3d479",
          supplier_name: "PT Kedelai Makmur",
          order_date: "2026-09-01",
          expected_date: "2026-09-03",
          status: "COMPLETED",
          total_amount: 25000000,
          items: [
            {
              material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
              material_name: "Kedelai Impor Super",
              quantity: 2500,
              unit_price: 10000,
              subtotal: 25000000,
            },
          ],
        },
        {
          id: "PO-f6a78901-bcde-f234-4567-8901abcdef23",
          po_number: "PO-202609-0002",
          supplier_id: "SP-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          supplier_name: "CV Sumber Kedelai Jaya",
          order_date: "2026-09-05",
          expected_date: "2026-09-07",
          status: "APPROVED",
          total_amount: 24490000,
          items: [
            {
              material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
              material_name: "Kedelai Impor Super",
              quantity: 2449,
              unit_price: 10000,
              subtotal: 24490000,
            },
          ],
        },
      ];
    }
  },

  createPurchaseOrder: async (data: {
    supplier_id: string;
    items: Array<{ material_id: string; quantity: number; unit_price: number }>;
    expected_date?: string;
  }): Promise<PurchaseOrder> => {
    return await apiClient.post("/purchases", data);
  },

  approvePurchaseOrder: async (id: string) => {
    return await apiClient.post(`/purchases/${id}/approve`);
  },

  receiveGoods: async (
    id: string,
    data: {
      receipt_number: string;
      received_date: string;
      items: Array<{
        material_id: string;
        ordered_quantity: number;
        received_quantity: number;
        rejected_quantity: number;
      }>;
    }
  ) => {
    return await apiClient.post(`/purchases/${id}/receive`, data);
  },
};
