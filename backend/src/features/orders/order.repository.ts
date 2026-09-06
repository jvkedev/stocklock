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

export const findOrdersByUserId = async (userId: string) => {
  const result = await db.query(
    `SELECT 
      orders.id,
      orders.quantity,
      orders.total_price,
      orders.status,
      orders.created_at,
      products.id AS product_id,
      products.name AS product_name
      FROM orders
    JOIN products ON products.id = orders.product_id
    WHERE orders.user_id = $1
    ORDER BY orders.created_at DESC
    `,
    [userId],
  );

  return result.rows;
};
