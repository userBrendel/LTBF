'use client';

import React, { useState } from 'react';
import FilledButton from '../../components/ui/FilledButton';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

const supabase = createClient();

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showForgotForm, setShowForgotForm] = useState(false);

  const handleLogin = async () => {
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signed in successfully.');
      router.push('/account');
    }
  };

  const handlePasswordReset = async () => {
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password reset email sent. Please check your inbox.');
      setShowForgotForm(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow w-full py-30 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <div className="border p-8 flex flex-col gap-4">
            <h1 className="text-3xl">Greetings New Customer!</h1>
            <p className="text-lg">
              Create an account now and stay updated with the latest LTBF releases—be the first to experience what’s next!
            </p>
            <FilledButton size="lg" href="/CreateAccount">
              Create Your Account
            </FilledButton>
          </div>
        </section>

        <section>
          <div className="border p-8 flex flex-col gap-4">
            <h1 className="text-3xl">Already have an account?</h1>
            <p className="text-lg">
              Sign in for an LTBF account to easily view and manage your past orders anytime, all in one place.
            </p>

            <div className="space-y-8 text-lg">
              <input
                type="email"
                className="border-b w-full py-2 focus:outline-none focus:ring-0"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border-b w-full py-2 focus:outline-none focus:ring-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowForgotForm(!showForgotForm)}
              className="text-lg text-right underline"
            >
              Forgot Password?
            </button>

            {showForgotForm && (
              <div className="p-4 rounded mt-4 space-y-4 border">
                <p className="text-sm">Enter your email to receive a password reset link:</p>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border-b py-2"
                />
                <FilledButton size="md" type="button" onClick={handlePasswordReset}>
                  Send Reset Link
                </FilledButton>
              </div>
            )}

            {message && (
              <div className="text-sm mt-4 text-center bg-yellow-100 text-yellow-800 p-2 rounded">
                {message}
              </div>
            )}

            <div>
              <FilledButton size="lg" type="button" onClick={handleLogin}>
                Sign In
              </FilledButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
