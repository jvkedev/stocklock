import argon2 from "argon2";
import { AppError } from "../../shared/errors/AppError.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserName,
  updateUserPassword,
} from "./user.repository.js";

export const getUserByEmail = async (email: string) => {
  return await findUserByEmail(email);
};

export const getUserById = async (id: string) => {
  return await findUserById(id);
};

export const createNewUser = async (
  name: string,
  email: string,
  passwordHash: string,
) => {
  return await createUser(name, email, passwordHash);
};

export const updateUserProfile = async (id: string, name: string) => {
  const updated = await updateUserName(id, name);

  if (!updated) {
    throw AppError.notFound("User not found");
  }

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    created_at: updated.created_at,
    updated_at: updated.updated_at,
  };
};

export const changeUserPassword = async (
  id: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await getUserById(id);

  if (!user) {
    throw AppError.notFound("User not found");
  }

  const isCurrentPasswordValid = await argon2.verify(
    user.password_hash,
    currentPassword,
  );

  if (!isCurrentPasswordValid) {
    throw AppError.unauthorized("Current password is incorrect");
  }

  const newPasswordHash = await argon2.hash(newPassword);

  await updateUserPassword(id, newPasswordHash);
};
