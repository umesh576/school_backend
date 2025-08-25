import bcrypt from "bcryptjs";
export const hashPassword = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = bcrypt.hash(plainPassword, salt);

  return hashPassword;
};
