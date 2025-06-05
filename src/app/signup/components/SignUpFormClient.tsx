"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { startTransition, useState, useTransition } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { E164Number } from "libphonenumber-js";
import { signUp } from "@/src/utils/general/authServer";
import { toast } from "sonner";

export default function SignUpFormClient() {
  const [isPending, startTransition] = useTransition();

  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  async function handleConfirm(formData: FormData) {
    startTransition(async () => {
      const { error } = await signUp(formData);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Signed up successfully.");

      setPhone(undefined);
      setCountry("");
      setRegion("");
    });
  }

  return (
    <>
      {/* insert loader here */}

      <form className="flex flex-col gap-8" action={handleConfirm}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border-b py-2 focus:outline-none"
          required
          autoComplete="off"
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          className="border-b py-2 focus:outline-none"
          title="Please enter a valid email address"
          required
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-b py-2 focus:outline-none"
          pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
          title="Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
          required
          autoComplete="off"
        />

        <PhoneInput
          defaultCountry="AE"
          name="phone"
          placeholder="Phone Number (+971)"
          value={phone}
          onChange={setPhone}
          className="border-b py-2 focus:outline-none"
          required
          autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CountryDropdown
            name="country"
            value={country}
            onChange={setCountry}
            className="border-b py-2 focus:outline-none appearance-none"
            defaultOptionLabel="Country"
            required
            autoComplete="off"
          />

          <RegionDropdown
            name="region"
            country={country}
            value={region}
            onChange={setRegion}
            className="border-b py-2 focus:outline-none appearance-none"
            disableWhenEmpty={true}
            blankOptionLabel="Region"
            defaultOptionLabel="Region"
            required
            autoComplete="off"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border-b py-2 focus:outline-none col-span-1 md:col-span-2"
            required
            autoComplete="off"
          />
        </div>

        <FilledButton size="lg" type="submit">
          Sign Up
        </FilledButton>
      </form>
    </>
  );
}
