import argon2 from "argon2";
import ms from "ms";
import config from "../../config/config.js";
import { AppError } from "../../shared/errors/AppError.js";
import {
  createNewUser,
  getUserByEmail,
  getUserById,
} from "../users/user.service.js";
import { hashRefreshToken } from "./auth.crypto.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./auth.token.js";
import {
  createRefreshToken,
  getRefreshTokenByJti,
  revokeRefreshToken,
} from "./auth.repository.js";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw AppError.conflict("User already exists");
  }

  const passwordHash = await argon2.hash(password);

  const user = await createNewUser(name, email, passwordHash);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw AppError.unauthorized("Invalid credentials");
  }

  const isPasswordMatch = await argon2.verify(user.password_hash, password);

  if (!isPasswordMatch) {
    throw AppError.unauthorized("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  const decodedRefreshToken = verifyRefreshToken(refreshToken);

  const tokenHash = hashRefreshToken(refreshToken);

  const expiresAt = new Date(
    Date.now() + ms(config.auth.refreshTokenExpiresIn),
  );

  await createRefreshToken(
    user.id,
    tokenHash,
    decodedRefreshToken.jti,
    expiresAt,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },

    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  const storedToken = await getRefreshTokenByJti(decoded.jti);

  if (!storedToken) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  if (storedToken.revoked_at) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  if (new Date(storedToken.expires_at).getTime() < Date.now()) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  const incomingHash = hashRefreshToken(refreshToken);

  if (incomingHash !== storedToken.token_hash) {
    throw AppError.unauthorized("Invalid or expired refresh token");
  }

  await revokeRefreshToken(decoded.jti);

  const accessToken = generateAccessToken(decoded.sub);
  const newRefreshToken = generateRefreshToken(decoded.sub);
  const newDecoded = verifyRefreshToken(newRefreshToken);

  const newTokenHash = hashRefreshToken(newRefreshToken);
  const newExpiresAt = new Date(
    Date.now() + ms(config.auth.refreshTokenExpiresIn),
  );

  await createRefreshToken(
    decoded.sub,
    newTokenHash,
    newDecoded.jti,
    newExpiresAt,
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const currentUser = async (id: string) => {
  const user = await getUserById(id);

  if (!user) {
    throw AppError.notFound("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
