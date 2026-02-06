import bcrypt from "bcryptjs";
import z from "zod";
import { authValidation } from "./auth.validation";
import prisma from "../../config/db";
import config from "../../config";
import { tokenHelper } from "../../utils/tokenHelper";
import AppError from "../../error/AppError";

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
    throw new AppError(200, "Wrong Credential!");
  }

  const shopOwner = await prisma.shopOwner.findFirst({
    where: {
      email: user.email,
    },
  });

  const accessToken = tokenHelper.createAccessToken(
    { ownerId: shopOwner?.id, email: user.email, role: user.role },
    config.access_secret as string,
    config.accessTokenExpiresIn as string,
  );

  const refreshToken = tokenHelper.createAccessToken(
    { ownerId: shopOwner?.id, email: user.email, role: user.role },
    config.refresh_secret as string,
    config.refreshTokenExpiresIn as string,
  );

  return { user: { ...user, password: "" }, accessToken, refreshToken };
};

export const authServices = {
  authLogin,
};
