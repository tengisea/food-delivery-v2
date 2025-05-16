import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

type FoodCategoryBody = { categoryName: string };

export const foodCategoryController = async (req: Request, res: Response) => {
  const { categoryName } = req.body as FoodCategoryBody;

    const existingCategory = await FoodCategoryModel.findOne({ categoryName });
  
    if (existingCategory) {
      res.status(400).send({ message: "Category exists" });
    }

  await FoodCategoryModel.create(
    {
      categoryName,
    },
    { new: true }
  );

  res.status(201).send({ message: "Success" });
};
