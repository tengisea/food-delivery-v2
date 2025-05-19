import { Router } from "express";
import { foodOrderController, userFoodOrderController, patchFoodOrderController } from "../controllers";


export const foodOrderRouter = Router();

foodOrderRouter.route("/").post(foodOrderController).get(foodOrderController);
foodOrderRouter.get("/6826b1529f625b1668729229", userFoodOrderController);
foodOrderRouter.patch("/6826b6d82400d456fdb1cf84", patchFoodOrderController);