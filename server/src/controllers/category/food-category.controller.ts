import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const foodCategoryController = async (req: Request, res: Response) => {
  try {
       const { limit = 20, page = 0 } = req.query;
    
        const allCategories = await FoodCategoryModel.find()
          .populate("categoryName")
          .limit(Number(limit))
          .skip(Number(+limit * +page));
    
        const total = await FoodCategoryModel.countDocuments();

        res.status(201).send({ message: "Success", allCategories, total });
    return;
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
