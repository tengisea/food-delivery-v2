"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetcher } from "@/hooks/useFetchData";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui";

export const Orders = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `${process.env.BACKEND}/food-order`,
    fetcher
  );

  console.log(data);

  if (isLoading) return <p>Ачааллаж байна...</p>;

  if (error) {
    return <p>Алдаа: {error.message}</p>;
  }

  return (
    <div>
      <h2>Захиалгын жагсаалт:</h2>
      <table className="table-auto w-290 border-collapse border border-gray-400">
        <thead>
          <tr className="bg-[#F6F6F7]">
            <th className="border-b-1 border-gray-400 p-4 gap-2.5 flex items-center text-[#71717A]">
              №
            </th>
            <th className="border-b-1 border-gray-400 px-4 text-[#71717A]">
              Customer
            </th>
            <th className="border-b-1 border-gray-400 px-4 text-[#71717A]">
              Food
            </th>
            <th className="border-b-1 border-gray-400 px-4 text-[#71717A]">
              Date
            </th>
            <th className="border-b-1 border-gray-400 px-4 text-[#71717A]">
              Total
            </th>
            <th className="border-b-1 border-gray-400 px-4 text-[#71717A]">
              Delivery Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.allOrders?.map((order: FoodOrderType, index: number) => (
            <tr key={index}>
              <td className="border-b-1 border-[#E4E4E7] px-4 py-4 text-[#71717A]">
                {index + 1}
              </td>
              <td className="border-b-1 border-[#E4E4E7] px-4  text-[#71717A]">
                {order.user.email}
              </td>
              <td className="border-b-1 border-[#E4E4E7] px-4  text-[#71717A]">
                {order.FoodOrderItems[0].quantity}
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={() => router.push(`/admin/food/${order.id}`)}
                ><ChevronDown/></Button>
              </td>
              <td className="border-b-1 border-[#E4E4E7] px-4  text-[#71717A]">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US")
                  : "N/A"}
              </td>
              <td className="border-b-1 border-[#E4E4E7] px-4  text-[#71717A]">
                {order.totalPrice}
              </td>
              <td className="border-b-1 border-[#E4E4E7] px-4 py-2 font-semibold">
                <button className="flex items-center px-2.5 gap-2.5 rounded-2xl border-[#ef4444] border-2">
                  {order.status} <ChevronsUpDown size={16}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
