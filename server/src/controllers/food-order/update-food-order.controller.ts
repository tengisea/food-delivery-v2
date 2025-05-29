import { Request, Response } from "express";
import { FoodOrderModelItem } from "../../models";

type FoodOrderBody = {
  status: string;
};

export const updateFoodOrderController = async (req: Request, res: Response) => {
  try {
    const { status } = req.body as FoodOrderBody;
    const { foodOrderId } = req.params;

    if (!foodOrderId) {
      res.status(400).json({ message: "Food order ID is required" });
      return; 
    }

    const updatedOrder = await FoodOrderModelItem.findByIdAndUpdate(
      foodOrderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      res.status(404).json({ message: "Food order not found" });
      return;
    }

    res.status(200).json({ message: "Success", order: updatedOrder });
  } catch (error) {
    console.error("Error during food-order update:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};

