import { Schema, model, Model, models } from "mongoose";

enum FoodOrderStatusEnum {
  PENDING = "Pending",
  CANCELED = "Canceled",
  DELIVERED = "Delivered",
}

type FoodOrderItemSchemaType = {
  food: Schema.Types.ObjectId;
  quantity: number;
};

type FoodOrderSchemaType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  FoodOrderItems: FoodOrderItemSchemaType[];
  status: FoodOrderStatusEnum;
};

const FoodOrderItemSchema = new Schema<FoodOrderItemSchemaType>(
  {
    food: { type: Schema.Types.ObjectId, required: true, ref: "Food" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrderSchemaType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    totalPrice: { type: Number, required: true },

    FoodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrderModelItem: Model<FoodOrderSchemaType> =
  models["FoodOrder"] || model("FoodOrder", FoodOrderSchema);
