import { X } from "lucide-react";
import FilledButton from "../Button/FilledButton";
import ProductCardBag from "../ProductCard/ProductCardCart";

type SideBarBagProps = {
  isCartOpen: boolean;
  closePanels: () => void;
};

export default function SideBarBag({
  isCartOpen,
  closePanels,
}: SideBarBagProps) {
  return (
    <div
      className={`fixed top-0 bottom-0 right-0 w-full lg:w-244 bg-white backdrop-blur-md transform overflow-y-auto ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-600 z-100 overflow-hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={closePanels} className="text-black">
          <X size={28} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-32 px-6 text-lg pb-8">
        <div className="order-2 lg: order-1  space-y-8">
          <div className="border-b flex justify-between items-center">
            <h1 className="text-3xl">Shopping Bag</h1>
            <h2>3 items</h2>
          </div>

          <div className="space-y-8">
            <ProductCardBag
              image={"/perfume_default.png"}
              name={"product name"}
              price={255}
              quantity={3}
              size={50}
            />
            <ProductCardBag
              image={"/perfume_default.png"}
              name={"product name"}
              price={255}
              quantity={3}
              size={50}
            />
            <ProductCardBag
              image={"/perfume_default.png"}
              name={"product name"}
              price={255}
              quantity={3}
              size={50}
            />
            <ProductCardBag
              image={"/perfume_default.png"}
              name={"product name"}
              price={255}
              quantity={3}
              size={50}
            />
            <ProductCardBag
              image={"/perfume_default.png"}
              name={"product name"}
              price={255}
              quantity={3}
              size={50}
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div className="border-b">
            <h1 className="text-3xl">Order Summary</h1>
          </div>

          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Subtotal:</h1>
              <h1 className="text-2xl font-bold">Dhs. 00.00</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Shipping:</h1>
              <h1 className="text-2xl font-bold">Dhs. 00.00</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Total:</h1>
              <h1 className="text-2xl font-bold">Dhs. 00.00</h1>
            </div>
          </div>

          <FilledButton>Proceed to Checkout</FilledButton>
        </div>
      </div>
    </div>
  );
}
