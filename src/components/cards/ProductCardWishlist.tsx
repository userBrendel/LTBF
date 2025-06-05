"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getImageUrl } from "@/src/utils/general/getImageUrl";

// Props definition
type ProductCardHomeProps = {
  image?: string;
  name: string;
  price: number;
  href: string;
  onClick?: () => void;
};

export default function ProductCardHome({
  image,
  name,
  price,
  href,
  onClick,
}: ProductCardHomeProps) {
  const imageUrl = image || getImageUrl(name) || "/fallback-image.png";


  const [liked, setLiked] = useState(false);

  const handleHeartClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.preventDefault(); 
    event.stopPropagation(); 
    setLiked(!liked); 
    onClick?.();
  };

  return (
    <Link
      href={href}
      className="flex flex-col gap-4 justify-center items-center w-full hover:scale-105 transition-transform duration-300"
    >
      <div
        className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <Heart
          onClick={handleHeartClick}
          size={24}
          className={`cursor-pointer transition-colors ${
            liked ? "text-red-500" : "text-black"
          }`}
          aria-label="Add to favorites"
        />
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-gray-700 text-md">AED {price}.00</p>
      </div>
    </Link>
  );
}
