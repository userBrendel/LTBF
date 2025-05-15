import { X } from "lucide-react";
import FilledButton from "../Button/FilledButton";

type ProductCardBagProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  onClickRemoveFromBag?: () => void;
};

export default function ProductCardBag({
  image,
  name,
  price,
  quantity,
  size,
  onClickRemoveFromBag,
}: ProductCardBagProps) {
  return (
    <section className="flex gap-8 items-center w-full">
      <div
        className="w-48 h-48 bg-cover bg-center border flex justify-end items-start p-2 shrink-0"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="flex flex-col gap-2 w-full">
        <div className="sm:flex justify-between items-center w-full">
          <p className="text-2xl font-semibold">{name}</p>
          <p className="text-gray-700 text-sm whitespace-nowrap">
            Dhs. {price}.00
          </p>
        </div>

        <div className="text-sm">
          <p>Size: {size}ml</p>
          <p>Quantity: {quantity}</p>
        </div>

        <FilledButton onClick={onClickRemoveFromBag}>
          Remove From Bag
        </FilledButton>
      </div>
    </section>
  );
}
