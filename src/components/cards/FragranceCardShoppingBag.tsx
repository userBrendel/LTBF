import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { Trash } from "lucide-react";
import { getImageUrl } from "@/src/utils/general/getImageUrl";

type FragranceCardShoppingBagProps = {
  bag: any;
};

export default function FragranceShoppingCardBag({
  bag,
}: FragranceCardShoppingBagProps) {
  const { remove } = useShoppingBag();

  const imageUrl = bag.product.image || getImageUrl(bag.product.id);

  return (
    <section className="flex gap-4 items-start w-full">
      <div className="space-y-2">
        <div
          className="w-32 h-32 bg-cover bg-center border flex justify-end items-start p-2 shrink-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="flex gap-4 items-center justify-between">
          <span className="text-sm w-6 text-center">x{bag.quantity}</span>
          <button
            onClick={() => remove(bag)}
            className="border p-1 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="sm:flex justify-between items-center w-full">
          <p className="text-xl font-semibold">{bag.product.name}</p>
          <p className="text-gray-700 text-sm whitespace-nowrap">
            AED {bag.product.price}
          </p>
        </div>

        <p className="text-sm">Size: {bag?.size}ml</p>
      </div>
    </section>
  );
}
