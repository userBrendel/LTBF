"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/src/utils/supabase/client";
import { redirect } from "next/navigation";
import { readSelf } from "../utils/general/authServer";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  addressData: Address | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

type Address = {
  country: string;
  region: string;
  address: string;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  addressData: null,
  loading: true,
  signOut: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [addressData, setAddressData] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const { data, error } = await readSelf();

      if (data) {
        setSession(data.session);
        setAddressData(data.address);
        setLoading(false);
      } else if (error) {
        return;
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    toast.success("Signed out successfully.");
    redirect("/");
  }

  return (
    <AuthContext.Provider value={{ session, addressData, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
