"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useAuth } from "@/src/context/AuthContext";
import { updateAddress } from "@/src/utils/general/authServer";
import { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "sonner";

export default function YourAddressBookFormClient() {
  const { session, addressData } = useAuth();

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (addressData) {
      setCountry(addressData.country || "");
      setRegion(addressData.region || "");
      setAddress(addressData.address || "");
    }
  }, [addressData]);

  async function handleUpdateAddress(formData: FormData) {
    const { error } = await updateAddress(session?.user, formData);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Address updated successfully.");
  }

  return (
    <form action={handleUpdateAddress} className="space-y-4">
      <div>
        <label>Country:</label>
        <CountryDropdown
          name="country"
          value={country}
          onChange={setCountry}
          className="w-full border px-3 py-2 outline-none appearance-none"
          defaultOptionLabel="Country"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label>Region:</label>
        <RegionDropdown
          name="region"
          country={country}
          value={region}
          onChange={setRegion}
          className="w-full border px-3 py-2 outline-none appearance-none"
          blankOptionLabel="Region"
          defaultOptionLabel="Region"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          defaultValue={addressData?.address || ""}
          className="w-full border px-3 py-2 outline-none"
          required
        />
      </div>
      <div className="text-center">
        <FilledButton size="lg" type="submit">
          Update Address
        </FilledButton>
      </div>
    </form>
  );
}
