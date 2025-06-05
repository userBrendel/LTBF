"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(() => setTokenChecked(true))
        .catch((err) => {
          setError("Failed to validate session.");
          console.error(err);
        });
    } else {
      setTokenChecked(true); // Assume already logged in or no tokens needed
    }
  }, [searchParams]);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully! Redirecting to sign in...");
      setTimeout(() => router.push("/signin"), 2500);
    }
  };

  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Validating token...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 border p-6 shadow-md">
        <h1 className="text-2xl font-semibold text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border-b py-2 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Rewrite New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border-b py-2 focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        <button
          onClick={handleReset}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Set New Password
        </button>
      </div>
    </main>
  );
};

export default ResetPassword;
