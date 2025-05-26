"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import { fetcher } from "@/hooks/useFetchData";

export const Orders = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/food-order",
    fetcher
  );

  if (isLoading) return <p>Ачааллаж байна...</p>;

  if (error) {
    if (error.message.includes("Token байхгүй")) {
      router.push("/login");
    }
    return <p>Алдаа: {error.message}</p>;
  }

  return (
    <div>
      <h2>Захиалгын жагсаалт:</h2>
      <ul>
        {data?.map((item: any) => (
          <li key={item._id}>
            {item.username} — {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
