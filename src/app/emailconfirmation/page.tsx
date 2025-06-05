"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorMessage from "@/src/components/layout/ErrorMessage";
import FilledButton from "@/src/components/ui/FilledButton";

export default function EmailConfirmationPage() {
  const searchParams = useSearchParams();

  const errorDescription = searchParams.get("error_description");

  const [error, setError] = useState("");

  useEffect(() => {
    if (errorDescription) {
      setError(errorDescription);
    } else {
      const timeout = setTimeout(() => {
        redirect("/");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <main className="py-48 px-6 md:px-16 lg:px-48 space-y-8 min-h-screen">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-3xl text-center">
          {error ? "Error" : "Email Confirmation"}
        </h1>
        <div className="flex-grow border-t border-black" />
      </div>

      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <p>Your email has been confirmed.</p>
          <p>Redirecting you shortly...</p>

          <FilledButton href="/signin" size="lg">
            Sign In
          </FilledButton>
        </>
      )}
    </main>
  );
}
