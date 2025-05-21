import { Request, Response } from "express";
import { FoodModel } from "../../models";

type FoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const getFoodController = async (req: Request, res: Response) => {
  try {
    const body = req.body as FoodBody;

    const sortedFoods = await FoodModel.findOne({
      category: req.params.categoryId,
    });

    res.status(201).send({ message: "Success", sortedFoods });
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
