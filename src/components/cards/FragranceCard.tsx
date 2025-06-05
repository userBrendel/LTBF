"use client";

import { useWishlist } from "@/src/context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/src/utils/general/getImageUrl";

type FragranceCardHomeProps = {
  product: any;
};

export default function FragranceCardHome({ product }: FragranceCardHomeProps) {
  const { wishlist, add, remove } = useWishlist();

  const isInWishlist = wishlist.some(
    (item: any) => item.product_id === product.id
  );

  const imageUrl = product.image || getImageUrl(product.id);

  return (
    <Link
      className="flex flex-col gap-4 justify-center items-center w-full hover:scale-105 transition-hover duration-300"
      href={`/product/${product.id}`}
    >
      <div
        className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end items-start"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <Heart
          size={24}
          className="cursor-pointer"
          fill={isInWishlist ? "black" : "none"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isInWishlist ? remove(product) : add(product);
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">{product.name}</p>
        <p className="text-gray-700 text-md">AED {product.price}</p>
      </div>
    </Link>
  );
}
