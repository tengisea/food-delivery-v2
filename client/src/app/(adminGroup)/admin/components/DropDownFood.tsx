"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type FoodItem = {
  food: {
    foodName: string;
    image: string;
  };
  quantity: number;
};

type FoodItemsProps = {
  foodItems: FoodItem[];
};

export function DropdownMenuRadioGroupDemo({ foodItems }: FoodItemsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {foodItems.map((item) => (
          <div
            key={`food-item-${item.food.foodName}`}
            className="flex flex-col gap-3">
            <DropdownMenuItem key={`name-${item.food.foodName}`}>
              <img src={item.food.image} className="w-8 h-8 rounded-md mr-2" />
              <div> {item.food.foodName}</div>
              <div>x{item.quantity}</div>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
