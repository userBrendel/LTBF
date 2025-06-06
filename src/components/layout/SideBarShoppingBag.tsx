import { ShoppingBasket, X } from "lucide-react";
import FilledButton from "../ui/FilledButton";
import FragranceShoppingCardBag from "../cards/FragranceCardShoppingBag";
import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SideBarShoppingBagProps = {
  isShoppingBagOpen: boolean;
  closePanels: () => void;
};

export default function SideBarShoppingBag({
  isShoppingBagOpen,
  closePanels,
}: SideBarShoppingBagProps) {
  const { shoppingBag } = useShoppingBag();
  const router = useRouter();

  const subtotal = shoppingBag.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  async function handleCheckout() {
    const response = await fetch("/api/createCheckoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: shoppingBag.map((item) => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || `/perfume_default.png`,
        })),
      }),
    });

    const data = await response.json();

    if (!data.url) {
      toast.error("Something went wrong.");
    }

    window.location.href = data.url;
  }

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 w-full lg:w-224 bg-white backdrop-blur-md transform overflow-y-auto ${
        isShoppingBagOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-600 z-100 overflow-hidden`}
    >
      <div className="flex justify-end p-4">
        <button onClick={closePanels} className="text-black">
          <X size={28} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 px-6 text-lg pb-8">
        <div className="order-2 lg:order-1 space-y-8">
          <div className="border-b flex justify-between items-center">
            <h1 className="text-3xl">Shopping Bag</h1>
            <h2>{shoppingBag.length} items</h2>
          </div>

          <div className="space-y-8">
            {shoppingBag && shoppingBag.length > 0 ? (
              shoppingBag.map((shoppingBag, index) => (
                <FragranceShoppingCardBag
                  key={index}
                  shoppingBag={shoppingBag}
                />
              ))
            ) : (
              <div className="space-y-16">
                <div className="space-y-4 grid place-items-center">
                  <ShoppingBasket
                    size={172}
                    fill="white"
                    color="white"
                    className="bg-black p-8 rounded-full"
                  />
                  <p className="text-center">Your shopping bag is empty</p>
                </div>

                <div className="space-y-4 grid place-items-center">
                  <p className="text-center">
                    Sniff out your favorite fragrances, and add them here!
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

        <div className="order-1 lg:order-2 space-y-8">
          <div className="border-b">
            <h1 className="text-3xl">Order Summary</h1>
          </div>

          <div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Subtotal:</h1>
              <h1 className="text-2xl font-bold">AED {subtotal}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Shipping:</h1>
              <h1 className="text-2xl font-bold">AED {shipping}</h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl">Total:</h1>
              <h1 className="text-2xl font-bold">AED {total}</h1>
            </div>
          </div>

          <FilledButton
            size="lg"
            onClick={() => {
              closePanels();
              handleCheckout();
            }}
          >
            Proceed to Checkout
          </FilledButton>
        </div>
      </div>
    </div>
  );
}
