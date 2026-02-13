import { Router } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";

const router = Router();

router.post(
  "/",
  auth(Role.OWNER),
  validateRequest(productValidation.createProduct),
  productController.createProduct,
);

router.get("/", auth(Role.OWNER), productController.findShopOwnerAllProduct);

export const productRouter = router;
