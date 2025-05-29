"use client";

import useSWR from "swr";
import { fetcher } from "@/hooks/useFetchData";
import { ChevronsUpDown } from "lucide-react";
import { Badge, Button, Checkbox } from "@/components/ui";
import { DatePickerWithRange } from "./DateRangePicker";
import { DropdownMenuRadioGroupDemo } from "./DropDownFood";
import { ChangeDeliveryModal } from "../dialog/ChangeStatus";
import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Orders = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BACKEND}/food-order`,
    fetcher
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("token") || "";
    }
  }, []);

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

  const toggleSelect = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = filteredData.length > 0 && selectedOrderIds.length === filteredData.length;

  const handleStatusChange = async (newStatus: string) => {
    const token = localStorage.getItem("token") || "";
    try {
      await Promise.all(
        selectedOrderIds.map((id) =>
          fetch(`${process.env.BACKEND}/food-order/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
          })
        )
      );

      setIsModalOpen(false);
      setSelectedOrderIds([]);
      mutate(); 
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>Алдаа: {error.message}</p>;

  return (
    <div className="">
      <header className="flex flex-row items-center justify-between p-4 border-t-1 border-x-1 rounded-lg border-gray-400 bg-white">
        <h6 className="font-bold text-2xl">Orders</h6>
        <div className="flex flex-row items-center gap-3">
          <DatePickerWithRange setStartDate={setStartDate} setEndDate={setEndDate} />
          <Button onClick={() => setIsModalOpen(true)} disabled={selectedOrderIds.length === 0}>
            Change delivery state
            <Badge variant="secondary">{selectedOrderIds.length}</Badge>
          </Button>
        </div>
      </header>

      <table className="table-auto border-collapse border border-gray-400 flex flex-col">
        <thead className="border-b-1 border-gray-400">
          <tr className="bg-[#F6F6F7] flex flex-row items-center justify-start">
          <th className="p-4 text-[#71717A]">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedOrderIds(filteredData.map((order: FoodOrderType) => order._id));
              } else {
                setSelectedOrderIds([]);
              }
            }}
          />
        </th>
            <th className="p-4 text-[#71717A]">№</th>
            <th className="px-1 text-[#71717A] w-48.5">Customer</th>
            <th className="px-4 text-[#71717A] w-34">Food</th>
            <th className="px-4 text-[#71717A] w-32 flex items-center gap-1">
              Date
              <Button
                variant="ghost"
                size="icon"
                className="p-0"
                onClick={() =>
                  setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                <ChevronsUpDown size={16} />
              </Button>
            </th>
            <th className="px-4 text-[#71717A] w-32">Total</th>
            <th className="px-4 text-[#71717A] w-45.5">Delivery Status</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData.map((order: FoodOrderType, index: number) => (
            <tr
              key={order._id}
              className={cn(
                "flex flex-row items-center self-stretch border-b border-[#E4E4E7]",
                selectedOrderIds.includes(order._id) && "bg-gray-100"
              )}
            >
              <td className="p-4 text-[#71717A]">
                <Checkbox
                  checked={selectedOrderIds.includes(order._id)}
                  onCheckedChange={() => toggleSelect(order._id)}
                />
              </td>
              <td className="w-10 p-4 text-[#71717A]">{index + 1}</td>
              <td className="px-4 w-50.5 text-[#71717A]">{order.user.email}</td>
              <td className="p-4 w-34 text-[#71717A] flex justify-between items-center">
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
              <td className="px-4 w-32 text-[#71717A]">
                {new Date(order.createdAt).toLocaleDateString("en-US")}
              </td>
              <td className="px-4 w-32 text-[#71717A]">{order.totalPrice}</td>
              <td className="px-4 py-2 w-45.5 font-semibold">
                <button
                  className={cn(
                    "px-3 py-1 rounded-xl border text-sm font-medium",
                    order.status === "Delivered"
                      ? "border-green-500 text-green-600"
                      : "border-[#ef4444] text-[#ef4444]"
                  )}
                  onClick={() => setIsModalOpen(true)}
                >
                  {order.status}
                  <ChevronsUpDown size={16} className="inline ml-1"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChangeDeliveryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleStatusChange}
      />
    </div>
  );
};
