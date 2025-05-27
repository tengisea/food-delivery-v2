declare module "https://framer.com/m/*";

type FoodOrderType = {
  index: number;
  email: string;
  order: string;
  id: string;
  quantity: number;
  FoodOrderItems: {name: string, quantity: number}[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  status: string;
  user:{order: string, email: string, id: string};
};
