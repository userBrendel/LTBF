import { Heart } from "lucide-react";

type ProductCardHomeProps = {
  image: string;
  name: string;
  price: number;
};

export default function ProductCardHome({
  image,
  name,
  price,
}: ProductCardHomeProps) {
  return (
    <section className="flex flex-col gap-4 justify-center items-center w-full max-w-100">
      <div
        className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Heart size={24} className="text-black" />
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold">{name}</p>
        <p className="text-gray-700 text-md">Dhs. {price}.00</p>
      </div>
    </section>
  );
}
