import { db } from "../../infrastructure/database/db.js";

export const findUserByEmail = async (email: string) => {
  const result = await db.query(
    `SELECT id, name, email, password_hash, created_at, updated_at
    FROM users
    WHERE email = $1`,
    [email],
  );

  return result.rows[0];
};

export const findUserById = async (id: string) => {
  const result = await db.query(
    `SELECT id, name, email, created_at, updated_at 
    FROM users
    WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};

export const createUser = async (
  name: string,
  email: string,
  password_hash: string,
) => {
  const result = await db.query(
    `INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, password_hash, created_at, updated_at`,
    [name, email, password_hash],
  );

  return result.rows[0];
};
