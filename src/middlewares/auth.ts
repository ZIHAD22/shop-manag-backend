import { NextFunction, Request, Response } from "express";
import { tokenHelper } from "../utils/tokenHelper";
import config from "../config";
import AppError from "../error/AppError";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        throw new AppError(403, "You are now allows!", {
          name: "Token not found",
        });
      }

      const verifyUser = tokenHelper.verifyToken(
        token,
        config.access_secret as string,
      );

      if (roles.length && !roles.includes(verifyUser?.role)) {
        throw new AppError(403, "You are now allows!");
      }

      req.user = verifyUser;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
