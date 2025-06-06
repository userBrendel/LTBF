"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import {
  addToShoppingBag,
  readUserShoppingBag,
  removeFromShoppingBag,
} from "../utils/general/shoppingBag";
import { toast } from "sonner";

type ShoppingBagContextType = {
  shoppingBag: any[];
  add: (product: any, quantity: number, size: number) => Promise<void>;
  remove: (bag: any, silent?: boolean) => Promise<void>;
};

const ShoppingBagContext = createContext<ShoppingBagContextType>({
  shoppingBag: [],
  add: async () => {},
  remove: async () => {},
});

export function ShoppingBagProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [shoppingBag, setShoppingBag] = useState<any[]>([]);

  useEffect(() => {
    async function loadBag() {
      if (!session?.user) {
        setShoppingBag([]);
        return;
      }

      const { data, error } = await readUserShoppingBag(session.user);
      if (error) {
        setShoppingBag([]);
        return;
      }

      setShoppingBag(data || []);
    }

    loadBag();
  }, [session?.user]);

  async function add(product: any, quantity: number, size: number) {
    const { data, error } = await addToShoppingBag(
      session?.user,
      product,
      quantity,
      size
    );
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Fragrance added to your shopping bag.");
    setShoppingBag((prev) => [...prev, data]);
  }

  async function remove(bag: any, silent?: boolean) {
    const { error } = await removeFromShoppingBag(bag);
    if (error) {
      toast.error(error);
      return;
    }

    if (silent) {
      return;
    }

    toast.success("Fragrance removed from your shopping bag.");
    setShoppingBag((prev) => prev.filter((item) => item.id !== bag.id));
  }

  return (
    <ShoppingBagContext.Provider value={{ shoppingBag, add, remove }}>
      {children}
    </ShoppingBagContext.Provider>
  );
}

export const useShoppingBag = () => useContext(ShoppingBagContext);
