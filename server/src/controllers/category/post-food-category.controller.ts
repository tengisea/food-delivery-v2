import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const postFoodCategoryController = async (req: Request, res: Response) => {
try {
  const { categoryName } = req.body as FoodCategoryBody;

  const existingCategory = await FoodCategoryModel.findOne({ categoryName });

  if (!existingCategory) {
    res.status(400).send({ message: "Category does exist" });
  }

  await FoodCategoryModel.create(
    {
      categoryName,
    },
    { new: true }
  );

  res.status(201).send({ message: "Success", categoryName });
} catch (error) {
  console.error("Error during adding category:", error);

  res.status(500).json({
    message: "Internal server error",
    error: error instanceof Error ? error.message : "Unknown Error.",
  });
}
};
