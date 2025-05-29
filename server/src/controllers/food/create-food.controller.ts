import { Request, Response } from "express";
import { FoodCategoryModel, FoodModel } from "../../models";

type FoodDetailBody = { ingredients: string;
    image: string;
    price: number;
    foodName: string;
 };

export const createFoodController = async (req: Request, res: Response) => {
try {
  const { foodName,price, image, ingredients } = req.body as FoodDetailBody;

  const existingCategory = await FoodModel.findOne({     foodName,price, image, ingredients });

  if (!existingCategory) {
    res.status(400).send({ message: "Food does exist" });
  }

  await FoodModel.create(
    {
      foodName,price, image, ingredients
    },
    { new: true }
  );

  res.status(201).send({ message: "Success",     foodName,price, image, ingredients });
} catch (error) {
  console.error("Error during adding food:", error);

  res.status(500).json({
    message: "Internal server error",
    error: error instanceof Error ? error.message : "Unknown Error.",
  });
}
};
