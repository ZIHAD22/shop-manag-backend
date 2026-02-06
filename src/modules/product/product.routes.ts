import { Router } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", auth(Role.OWNER), productController.createProduct);

export const productRouter = router;
