"use client";

import { useEffect, useRef } from "react";
import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { CheckCircle } from "lucide-react";
import FilledButton from "@/src/components/ui/FilledButton";
import { createOrder } from "@/src/utils/general/order";
import { toast } from "sonner";
import { useAuth } from "@/src/context/AuthContext";

export default function OrderConfirmationPage() {
  const { session } = useAuth();
  const { shoppingBag, remove } = useShoppingBag();

  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current || !session?.user || !shoppingBag.length) return;

    async function handleCreateOrder() {
      const { error } = await createOrder(session?.user, shoppingBag);
      if (error) {
        toast.error(error);
        return;
      }

      shoppingBag.forEach((item) => {
        remove(item, true);
      });
    }

    handleCreateOrder();
    hasRunRef.current = true;
  }, [session?.user, shoppingBag, remove]);

  return (
    <main className="py-48 px-6 md:px-16 lg:px-48 min-h-screen grid place-items-center">
      <CheckCircle size={80} className="text-green-600 animate-bounce" />

      <h1 className="text-4xl font-bold text-gray-800">Payment Successful!</h1>

      <p className="text-lg text-gray-600 max-w-xl">
        Thank you for your order. We've received your payment and are now
        processing your purchase.
      </p>

      <p>
        You can now view your order history in your account or shop some more.
      </p>

      <div className="flex gap-8">
        <FilledButton href="/account" size="lg">
          My Account
        </FilledButton>
        <FilledButton href="/catalogue" size="lg">
          Shop More
        </FilledButton>
      </div>
    </main>
  );
}
