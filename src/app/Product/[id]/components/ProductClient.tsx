"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import ProductCardProduct from "./ProductCardProduct";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type ProductClientProps = {
  product: any;
  onClickHeart?: () => void;
  onClickAddToBag?: () => void;
};

export default function ProductClient({
  product,
  onClickHeart,
  onClickAddToBag,
}: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("Select value");

  function incrementQuantity() {
    setQuantity((q) => q + 1);
  }

  function decrementQuantity() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  const sizes = ["50 ml", "80 ml", "100 ml"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
      <ProductCardProduct
        image={product.image ? product.image : "/perfume_default.png"}
        onClickHeart={onClickHeart}
      />

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
                onChange={(e) => setSelectedSize(e.target.value)}
                value={selectedSize}
                className="w-full border text-sm p-2 pr-10 focus:outline-none focus:ring-0 appearance-none"
              >
                <option disabled value="Select size">
                  Select size
                </option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
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
            <FilledButton size="text-2xl" onClick={onClickAddToBag}>
              Add To Bag
            </FilledButton>
            <div className="text-xl font-semibold">AED {product.price}.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
