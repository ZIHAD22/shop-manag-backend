import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { historyValidation } from "./history.validation";
import { historyController } from "./history.controller";

const router = Router();

router.post(
  "/",
  validateRequest(historyValidation.createHistorySchema),
  historyController.createHistory,
);

export const historyRouter = router;
