import { Request, Response } from "express";
import { FoodOrderModelItem } from "../../models";

type FoodOrderBody = {
  user: string;
  FoodOrderItems: string;
  totalPrice: string;
};

export const adminFoodOrderController = async (req: Request, res: Response) => {
  try {
    const { user, FoodOrderItems, totalPrice } = req.body as FoodOrderBody;

    await FoodOrderModelItem.findOne({ user: req.params.userId });

    res
      .status(201)
      .send({ message: "Success", user, totalPrice, FoodOrderItems });
  } catch (error) {
    console.error("Error during food-order:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
