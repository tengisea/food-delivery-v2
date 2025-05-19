import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const deleteFoodCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryName } = req.body as FoodCategoryBody;

    const existingCategory = await FoodCategoryModel.findOne({ categoryName });

    if (!existingCategory) {
      res.status(400).send({ message: "Category doesn't exist" });
    }

    await FoodCategoryModel.findByIdAndDelete(req.params.foodCategoryId, {
      categoryName,
    });

    res.status(201).send({ message: "Success" });
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
