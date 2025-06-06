"use client";

import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { Trash } from "lucide-react";

type FragranceCardShoppingBagProps = {
  shoppingBag: any;
};

export default function FragranceShoppingCardBag({
  shoppingBag,
}: FragranceCardShoppingBagProps) {
  const { remove } = useShoppingBag();

  return (
    <section className="flex gap-4 items-start w-full">
      <div
        className="w-32 h-32 bg-cover bg-center border flex justify-end items-start p-2 shrink-0"
        style={{
          backgroundImage: `url(${
            shoppingBag.product.image || `/perfume_default.png`
          })`,
        }}
      />

      <div className="flex flex-col gap-2 w-full">
        <div className="sm:flex justify-between items-center w-full">
          <p className="text-xl font-semibold">{shoppingBag.product.name}</p>
          <p className="text-gray-700 text-sm whitespace-nowrap">
            AED {shoppingBag.product.price}
          </p>
        </div>

        <p className="text-sm">Size: {shoppingBag.size}ml</p>
        <p className="text-sm">Quantity: {shoppingBag.quantity}</p>

        <div>
          <button
            onClick={() => remove(shoppingBag)}
            className="border p-1 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
