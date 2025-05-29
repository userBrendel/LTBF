import React from "react";
import FilledButton from "../../components/ui/FilledButton";
import Link from "next/link";

export default function Signin() {
  return (
    <main className="py-32 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <section>
        <div className="border p-8 flex flex-col gap-4">
          <h1 className="text-3xl">Greetings New Customer!</h1>
          <p className="text-lg">
            Create an account now and stay updated with the latest LTBF
            releases—be the first to experience what’s next!
          </p>
          <FilledButton size="lg" href="#">
            Create Your Account
          </FilledButton>
        </div>
      </section>

      <section>
        <div className="border p-8 flex flex-col gap-4">
          <h1 className="text-3xl">Already have an account?</h1>
          <p className="text-lg">
            Sign in for an LTBF account to easily view and manage your past
            orders anytime, all in one place.
          </p>

          <div className="space-y-8 text-lg">
            <input
              className="border-b w-full py-2 focus:outline-none focus:ring-0"
              placeholder="E-mail"
            />
            <input
              className="border-b w-full py-2 focus:outline-none focus:ring-0"
              placeholder="Password"
            />
          </div>

          <Link href="" className="text-lg text-right">
            Forget Password?
          </Link>

          <div>
            <FilledButton size="lg">Sign In</FilledButton>
          </div>
        </div>
      </section>
    </main>
  );
}
