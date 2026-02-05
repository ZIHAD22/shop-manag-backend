import {
  Secret,
  SignOptions,
} from "./../../node_modules/@types/jsonwebtoken/index.d";
import jwt from "jsonwebtoken";

export const createAccessToken = (
  payload: any,
  secret: Secret,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  } as SignOptions);

  return token;
};
