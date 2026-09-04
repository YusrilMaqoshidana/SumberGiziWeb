import { apiClient } from "@/lib/api-client";

export interface Supplier {
  id: string;
  code: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  payment_terms: string;
  is_active: boolean;
}

export interface Material {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  minimum_stock: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  description: string;
  bom: Array<{
    material_id: string;
    material_name: string;
    quantity: number;
    unit: string;
  }>;
}

export const masterService = {
  // Suppliers
  getSuppliers: async (): Promise<Supplier[]> => {
    try {
      return await apiClient.get("/suppliers");
    } catch {
      // Mock fallback if backend offline
      return [
        {
          id: "SP-f47ac10b-58cc-4372-a567-0e02b2c3d479",
          code: "SUP-001",
          name: "PT Kedelai Makmur",
          contact_person: "Budi Santoso",
          phone: "081234567890",
          email: "budi@kedelaimakmur.com",
          address: "Jl. Raya Industri No. 45, Jakarta",
          payment_terms: "NET-14",
          is_active: true,
        },
        {
          id: "SP-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          code: "SUP-002",
          name: "CV Sumber Kedelai Jaya",
          contact_person: "Andi Wijaya",
          phone: "081298765432",
          email: "andi@kedelaijaya.com",
          address: "Jl. Pergudangan No. 12, Bekasi",
          payment_terms: "NET-30",
          is_active: true,
        },
      ];
    }
  },

  createSupplier: async (data: Partial<Supplier>): Promise<Supplier> => {
    return await apiClient.post("/suppliers", data);
  },

  // Materials
  getMaterials: async (): Promise<Material[]> => {
    try {
      return await apiClient.get("/materials");
    } catch {
      return [
        {
          id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
          code: "MAT-001",
          name: "Kedelai Impor Super",
          category: "Bahan Baku Utama",
          unit: "KG",
          minimum_stock: 500,
          is_active: true,
        },
        {
          id: "MT-4c8e5cbe-0cee-3c1e-8c4e-dc7e661f9501",
          code: "MAT-002",
          name: "Garam Konsumsi",
          category: "Bahan Pendukung",
          unit: "KG",
          minimum_stock: 30,
          is_active: true,
        },
        {
          id: "MT-5d9f6dcf-1dff-4d2f-9d5f-ed8f772fa602",
          code: "MAT-003",
          name: "Kunyit Pewarna Alami",
          category: "Bahan Pendukung",
          unit: "KG",
          minimum_stock: 25,
          is_active: true,
        },
      ];
    }
  },

  createMaterial: async (data: Partial<Material>): Promise<Material> => {
    return await apiClient.post("/materials", data);
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    try {
      return await apiClient.get("/products");
    } catch {
      return [
        {
          id: "PR-7890abcd-ef12-3456-7890-abcdef123456",
          code: "PRD-001",
          name: "Tahu Putih Premium",
          unit: "Pcs",
          description: "Tahu putih reguler tekstur halus kualitas super",
          bom: [
            {
              material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
              material_name: "Kedelai Impor Super",
              quantity: 10.0,
              unit: "KG",
            },
          ],
        },
        {
          id: "PR-8901bcde-f234-4567-8901-bcdef2345678",
          code: "PRD-002",
          name: "Tahu Kuning Gurih",
          unit: "Pcs",
          description: "Tahu kuning dengan rasa gurih berbumbu kunyit",
          bom: [
            {
              material_id: "MT-3b7d4bad-9bdd-2b0d-7b3d-cb6d550e8400",
              material_name: "Kedelai Impor Super",
              quantity: 11.0,
              unit: "KG",
            },
            {
              material_id: "MT-5d9f6dcf-1dff-4d2f-9d5f-ed8f772fa602",
              material_name: "Kunyit Pewarna Alami",
              quantity: 0.5,
              unit: "KG",
            },
          ],
        },
      ];
    }
  },
};
