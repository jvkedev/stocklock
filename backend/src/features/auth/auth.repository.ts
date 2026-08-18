import { db } from "../../infrastructure/database/db.js";

export const createRefreshToken = async (
  userId: string,
  tokenHash: string,
  expiresAt: Date,
) => {
  const result = await db.query(
    `INSERT INTO refresh_tokens(
      user_id,
      token_hash,
      expires_at
    ) VALUES ($1, $2, $3)
    RETURNING id, user_id, expires_at, created_at`,
    [userId, tokenHash, expiresAt],
  );

  return result.rows[0];
};
