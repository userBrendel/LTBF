import Link from "next/link";
import SignInFormClient from "./components/SignInFormClient";

export default function SignInPage() {
  return (
    <main className="py-48 px-6 md:px-16 lg:px-48 space-y-8 min-h-screen grid place-items-center">
      <section className="border p-8 flex flex-col gap-8 max-w-150">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <p className="text-lg">
          Sign in for a Let There Be Fragrance account to easily view and manage
          your past orders anytime, all in one place.
        </p>

        <SignInFormClient />

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link href={"/signup"}>
            <u>Sign Up</u>
          </Link>
        </p>

        <Link href="/forgetpassword">
          <u>Forget Password?</u>
        </Link>

        {/* {showForgotForm && (
            <div className="p-4 rounded mt-4 space-y-4 border">
              <p className="text-sm">
                Enter your email to receive a password reset link:
              </p>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border-b py-2"
              />
              <FilledButton size="md" type="button">
                Send Reset Link
              </FilledButton>
            </div>
          )}

          {message && (
            <div className="text-sm mt-4 text-center bg-yellow-100 text-yellow-800 p-2 rounded">
              {message}
            </div>
          )} */}
      </section>
    </main>
  );
}
