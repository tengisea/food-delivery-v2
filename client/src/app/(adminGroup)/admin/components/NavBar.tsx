"use client";

import { useState, useEffect } from "react";
import { NomLogo } from "@/components/Button/NomLogo";
import { LayoutDashboard, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className="flex flex-col gap-10 px-5 py-9 w-51 border-r-1 ">
      <div>
        <NomLogo />
      </div>

      <div className="flex flex-col gap-6 ">
        <button
          className={cn(
            "flex gap-2.5 py-2 px-6 items-center border-1-white rounded-4xl h-6",
            currentPath === "/admin/food-menu" &&
              "bg-black text-white flex gap-2.5 py-4 px-6 items-center border-1-white rounded-4xl h-6"
          )}
          onClick={() => (window.location.href = "/admin/food-menu")}
        >
          <LayoutDashboard
            className={cn(
              "text-[#000000]",
              currentPath === "/admin/food-menu" ? "text-[#FFFFFF]" : ""
            )}
            strokeWidth={1}
            size="22"
          />
          Food menu
        </button>

        <button
          className={cn(
            "flex gap-2.5 py-2 px-6 items-center border-1-white rounded-4xl h-6",
            currentPath === "/admin" &&
              "bg-black text-white flex gap-2.5 py-4 px-6 items-center border-1-white rounded-4xl h-6"
          )}
          onClick={() => (window.location.href = "/admin")}
        >
          <Truck
            className={cn(
              "text-[#000000]",
              currentPath === "/admin" ? "text-[#ffffff]" : ""
            )}
            strokeWidth={1}
            size="22"
          />
          Orders
        </button>
      </div>
    </nav>
  );
};
