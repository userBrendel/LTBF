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
  addToWishlist,
  readUserWishlist,
  removeFromWishlist,
} from "../utils/general/wishlist";
import { toast } from "sonner";

type WishlistContextType = {
  wishlist: any[];
  add: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  add: async () => {},
  remove: async () => {},
});

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = useAuth();

  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    async function loadWishlist() {
      if (!session?.user) {
        setWishlist([]);
        return;
      }

      const { data, error } = await readUserWishlist(session.user);
      if (error) {
        setWishlist([]);
        return;
      }

      setWishlist(data || []);
    }

    loadWishlist();
  }, [session?.user]);

  async function add(product: any) {
    if (!session?.user) {
      toast.error("Please sign in to add fragrances to your wishlist.");
      return;
    }

    const { data, error } = await addToWishlist(session.user, product);
    if (error) {
      return;
    }

    toast.success("Fragrance added to your wishlist.");

    setWishlist((prev) => {
      const alreadyExists = prev.some((item) => item.product.id === product.id);
      if (alreadyExists) return prev;
      return [...prev, data];
    });
  }

  async function remove(product: any) {
    if (!session?.user) {
      toast.error("Please sign in to remove fragrances from your wishlist.");
      return;
    }

    const { error } = await removeFromWishlist(session.user, product);
    if (error) {
      return;
    }

    toast.success("Fragrance removed from your wishlist.");

    setWishlist((prev) =>
      prev.filter((item) => item.product.id !== product.id)
    );
  }

  return (
    <WishlistContext.Provider value={{ wishlist, add, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
