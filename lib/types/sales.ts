export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export interface SalesCart {
  items: CartItem[];
  customerId?: number;
  customerName?: string;
  notes?: string;
}

export interface CreateSalesRequest {
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  customerId?: number;
  customerName?: string;
  notes?: string;
  paymentMethod: string;
  paymentAmount: number;
}

export interface SalesTransaction {
  id: number;
  invoiceNumber: string;
  date: string;
  items: {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  customerId?: number;
  customerName?: string;
  notes?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentAmount: number;
  change: number;
  createdBy: number;
  createdByName: string;
  createdAt: string;
}
