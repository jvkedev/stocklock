import {
  createUser,
  findUserByEmail,
  findUserById,
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
