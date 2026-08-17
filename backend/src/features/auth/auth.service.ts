import argon2 from "argon2";
import { AppError } from "../../shared/errors/AppError.js";
import { createNewUser, getUserByEmail } from "../users/user.service.js";

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
    throw AppError.unauthorized ("Invalid credentials");
  }

  const isPasswordMatch = await argon2.verify(user.password_hash, password);

  if (!isPasswordMatch) {
    throw AppError.unauthorized("Invalid credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
