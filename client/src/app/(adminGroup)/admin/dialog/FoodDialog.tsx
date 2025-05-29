"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FoodFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  categoryId: string;
}

export const FoodFormDialog = ({ open, onClose, onSave, initialData, categoryId }: FoodFormDialogProps) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");

  console.log(initialData);
  

  useEffect(() => {
    if (initialData) {
      setFoodName(initialData.foodName || "");
      setPrice(initialData.price || "");
      setIngredients(initialData.ingredients || "");
      setImage(initialData.image || "");
    } else {
      setFoodName("");
      setPrice("");
      setIngredients("");
      setImage("");
    }
  }, [initialData]);

  const handleSave = () => {
    if (!foodName || !price || !ingredients || !image) return;
  
    onSave({
      ...initialData,
      foodName,
      price: Number(price),
      ingredients,
      image,
      category: initialData?.category || categoryId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Food" : "Add Food"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input placeholder="Type food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
          <Input placeholder="Enter a price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input placeholder="List ingredients..." value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>{initialData ? "Update" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

