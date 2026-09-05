import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config/config.js";
import { randomUUID } from "crypto";

interface TokenPayload extends JwtPayload {
  sub: string;
  role: string;
  jti?: string;
}

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign(
    {
      sub: userId,
      role,
    },
    config.auth.accessTokenSecret,
    {
      expiresIn: config.auth.accessTokenExpiresIn,
    },
  );
};

export const generateRefreshToken = (userId: string, role: string) => {
  const jti = randomUUID();
  const token = jwt.sign(
    {
      sub: userId,
      role,
      jti,
    },
    config.auth.refreshTokenSecret,
    {
      expiresIn: config.auth.refreshTokenExpiresIn,
    },
  );

  return { token, jti };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, config.auth.accessTokenSecret);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.sub !== "string" ||
    typeof decoded.role !== "string"
  ) {
    throw new Error("Invalid access token payload");
  }

  return decoded as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, config.auth.refreshTokenSecret);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.sub !== "string" ||
    typeof decoded.role !== "string" ||
    typeof decoded.jti !== "string"
  ) {
    throw new Error("Invalid refresh token JwtPayload");
  }

  return decoded as TokenPayload;
};
