import React from "react";
import Image from "next/legacy/image";

export const NomLogo = () => {
  return (
    <div className="flex">
      <Image src="/food-logo.svg" width={40} height={40} />
      <div>
        <div className="font-semibold text-lg color-black">NomNom</div>
        <div className="text-[#71717A] text-xs">Swift delivery</div>
      </div>
    </div>
  );
};
