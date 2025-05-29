import { Router } from "express";
import {
  foodOrderController,
  adminFoodOrderController,
  updateFoodOrderController,
  getAllOrdersController,
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const foodOrderRouter = Router();

foodOrderRouter
  .route("/")
  .post(foodOrderController)
  .get(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    getAllOrdersController
  );

foodOrderRouter.get(
  "/:userId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  adminFoodOrderController
);

foodOrderRouter.patch(
  "/:foodOrderId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  updateFoodOrderController
);
