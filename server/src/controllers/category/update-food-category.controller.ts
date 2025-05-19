import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const updateFoodCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryName } = req.body as FoodCategoryBody;

    await FoodCategoryModel.findByIdAndUpdate(req.params.foodCategoryId, {
      categoryName,
    });

    res.status(201).send({ message: "Success" });
    return;
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
