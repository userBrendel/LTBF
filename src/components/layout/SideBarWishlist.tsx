import { Heart, X } from "lucide-react";
import FragranceCardWishlist from "../cards/FragranceCardWishlist";
import { useWishlist } from "@/src/context/WishlistContext";
import FilledButton from "../ui/FilledButton";
import { useRouter } from "next/navigation";

type SideBarWishlistProps = {
  isWishlistOpen: boolean;
  closePanels: () => void;
};

export default function SideBarWishlist({
  isWishlistOpen,
  closePanels,
}: SideBarWishlistProps) {
  const { wishlist } = useWishlist();
  const router = useRouter();

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 w-full md:w-128 bg-white backdrop-blur-md transform overflow-y-auto ${
        isWishlistOpen ? "translate-x-0" : "translate-x-full"
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
          <h2>{wishlist.length} items</h2>
        </div>

        <div className="space-y-8">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <FragranceCardWishlist key={index} wishlist={item} />
            ))
          ) : (
            <div className="space-y-16">
              <div className="space-y-4 grid place-items-center">
                <Heart
                  size={172}
                  fill="white"
                  color="white"
                  className="bg-black p-8 rounded-full"
                />

                <p className="text-center">Your wishlist is empty</p>
              </div>

              <div className="space-y-4 grid place-items-center">
                <p className="text-center">
                  Tap the hearts of the fragrances you love, and we'll save them
                  for you!
                </p>

                <FilledButton
                  size={"lg"}
                  onClick={() => {
                    closePanels();
                    router.push("/catalogue");
                  }}
                >
                  Shop Now
                </FilledButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
