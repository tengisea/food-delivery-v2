import { Request, Response } from "express";
import { FoodOrderModelItem } from "../../models";

type FoodOrderBody = {
  user: string;
  FoodOrderItems: string;
  totalPrice: string;
};

export const foodOrderController = async (req: Request, res: Response) => {
  const { user, FoodOrderItems, totalPrice } = req.body as FoodOrderBody;

  const existingFood = await FoodOrderModelItem.findOne({ FoodOrderItems });

  if (existingFood) {
    res.status(400).send({ message: "Food is already in your cart" });
  }

  await FoodOrderModelItem.create({
    user,
    totalPrice,
    FoodOrderItems,
  });

  res.status(201).send({ message: "Success" });
};
