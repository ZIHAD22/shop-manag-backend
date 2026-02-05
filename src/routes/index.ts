import { Router } from "express";
import { shopOwnerRouter } from "../modules/user/user.routes";
import { shopRouter } from "../modules/shop/shop.routes";
import { inventoryRouter } from "../modules/inventory/inventory.routes";
import { productRouter } from "../modules/product/product.routes";
import authRouter from "../modules/auth/auth.routes";
const router = Router();

const moduleRoute = [
  {
    path: "/shopowner",
    route: shopOwnerRouter,
  },
  {
    path: "/shop",
    route: shopRouter,
  },
  {
    path: "/inventory",
    route: inventoryRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
