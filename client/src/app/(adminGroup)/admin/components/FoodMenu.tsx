"use client";

import { useState, useRef } from "react";
import useSWR from "swr";
import { createCategory, createFood, updateFood } from "@/api/Api";
import { fetcher } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2 } from "lucide-react";
import { FoodFormDialog, AddCategoryDialog } from "../dialog";

export const FoodMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editFoodData, setEditFoodData] = useState<any>(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
    mutate: mutateCategories,
  } = useSWR(`${process.env.BACKEND}/food-category`, fetcher);

  const {
    data: foodData,
    isLoading: isFoodLoading,
    error: foodError,
    mutate: mutateFoods,
  } = useSWR(`${process.env.BACKEND}/food`, fetcher);

  const foodCategories = categoryData?.allCategories || [];
  const allFoods = foodData?.allFoods || []

  const filteredFoods = selectedCategory === "all" ? allFoods : allFoods.filter((food: any) => food.category?._id === selectedCategory);

  const handleAddFoodClick = (categoryId: string) => {
    setEditFoodData({ category: categoryId });
    setOpenFormDialog(true);
  };

  const handleEditFoodClick = (food: any) => {
    setEditFoodData(food);
    setOpenFormDialog(true);
  };

  const handleAddCategory = async (name: string) => {
    await createCategory(name);
    mutateCategories();
  };

  const handleFormSubmit = async (data: any) => {
    console.log(data);
    
    if (data._id) {
      await updateFood(data._id, data);
    } else {
      await createFood(data);
    }
    mutateFoods();
    setOpenFormDialog(false);
  };

  if (isCategoryLoading || isFoodLoading) return <p>Ачааллаж байна...</p>;
  if (categoryError || foodError) return <p>Алдаа: {categoryError?.message || foodError?.message}</p>;

  return (
    <>
      <div className="p-3 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl">Ангиллууд</h2>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All Dishes <Badge>{allFoods.length}</Badge>
          </Button>
          {foodCategories.map((cat: any) => (
            <Button
              key={cat._id}
              variant={selectedCategory === cat._id ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(cat._id);
                categoryRefs.current[cat._id]?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {cat.categoryName} <Badge>{allFoods.filter((food: { category?: { _id: string } }) => food.category?._id === cat._id).length}</Badge>
            </Button>
          ))}
          <button onClick={() => setOpenCategoryDialog(true)}>
          <Plus size={20} color="#ffffff" className="p-4 bg-red-500 rounded-2xl text-white"/>
          </button>
        </div>
      </div>

      {foodCategories.map((category: any) => (
        <div
        key={category._id}
        ref={(el) => {
          if (el && selectedCategory) {
            categoryRefs.current[selectedCategory] = el;
          }
        }}
        className="p-3 bg-white rounded-lg shadow-md mt-4"
      >
      
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">{category.categoryName}</h3>
            <Button size="sm" onClick={() => handleAddFoodClick(category._id)}>
              <Plus className="w-4 h-4 mr-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allFoods
              .filter((food: any) => food.category?._id === category._id)
              .map((food: any) => (
                <div key={food._id} className="border p-4 rounded-lg hover:shadow-md">
                    <div className="relative">
                    <img
                      src={food.image}
                      alt={food.foodName}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 z-20 bg-white text-red-500 rounded"
                      onClick={() => handleEditFoodClick(food)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-red-500 font-semibold text-sm">{food.foodName}</h4>
                    <span className="text-green-600 font-bold">{food.price.toLocaleString()} ₮</span>
                  </div>
                  <p className="text-xs text-gray-600 my-1">{food.ingredients}</p>
                </div>
              ))}
          </div>
        </div>
      ))}

<FoodFormDialog
  open={openFormDialog}
  onClose={() => setOpenFormDialog(false)}
  onSave={handleFormSubmit}
  initialData={editFoodData}
  categoryId={editFoodData?.category || ""}
/>

<AddCategoryDialog
  open={openCategoryDialog}
  onClose={() => setOpenCategoryDialog(false)}
  onSave={handleAddCategory}
/>

    </>
  );
};
