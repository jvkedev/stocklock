import { db } from "../../infrastructure/database/db.js";

export const createRefreshToken = async (
  userId: string,
  tokenHash: string,
  jti: string,
  expiresAt: Date,
) => {
  const result = await db.query(
    `INSERT INTO refresh_tokens(
      user_id,
      jti,
      token_hash,
      expires_at
    ) VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, jti, expires_at, created_at`,
    [userId, jti, tokenHash, expiresAt],
  );

  return result.rows[0];
};

export const getRefreshTokenByJti = async (jti: string) => {
  const result = await db.query(
    `SELECT id, user_id, jti, token_hash, expires_at, revoked_at
    FROM refresh_tokens
    WHERE jti = $1`,
    [jti],
  );

  return result.rows[0] ?? null;
};

export const revokeRefreshToken = async (jti: string) => {
  await db.query(
    `UPDATE refresh_tokens
    SET revoked_at = NOW()
    WHERE jti = $1`,
    [jti],
  );
};

export const deleteRefreshToken = async (jti: string) => {
  await db.query(
    `DELETE FROM refresh_tokens
    WHERE jti = $1`,
    [jti],
  );
};
