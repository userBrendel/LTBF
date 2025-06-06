"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useAuth } from "@/src/context/AuthContext";
import { readUserOrders } from "@/src/utils/general/order";
import { useEffect, useState } from "react";

export default function AccountIntroClient() {
  const { session, signOut } = useAuth();

  const [orderData, setOrderData] = useState<string[] | null>([]);

  useEffect(() => {
    async function loadOrders() {
      if (!session?.user) return;

      const { data, error } = await readUserOrders(session.user);
      if (error) {
        return;
      }

      setOrderData(data);
    }

    loadOrders();
  }, [session?.user]);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex-grow border-t border-black" />
        <h1 className="font-bold text-3xl text-center">
          Hello, {session?.user.user_metadata.display_name}
        </h1>
        <div className="flex-grow border-t border-black" />
      </div>

      <div className="px-6 md:px-16 lg:px-48 space-y-8">
        <p>Welcome back to your account dashboard.</p>
      </div>

      <div className="px-6 md:px-16 lg:px-48 space-y-8">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">Items</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Total</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData && orderData.length > 0 ? (
              orderData?.map((order: any) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border-b">{order.id}</td>
                  <td className="px-4 py-2 border-b">
                    <div>
                      {order.order_item.map((item: any, index: number) => (
                        <div key={index}>
                          {item.quantity}x {item.size}ml {item.product.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b capitalize">
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border-b">
                    AED {order.total_price}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 border-b">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 md:px-16 lg:px-48 space-y-8 flex justify-end">
        <FilledButton size="lg" onClick={signOut}>
          Sign Out
        </FilledButton>
      </div>
    </>
  );
}
