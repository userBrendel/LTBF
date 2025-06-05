"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { useWishlist } from "@/src/context/WishlistContext";
import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { getImageUrl } from "@/src/utils/general/getImageUrl";

type FragranceCardClientProps = {
  product: any;
};

export default function FragranceCardClient({
  product,
}: FragranceCardClientProps) {
  const {
    wishlist,
    add: addToWishlist,
    remove: removeFromWishlist,
  } = useWishlist();
  const { add: addToBag } = useShoppingBag();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);

  const sizes = [50, 80, 100];
  const isInWishlist = wishlist.some(
    (item: any) => item.product_id === product.id
  );

  function incrementQuantity() {
    setQuantity((q) => q + 1);
  }

  function decrementQuantity() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  const imageUrl = product.image || getImageUrl(product.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
      <section className="flex flex-col gap-4 justify-center items-center w-full max-w-100">
        <div
          className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end"
          style={{
          backgroundImage: `url(${imageUrl})`,
          }}
        >
          <Heart
            onClick={
              isInWishlist
                ? () => removeFromWishlist(product)
                : () => addToWishlist(product)
            }
            size={24}
            className="text-black cursor-pointer"
            fill={isInWishlist ? "black" : "none"}
          />
        </div>
      </section>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <div className="flex flex-wrap text-lg gap-4">
            <h1 className="border rounded-3xl flex items-center justify-center h-10 px-8 whitespace-nowrap">
              {product.gender}
            </h1>
            <h1 className="border rounded-3xl flex items-center justify-center h-10 px-4 whitespace-nowrap">
              {product.concentration}
            </h1>
          </div>

          <p>{product.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span>Size:</span>
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
          </div>

          <div className="flex gap-4 items-center">
            <span>Quantity: {quantity}</span>
            <div className="flex gap-2">
              <button
                onClick={decrementQuantity}
                className={`${
                  quantity === 1 && "pointer-events-none opacity-25"
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
          </div>

          <div className="flex items-center gap-8">
            <FilledButton
              size="xl"
              onClick={() => addToBag(product, quantity, selectedSize)}
            >
              Add To Bag
            </FilledButton>

            <div className="text-xl font-semibold">AED {product.price} </div>
          </div>
        </div>
      </div>
    </div>
  );
}
