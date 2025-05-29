import { Request, Response } from "express";
import { FoodModel } from "../../models";

export const categoryFoodController = async (req: Request, res: Response) => {
  try {
     const { limit = 20, page = 0 } = req.query;
 
     const allFoodCategory = await FoodModel.find()
       .populate("category")
       .limit(Number(limit))
       .skip(Number(+limit * +page));
 
     const total = await FoodModel.countDocuments();
 
     res.status(200).send({ allFoodCategory, total });
  } catch (error) {
    console.error("Error during adding category:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown Error.",
    });
  }
};
