import { db } from "../../infrastructure/database/db.js";

export const createOrder = async (
  userId: string,
  productId: string | null,
  quantity: number,
  totalPrice: number,
) => {
  const result = await db.query(
    `INSERT INTO orders (user_id, product_id, quantity, total_price)
        VALUES($1, $2, $3, $4)
        RETURNING id, user_id, product_id, quantity, total_price, status, created_at`,
    [userId, productId, quantity, totalPrice],
  );

  return result.rows[0];
};
