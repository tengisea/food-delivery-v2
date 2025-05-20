import { Request, Response } from "express";
import { FoodOrderModelItem } from "../../models";

type FoodOrderBody = {
  status: string;
};

export const updateFoodOrderController = async (req: Request, res: Response) => {
try{
  const { status } = req.body as FoodOrderBody;

  await FoodOrderModelItem.findByIdAndUpdate(req.params.foodOrderId, {
    status,
  });

  res.status(201).send({ message: "Success", status });

} catch (error) {
    console.error("Error during food-order:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
