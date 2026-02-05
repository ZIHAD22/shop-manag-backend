import bcrypt from "bcryptjs";
import z from "zod";
import { authValidation } from "./auth.validation";
import prisma from "../../config/db";
import { createAccessToken } from "../../utils/createAccessToken";
import config from "../../config";

const authLogin = async (payload: z.infer<typeof authValidation.authLogin>) => {
  const user = await prisma.auth.findFirst({
    where: {
      OR: [{ email: payload.email }],
      status: "APPROVED",
    },
    omit: {
      password: false,
    },
  });
  if (!user) {
    throw new Error("Wrong Credential!");
  }

  const isCorrectPass = await bcrypt.compare(payload.password, user.password);

  if (!isCorrectPass) {
    throw new Error("Wrong Credential!");
  }

  const accessToken = createAccessToken(
    { email: user.email, role: user.role },
    config.access_secret as string,
    "1d",
  );

  const refreshToken = createAccessToken(
    { email: user.email, role: user.role },
    config.refresh_secret as string,
    "34d",
  );

  return { user: { ...user, password: "" }, accessToken, refreshToken };
};

export const authServices = {
  authLogin,
};
