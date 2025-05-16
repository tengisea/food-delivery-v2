import { Router } from "express";
import { foodController } from "../controllers";

export const foodRouter= Router()

foodRouter.route("/").get(foodController);
