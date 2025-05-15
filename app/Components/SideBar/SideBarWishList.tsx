import { X } from "lucide-react";
import ProductCardWishlist from "../ProductCard/ProductCardWishlist";

type SideBarWishlistProps = {
  isWishListOpen: boolean;
  closePanels: () => void;
};

export default function SideBarWishlist({
  isWishListOpen,
  closePanels,
}: SideBarWishlistProps) {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 w-full md:w-164 bg-white backdrop-blur-md transform overflow-y-auto ${
        isWishListOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-600 z-100 overflow-hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={closePanels} className="text-black">
          <X size={28} />
        </button>
      </div>

      <div className="pb-8 px-6 space-y-8 text-lg">
        <div className="border-b flex justify-between items-center">
          <h1 className="text-3xl">Your Wishlist</h1>
          <h2>3 items</h2>
        </div>

        <div className="space-y-8">
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
          <ProductCardWishlist
            image="/perfume_default.png"
            name="Product name"
            price={255}
          />
        </div>
      </div>
    </div>
  );
}
