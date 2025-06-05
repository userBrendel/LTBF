"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useAuth } from "@/src/context/AuthContext";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Order {
  id: string;
  date: string;
  total: number;
  quantity: number;
  size: string;
}

export default function AccountPage() {
  const { session, signOut } = useAuth();
  const searchParams = useSearchParams();

  const [name, setName] = useState(session?.user?.user_metadata.display_name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [phone, setPhone] = useState(session?.user?.user_metadata.phone || "");
  const [country, setCountry] = useState("United Arab Emirates");
  const [city, setCity] = useState("Dubai");
  const [address, setAddress] = useState("123 Sheikh Zayed Rd");

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#12345",
      date: "2025-05-10",
      total: 89.99,
      quantity: 1,
      size: "50ml",
    },
  ]);

  const handleUpdate = () => {
    toast.success("Account updated (mock only)");
  };

  useEffect(() => {
    const isSuccess = searchParams.get("success");
    const latestTotal = searchParams.get("total");

    if (isSuccess && latestTotal) {
      const newOrder: Order = {
        id: `#${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split("T")[0],
        total: parseFloat(latestTotal),
        quantity: 1,
        size: "100ml", // default mock value
      };
      setOrders((prev) => [newOrder, ...prev]);
    }
  }, [searchParams]);

  return (
    <div className="py-30 px-6 md:px-16 lg:px-48 space-y-16">
      {/* Greeting */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Hello, {name}</h1>
        <p className="text-lg text-gray-600">Welcome back to your account dashboard</p>
      </div>

      {/* Account Info */}
      <section className="max-w-2xl mx-auto w-full space-y-6">
        <h2 className="text-2xl font-semibold text-center">Your Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Phone:</label>
            <PhoneInput
              defaultCountry="AE"
              placeholder="Phone Number"
              value={phone}
              onChange={setPhone}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium mt-6">Address</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1">Country / Region:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <FilledButton size="lg" onClick={handleUpdate}>Update Account</FilledButton>
          <FilledButton size="lg" onClick={signOut}>Sign Out</FilledButton>
        </div>
      </section>

      {/* Order History */}
      <section className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Order History</h2>
        <div className="overflow-x-auto">
          <table className="table-auto border w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Order</th>
                <th className="px-4 py-2 border">Placed On</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Size</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.date}</td>
                  <td className="px-4 py-2 border">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-2 border">{order.quantity}</td>
                  <td className="px-4 py-2 border">{order.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
} 