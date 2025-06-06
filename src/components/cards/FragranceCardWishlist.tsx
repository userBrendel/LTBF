"use client";

import { Minus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import FilledButton from "../ui/FilledButton";
import { useWishlist } from "@/src/context/WishlistContext";
import { useShoppingBag } from "@/src/context/ShoppingBagContext";

type FragranceCardWishlistProps = {
  wishlist: any;
};

export default function FragranceCardWishlist({
  wishlist,
}: FragranceCardWishlistProps) {
  const { remove } = useWishlist();
  const { add } = useShoppingBag();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);

  const sizes = [50, 80, 100];

  function incrementQuantity() {
    setQuantity((q) => q + 1);
  }

  function decrementQuantity() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  return (
    <section className="flex gap-4 items-start w-full">
      <div className="flex flex-col items-center space-y-2">
        <div
          className="w-32 h-32 bg-cover bg-center border flex justify-end items-start p-2 shrink-0"
          style={{
            backgroundImage: `url(${
              wishlist.product.image || `/perfume_default.png`
            })`,
          }}
        />

        <div className="flex gap-4 items-center">
          <span className="text-sm w-6 text-center">x{quantity}</span>
          <div className="flex gap-2 items-center">
            <button
              onClick={decrementQuantity}
              className={`${
                quantity === 1 ? "pointer-events-none opacity-25" : ""
              } border p-1 hover:shadow-lg hover:scale-105 transition-hover duration-300`}
            >
              <Minus size={16} />
            </button>
            <button
              onClick={incrementQuantity}
              className="border p-1 hover:shadow-lg hover:scale-105 transition-hover duration-300"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => remove(wishlist.product)}
            className="border p-1 hover:shadow-lg hover:scale-105 transition-hover duration-300"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="md:flex justify-between items-center w-full">
          <p className="text-xl font-semibold">{wishlist.product.name}</p>
          <p className="text-gray-700 text-sm whitespace-nowrap">
            AED {wishlist.product.price}
          </p>
        </div>

        <div className="relative w-full">
          <select
            onChange={(e) => setSelectedSize(Number(e.target.value))}
            value={selectedSize}
            className="w-full border text-sm p-2 pr-10 focus:outline-none focus:ring-0 appearance-none"
          >
            <option value={0}>Select size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}ml
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-xs">
            ▼
          </div>
        </div>

        <FilledButton
          onClick={() => add(wishlist.product, quantity, selectedSize)}
          size="sm"
        >
          Add To Bag
        </FilledButton>
      </div>
    </section>
  );
}
