import { AppError } from "../../shared/errors/AppError.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserName,
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
