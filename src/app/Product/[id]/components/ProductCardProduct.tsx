import { Heart } from "lucide-react";

type ProductCardProductProps = {
  image: string;
  onClickHeart?: () => void;
};

export default function ProductCardProduct({
  image,
  onClickHeart,
}: ProductCardProductProps) {
  return (
    <section className="flex flex-col gap-4 justify-center items-center w-full max-w-100">
      <div
        className="w-full aspect-square bg-cover bg-center border p-4 flex justify-end"
        style={{
          backgroundImage: `url(${image ? image : "/perfume_default.png"})`,
        }}
      >
        <Heart
          onClick={onClickHeart}
          size={24}
          className="text-black cursor-pointer"
        />
      </div>
    </section>
  );
}
