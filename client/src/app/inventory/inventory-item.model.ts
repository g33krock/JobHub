export interface InventoryItem {
    id?: number;
    description: string;
    quantity: number;
    available_quantity?: number;
    purchase_price: number;
    rental: boolean;
    sale_price: number;
  }
  