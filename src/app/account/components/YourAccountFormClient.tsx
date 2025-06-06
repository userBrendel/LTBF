"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useAuth } from "@/src/context/AuthContext";
import { updateAccount } from "@/src/utils/general/authServer";
import { E164Number } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";

export default function YourAccountFormClient() {
  const { session } = useAuth();

  async function handleUpdateAccount(formData: FormData) {
    const { error } = await updateAccount(formData);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Account updated successfully.");
  }

  return (
    <form action={handleUpdateAccount} className="space-y-4">
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          defaultValue={session?.user?.user_metadata.display_name}
          placeholder="Full Name"
          className="w-full border px-3 py-2 outline-none"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          defaultValue={session?.user.email}
          placeholder="Email"
          className="w-full border px-3 py-2 outline-none"
          required
          autoComplete="off"
        />
        <span>
          <b>NOTE</b>: By changing email addresses, you will receive an email
          confirming the change.
        </span>
      </div>
      <div>
        <label>Phone:</label>
        <PhoneInput
          name="phone"
          defaultCountry="AE"
          placeholder="Phone Number (+971)"
          value={
            session?.user.user_metadata.phone.replace(/\s+/g, "") as E164Number
          }
          onChange={() => {}}
          className="w-full border px-3 py-2 outline-none"
          required
          autoComplete="off"
        />
      </div>
      <div className="text-center">
        <FilledButton size="lg" type="submit">
          Update Account
        </FilledButton>
      </div>
    </form>
  );
}
