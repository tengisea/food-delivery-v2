import { Request, Response } from "express";
import { FoodModel } from "../../models";

type FoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const updateFoodController = async (req: Request, res: Response) => {
  try {
    const body = req.body as FoodBody;

    await FoodModel.findByIdAndUpdate(req.params.foodId,{body});

    res.status(201).send({ message: "Success",body });
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
