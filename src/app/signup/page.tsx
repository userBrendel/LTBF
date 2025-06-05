import Link from "next/link";
import SignUpFormClient from "./components/SignUpFormClient";

export default function SignUpPage() {
  return (
    <main className="py-48 px-6 md:px-16 lg:px-48 space-y-8 min-h-screen grid place-items-center">
      <section className="border p-8 flex flex-col gap-8 max-w-150">
        <h1 className="text-3xl font-bold">Sign Up</h1>

        <p className="text-lg">
          Join Let There Be Fragrance and never miss an update!
        </p>

        <SignUpFormClient />

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="underline text-black">
            <u>Sign in</u>
          </Link>
        </p>
      </section>
    </main>
  );
}
