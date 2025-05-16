import { Request, Response } from "express";
import { FoodModel } from "../../models";

type FoodBody = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const foodController = async (req: Request, res: Response) => {
  const body = req.body as FoodBody;

  await FoodModel.create(body);

  res.status(201).send({ message: "Success" });
};
