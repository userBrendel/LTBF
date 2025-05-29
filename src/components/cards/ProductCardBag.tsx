import { Trash } from "lucide-react";

type ProductCardBagProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: number;
  onClickTrash?: () => void;
};

export default function ProductCardBag({
  image,
  name,
  price,
  quantity,
  size,
  onClickTrash,
}: ProductCardBagProps) {
  return (
    <section className="flex gap-4 items-start w-full">
      <div className="space-y-2">
        <div
          className="w-32 h-32 bg-cover bg-center border flex justify-end items-start p-2 shrink-0"
          style={{
            backgroundImage: `url(${image ? image : "/perfume_default.png"})`,
          }}
        />
        <div className="flex gap-4 items-center justify-between">
          <span className="text-sm w-6 text-center">x{quantity}</span>
          <button
            onClick={onClickTrash}
            className="border p-1 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="sm:flex justify-between items-center w-full">
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-gray-700 text-sm whitespace-nowrap">
            AED {price}.00
          </p>
        </div>

        <p className="text-sm">Size: {size}ml</p>
      </div>
    </section>
  );
}
