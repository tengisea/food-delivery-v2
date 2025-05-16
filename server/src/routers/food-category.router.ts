import { Router } from "express";
import { foodCategoryController } from "../controllers";

export const foodCategoryRouter = Router();

foodCategoryRouter
  .get("", foodCategoryController)
  .post("", foodCategoryController);
