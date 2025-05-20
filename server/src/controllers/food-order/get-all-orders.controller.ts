import { Request, Response } from "express";
import { FoodOrderModelItem } from "../../models";

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const { limit = 20, page = 0 } = req.query;

    const allOrders = await FoodOrderModelItem.find()
      .populate("user")
      .populate({ path: "FoodOrderItems.food", model: "Food" })
      .limit(Number(limit))
      .skip(Number(+limit * +page));

    const total = await FoodOrderModelItem.countDocuments();

    res.status(200).send({ allOrders, total });
  } catch (error) {
    console.error("Error during food-order:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
