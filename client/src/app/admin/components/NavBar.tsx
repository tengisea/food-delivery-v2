import { NomLogo } from "@/components/Button/NomLogo";
import { LayoutDashboard, Settings, Truck } from "lucide-react";

export const NavBar = () => {
  return (
    <nav className="flex flex-col gap-10 px-5 py-9 w-51">
      <div>
        <NomLogo />
      </div>

      <div className="flex flex-col gap-6 ">
        <button className="flex gap-2.5 py-2 px-6 items-center border-1-white rounded-4xl h-6">
          <LayoutDashboard color="#000000" strokeWidth={1} size="22" />
          Food menu
        </button>
        <button className="flex gap-2.5 py-2 px-6 bg-black text-white items-center border-1-black rounded-4xl">
          <Truck color="#fff" strokeWidth={1} size="22" />
          Orders
        </button>
        <button className="flex gap-2.5 py-2 px-6 items-center border-1-white rounded-4xl">
          <Settings color="#000000" strokeWidth={1} size="22" />
          Settings
        </button>
      </div>
    </nav>
  );
};
