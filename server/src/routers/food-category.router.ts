import { Router } from "express";
import { UserRoleEnum } from "../models";
import {
  deleteFoodCategoryController,
  foodCategoryController,
  updateFoodCategoryController,
} from "../controllers";
import { authenticateUser, authorization } from "../middlewares";

export const foodCategoryRouter = Router();

foodCategoryRouter.route("/").get(foodCategoryController);
foodCategoryRouter
  .route("/")
  .post(
    authenticateUser,
    authorization(UserRoleEnum.ADMIN),
    foodCategoryController
  );
foodCategoryRouter.patch(
  "/:foodCategoryId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  updateFoodCategoryController
);
foodCategoryRouter.delete(
  "/:foodCategoryId",
  authenticateUser,
  authorization(UserRoleEnum.ADMIN),
  deleteFoodCategoryController
);