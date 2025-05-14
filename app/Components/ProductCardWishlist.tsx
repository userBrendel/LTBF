import { Heart } from "lucide-react";
import FilledButton from "./FilledButton";

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
};

export default function ProductCardWishlist({
  image,
  name,
  price,
}: ProductCardProps) {
  return (
    <section className="flex gap-4 items-center w-full max-w-md">
      <div
        className="w-40 h-40 bg-cover bg-center border flex justify-end items-start p-1"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Heart size={24} className="text-black" />
      </div>
      <div className="flex gap-2 flex-col">
        <div className="flex gap-4 items-center">
          <p className="text-2xl font-semibold">{name}</p>
          <p className="text-gray-700 text-sm">Dhs. {price}.00</p>
        </div>

        <div className="flex gap-4  items-center">
          <p>50 ml</p>
          <p>80 ml</p>
          <p>100ml</p>
        </div>

        <FilledButton onClick={() => {}}>Add to Cart</FilledButton>
      </div>
    </section>
  );
}
