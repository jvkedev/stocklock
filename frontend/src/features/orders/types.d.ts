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
