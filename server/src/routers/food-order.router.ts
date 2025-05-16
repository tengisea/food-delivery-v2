import { Router } from "express";
import { foodOrderController } from "../controllers";

export const foodOrderRouter = Router();

foodOrderRouter.route("/").post(foodOrderController).get(foodOrderController);
