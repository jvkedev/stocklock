import { createUser, findUserByEmail } from "./user.repository.js";

export const getUserByEmail = async (email: string) => {
  return await findUserByEmail(email);
};

export const createNewUser = async (
  name: string,
  email: string,
  passwordHash: string,
) => {
  return await createUser(name, email, passwordHash);
};
