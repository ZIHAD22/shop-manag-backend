import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/",
  validateRequest(authValidation.authLogin),
  authController.authLogin,
);

export default authRouter;
