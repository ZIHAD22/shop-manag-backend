import { Router } from "express";
import { shopOwnerRouter } from "../modules/user/user.routes";
import { shopRouter } from "../modules/shop/shop.routes";
import { inventoryRouter } from "../modules/inventory/inventory.routes";
import { productRouter } from "../modules/product/product.routes";
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
