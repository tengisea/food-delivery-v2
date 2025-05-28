"use client";

import useSWR from "swr";
import { fetcher } from "@/hooks/useFetchData";
import { ChevronsUpDown } from "lucide-react";
import { Badge, Button, Checkbox } from "@/components/ui";
import { DatePickerWithRange } from "./DateRangePicker";
import { DropdownMenuRadioGroupDemo } from "./DropDownFood";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";


export const Orders = () => {

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const token = localStorage.getItem("token") || "";

  const { data, error, isLoading } = useSWR(
    `${process.env.BACKEND}/food-order`,
    fetcher
  );

  console.log(data);
  

  const filteredData = useMemo(() => {
    if (!data?.allOrders) return [];

    let filteredOrders = data.allOrders;

    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter((order: FoodOrderType) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    filteredOrders.sort((a: FoodOrderType, b: FoodOrderType) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filteredOrders;
  }, [data, startDate, endDate, sortDirection]);

  if (isLoading) return <p>Ачааллаж байна...</p>;

  if (error) {
    return <p>Алдаа: {error.message}</p>;
  }

  const toggleSelect = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
  const handleChangeDeliveryState = async () => {
    try {
      await Promise.all(
        selectedOrderIds.map(async (id) => {
          await fetch(`${process.env.BACKEND}/food-order/${id}/change-status`, {
            method: "PATCH", // эсвэл POST
            headers: {
              "Authorization": token,
            },
            body: JSON.stringify({ status: "Delivered" }), // эсвэл шинэ төлөв
          });
        })
      );

      // Optionally: refresh data
      // mutate(`${process.env.BACKEND}/food-order`);
      setSelectedOrderIds([]); // Reset after update
      alert("Delivery status updated!");
    } catch (error) {
      console.error(error);
      alert("Алдаа гарлаа.");
    }
  };
  

  return (
    <div className="">
      <header className="flex flex-row items-center justify-between p-4 border-t-1 border-x-1 rounded-lg border-gray-400 bg-white">
        <h6 className="font-bold text-2xl">Orders</h6>
        <div className="flex flex-row items-center gap-3">
          <DatePickerWithRange
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <Button className="" onClick={handleChangeDeliveryState}>
            Change delivery state
            <Badge variant="secondary"> 2</Badge>
          </Button>
        </div>
      </header>
      <table className="table-auto border-collapse border border-gray-400 flex flex-col">
        <thead className="border-b-1 border-gray-400">
          <tr className="bg-[#F6F6F7] flex flex-row items-center justify-start">
            <th className=" p-4 gap-2.5 text-[#71717A]">
              <Checkbox />
            </th>
            <th className=" p-4 gap-2.5 flex items-center text-[#71717A]">№</th>
            <th className="px-1 text-[#71717A] w-48.5 flex justify-start">
              Customer
            </th>
            <th className=" px-4 text-[#71717A] w-34 flex justify-start ">
              Food
            </th>
            <th className=" px-4 text-[#71717A] w-32 flex gap-4 items-center">
              Date{" "}
              <Button
                variant="ghost"
                size="icon"
                className="p-0"
                onClick={() =>
                  setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                }>
                <ChevronsUpDown size={16} />
              </Button>
            </th>
            <th className=" px-4 text-[#71717A] w-32 flex justify-start">
              Total
            </th>
            <th className=" px-4 text-[#71717A] w-45.5 flex justify-start">
              Delivery Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData.map((order: FoodOrderType, index: number) => (
            <tr
              key={index}
              className={cn(
                "flex flex-row items-center self-stretch border-b-1 border-[#E4E4E7]",
                selectedOrderIds.includes(order._id) && "bg-gray-100"
              )}>
              <td className=" p-4 text-[#71717A]">
                <Checkbox
                  checked={selectedOrderIds.includes(order._id)}
                  onCheckedChange={() => toggleSelect(order._id)}
                />
              </td>
              <td className="w-10 p-4 text-[#71717A]">{index + 1}</td>
              <td className=" px-4  text-[#71717A] w-50.5">
                {order.user.email}
              </td>
              <td className=" p-4 w-34 text-[#71717A] flex justify-between items-center">
                {order.FoodOrderItems[0].quantity} foods
                <DropdownMenuRadioGroupDemo
                  foodItems={order.FoodOrderItems.map((item) => ({
                    quantity: item.quantity,
                    food: {
                      foodName: item.food.foodName,
                      image: item.food.image,
                    },
                  }))}
                />
              </td>
              <td className=" px-4 w-32 text-[#71717A]">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US")
                  : "N/A"}
              </td>
              <td className=" px-4 w-32 text-[#71717A]">{order.totalPrice}</td>
              <td className=" px-4 py-2 w-45.5 font-semibold">
                <button className="flex items-center px-2.5 gap-2.5 rounded-2xl border-[#ef4444] border-2">
                  {order.status} <ChevronsUpDown size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
