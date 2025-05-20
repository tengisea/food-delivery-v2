import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const foodCategoryController = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body as FoodCategoryBody;

    const existingCategory = await FoodCategoryModel.findOne({ categoryName });

    if (existingCategory) {
      res.status(400).send({ message: "Category exists" });
      return;
    }

    await FoodCategoryModel.create({
      categoryName,
    });

    res.status(201).send({ message: "Success",categoryName });
    return
  } catch (error) {
    console.error("Error during aadding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
