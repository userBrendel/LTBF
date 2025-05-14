import React from "react";
import FilledButton from "../Components/FilledButton";
import Link from "next/link";

export default function Signin() {
  return (
    <main className="py-48 px-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <section>
        <div className="border p-8 flex flex-col gap-4">
          <h1 className="text-4xl">Greetings New Customer!</h1>
          <p className="text-lg">
            Create an account now and stay updated with the latest LTBF
            releases—be the first to experience what’s next!
          </p>
          <FilledButton href="#">Create Your Account</FilledButton>
        </div>
      </section>

      <section>
        <div className="border p-8 flex flex-col gap-4">
          <h1 className="text-4xl">Already have an account?</h1>
          <p className="text-lg">
            Sign in for an LTBF account to easily view and manage your past
            orders anytime, all in one place.
          </p>

          <div>
            <label>Email:</label>
            <input className="border w-full p-2" />
          </div>

          <div>
            <label>Password:</label>
            <input className="border w-full p-2" />
          </div>

          <Link href="" className="text-sm text-right">
            Forget Password?
          </Link>

          <div>
            <FilledButton>Sign In</FilledButton>
          </div>
        </div>
      </section>
    </main>
  );
}
