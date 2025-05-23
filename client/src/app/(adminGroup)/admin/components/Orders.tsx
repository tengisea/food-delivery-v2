"use client"
import useSWR from "swr";
import { fetcher } from "@/app/hooks/useFetchData";

export const Orders = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/food-order",
    fetcher
  );

  if (isLoading) return <p>Ачааллаж байна...</p>;
  if (error) return <p>Алдаа: {error.message}</p>;

  return (
    <div>
      <h2>Захиалгын жагсаалт:</h2>
      <ul>
        {data.map((order) => (
          <li key={order._id}>
            {order.username} — {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
