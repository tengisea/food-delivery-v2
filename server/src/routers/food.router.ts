import { Router } from "express";
import {
  deleteFoodController,
  foodController,
  updateFoodController,getFoodController
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";


export const foodRouter = Router();

foodRouter.get("/:categoryId", getFoodController);

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
