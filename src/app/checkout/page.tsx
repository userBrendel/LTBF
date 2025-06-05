"use client";

import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import Image from "next/image";
import FilledButton from "@/src/components/ui/FilledButton";
import { getImageUrl } from "@/src/utils/general/getImageUrl";

export default function CheckoutPage() {
  const { shoppingBag: bag } = useShoppingBag();

  const subtotal = bag.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      {bag.length === 0 ? (
        <div className="text-center text-gray-600 text-xl py-20">
          Your shopping bag is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Your Items</h2>

            {bag.map((item, i) => {
              const imageUrl =
                item.product.image || getImageUrl(item.product.id);

              return (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-40 h-40 relative">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-2">
                      <p className="text-lg font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} • Size: {item.size}ml
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-semibold ml-4">
                    AED {item.product.price * item.quantity}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>AED {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>AED {shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>AED {total}</span>
              </div>
            </div>

            <FilledButton
            size="lg"
            onClick={async () => {
              const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  items: bag.map((item) => ({
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.image || getImageUrl(item.product.id),
                  })),
                }),
              });

              const data = await response.json();

              if (data.url) {
                window.location.href = data.url;
              } else {
                alert("Something went wrong.");
              }
            }}
          >
            Proceed to Payment
          </FilledButton> 
          </div>
        </div>
      )}
    </div>
  );
}
