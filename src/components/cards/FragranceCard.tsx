"use client";

import { useEffect, useRef, useState } from "react";
import { useWishlist } from "@/src/context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";

type FragranceCardHomeProps = {
  product: any;
};

export default function FragranceCardHome({ product }: FragranceCardHomeProps) {
  const { wishlist, add, remove } = useWishlist();
  const [isDarkImage, setIsDarkImage] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const imageUrl = product.image || `/perfume_default.png`;
  const isInWishlist = wishlist.some(
    (item: any) => item.product_id === product.id
  );

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let r = 0,
        g = 0,
        b = 0;
      const pixelCount = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      const avgBrightness = (r + g + b) / (3 * pixelCount);
      setIsDarkImage(avgBrightness < 128);
    };
  }, [imageUrl]);

  return (
    <Link
      className="flex flex-col gap-4 justify-center items-center w-full hover:scale-105 transition-transform duration-300"
      href={`/product/${product.id}`}
    >
      <div
        className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end items-start relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <img
          ref={imgRef}
          src={imageUrl}
          alt=""
          className="hidden"
          crossOrigin="anonymous"
        />

        <Heart
          size={24}
          className="cursor-pointer"
          fill={isInWishlist ? (isDarkImage ? "white" : "black") : "none"}
          color={isDarkImage ? "white" : "black"}
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
