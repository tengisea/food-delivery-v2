import { Schema, model, Model, models } from "mongoose";

type FoodCategorySchemaType = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategorySchemaType>(
  {
    categoryName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const FoodCategoryModel: Model<FoodCategorySchemaType> =
  models["FoodCategory"] || model("FoodCategory", FoodCategorySchema);
