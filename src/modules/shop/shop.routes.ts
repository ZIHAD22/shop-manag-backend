import { Router } from "express";
import { shopController } from "./shop.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", auth(Role.OWNER), shopController.createShop);

export const shopRouter = router;
