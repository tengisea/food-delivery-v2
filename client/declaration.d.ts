declare module "https://framer.com/m/*";

type FoodOrderType = {
  index: number;
  email: string;
  order: string;
  food: string;
  _id: string;
  id: string;
  quantity: number;
  foodItems: { foodName: string; image: string }[];
  FoodOrderItems: {
    food: { foodName: string; image: string };
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  status: string;
  user: { order: string; email: string; id: string };
};
