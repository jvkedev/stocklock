import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
    },
    config.auth.accessTokenSecret,
    {
      expiresIn: config.auth.accessTokenExpiresIn,
    },
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
    },
    config.auth.refreshTokenSecret,
    {
      expiresIn: config.auth.refreshTokenExpiresIn,
    },
  );
};
