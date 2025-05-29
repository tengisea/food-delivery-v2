"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/hooks";
import { Badge, Button } from "@/components/ui";
import { Plus, Edit2 } from "lucide-react";

export const FoodMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: categoryData,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useSWR(`${process.env.BACKEND}/food-category`, fetcher);

  const {
    data: foodData,
    error: foodError,
    isLoading: isFoodLoading,
  } = useSWR(`${process.env.BACKEND}/food`, fetcher);

  const foodCategoriesDetail = categoryData?.allCategories || [];
  const foodDetail = foodData?.allFoods || [];

  if (isCategoryLoading || isFoodLoading) return <p>Ачааллаж байна...</p>;

  if (categoryError || foodError) {
    return (
      <p>
        Алдаа: {categoryError?.message || ""} {foodError?.message || ""}
      </p>
    );
  }

  const filteredFoods = selectedCategory === "all" ? foodDetail : foodDetail.filter((food: any) => food.category?._id === selectedCategory);

  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="font-semibold text-xl">Dishes Category</div>
        <div className="flex flex-wrap gap-2 my-4">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}>
            All dishes <Badge>{foodDetail.length}</Badge>
          </Button>

          {foodCategoriesDetail.map((category: any) => (
            <Button
              key={category._id}
              variant={
                selectedCategory === category._id ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category._id)}>
              {category.categoryName}
              <Badge>
                {
                  foodDetail.filter(
                    (food: any) => food.category?._id === category._id
                  ).length
                }
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-white rounded-lg shadow-md mt-4">
        <div className="font-semibold text-xl">Хоолны жагсаалт</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {filteredFoods.map((food: any) => (
            <div
              key={food._id}
              className=" p-4 border rounded-lg hover:shadow-lg transition-shadow ">
              <div className="flex flex-col gap-5">
                <img
                  src={food.image}
                  alt="Food Menu"
                  className="w-70 h-40 bg-cover object-cover rounded-lg mt-4"
                />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[14px] font-semibold text-red-500">
                      {food.foodName}
                    </h3>
                    <p className="text-green-600 font-bold">
                      {food.price.toLocaleString()} ₮
                    </p>
                  </div>
                  <p>{food.ingredients}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredFoods.length === 0 && (
          <p className="text-gray-500">Тухайн ангилалд хоол алга байна.</p>
        )}
      </div>

      <div className="p-3 bg-white rounded-lg shadow-md mt-4">
        <div className="font-semibold text-xl">Actions</div>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => alert("Add Food")}>Add Food</Button>
          <Button variant="secondary" onClick={() => alert("Add Category")}>
            Add Category
          </Button>
          <Button onClick={() => alert("Delete Food")}>Delete Food</Button>
          <Button onClick={() => alert("Update Food")}>Update Food</Button>
        </div>
      </div>
    </>
  );
};
