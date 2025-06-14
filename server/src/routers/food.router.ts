import { Router } from "express";
import {
  deleteFoodController,
  categoryFoodController,
  updateFoodController,
  getFoodController,
  createFoodController,
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";
import { UserRoleEnum } from "../models";


export const foodRouter = Router();

foodRouter.get("/:categoryId", categoryFoodController);

foodRouter
  .route("/")
  .get(authenticateUser, authorization(UserRoleEnum.ADMIN), getFoodController);

foodRouter
  .route("/")
  .post(authenticateUser, authorization(UserRoleEnum.ADMIN), createFoodController);

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
