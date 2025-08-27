import jwt from "jsonwebtoken";
import { IPayload } from "../@types/global.types";

const JWT_SECRET_TOKEN = process.env.JWT_SECRECT_TOKEN || "";
const JWT_TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES || "1d";

export const generateWebToken = (payload: IPayload) => {
  if (!JWT_SECRET_TOKEN) {
    throw new Error("JWT_SECRET_TOKEN is not defined");
  }

  return jwt.sign(payload, JWT_SECRET_TOKEN, {
    expiresIn: JWT_TOKEN_EXPIRES as string,
  });
};
