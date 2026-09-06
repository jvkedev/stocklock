export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

export interface PlaceOrderPayload {
  productId: string;
  quantity: number;
}

export interface MyOrder {
  id: string;
  quantity: number;
  total_price: string;
  status: string;
  created_at: string;
  product_id: string;
  product_name: string;
}
