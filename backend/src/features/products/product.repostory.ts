import { db } from "../../infrastructure/database/db.js";

export const createProduct = async (
  name: string,
  description: string | null,
  price: number,
  stock: number,
) => {
  const result = await db.query(
    `INSERT INTO products (name, description, price, stock)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, description, price, stock, created_at, updated_at`,
    [name, description, price, stock],
  );

  return result.rows[0];
};

export const findAllProducts = async () => {
  const result = await db.query(
    `SELECT id, name, description, price, stock, created_at, updated_at
    FROM products
    ORDER BY created_at DESC`,
  );

  return result.rows;
};

export const findProductById = async (id: string) => {
  const result = await db.query(
    `SELECT id, name, description, price, stock, created_at, updated_at
        FROM products
        WHERE id = $1`,
    [id],
  );

  return result.rows[0] ?? null;
};

export const decrementStock = async (productId: string, quantity: number) => {
  const result = await db.query(
    `UPDATE products
    SET stock = stock - $1, updated_at = NOW()
    WHERE id = $2 AND stock >= $1
    RETURNING id, name, price, stock`,
    [quantity, productId],
  );

  return result.rows[0] ?? null;
};
