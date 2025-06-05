"use client";

import FilledButton from "@/src/components/ui/FilledButton";
import { useRouter } from "next/navigation";
import { signIn } from "@/src/utils/general/authClient";
import { toast } from "sonner";

export default function SignInFormClient() {
  const router = useRouter();

  async function handleSignIn(formData: FormData) {
    const { error } = await signIn(formData);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Signed in successfully.");
    router.push("/");
  }

  return (
    <form action={handleSignIn} className="flex flex-col gap-8">
      <input
        type="email"
        name="email"
        className="border-b w-full py-2 focus:outline-none focus:ring-0"
        placeholder="E-mail"
        required
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        className="border-b w-full py-2 focus:outline-none focus:ring-0"
        placeholder="Password"
        required
        autoComplete="current-password"
      />

      <FilledButton size="lg" type="submit">
        Sign In
      </FilledButton>
    </form>
  );
}
