import { Router } from "express";
import {
  deleteFoodController,
  foodController,
  updateFoodController,
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";

export const foodRouter = Router();

foodRouter.route("/").get(foodController);

foodRouter
  .route("/")
  .get(authenticateUser, authorization(UserRoleEnum.ADMIN), foodController);

foodRouter.delete(
  "/:foodId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  deleteFoodController
);

foodRouter.patch(
  "/:foodId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  updateFoodController
);
