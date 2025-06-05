"use client";

import { useEffect } from "react";
import { useShoppingBag } from "@/src/context/ShoppingBagContext";
import { CheckCircle } from "lucide-react";
import FilledButton from "@/src/components/ui/FilledButton";

export default function SuccessPage() {
  const { shoppingBag, remove } = useShoppingBag();

  useEffect(() => {
    shoppingBag.forEach((item) => {
      remove(item, true); 
    });
  }, [shoppingBag, remove]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
      <CheckCircle size={80} className="text-green-600 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Thank you for your order. We've received your payment and are now
        processing your purchase. 
      </p>
      <div className="mt-4">
        <FilledButton href="/">Continue Shopping</FilledButton>
      </div>
    </div>
  );
}
