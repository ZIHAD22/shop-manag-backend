import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { historyValidation } from "./history.validation";
import { historyController } from "./history.controller";

const router = Router();

router.get("/:id", historyController.getHistoryById);
router.get(
  "/inventory/:inventoryId",
  historyController.getHistoryByInventoryId,
);
router.get("/product/:productId", historyController.getHistoryByProductId);
router.get("/performer/:email", historyController.getHistoryByPerformer);
router.get("/shop/:shopId", historyController.getHistoryByShopId);

export const historyRouter = router;
