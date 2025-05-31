'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FilledButton from '../../components/ui/FilledButton';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';

const supabase = createClient();

const CreateAccount = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    region: '',
    city: '',
    address: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { email, password, firstName, lastName, phone, country, region, city, address } = formData;

    // Check for missing fields
    if (!firstName || !lastName || !email || !password || !phone || !country || !region || !city || !address) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Password complexity check
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg(
        'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
      );
      return;
    }

    // Sign up with Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setErrorMsg(signUpError.message);
      return;
    }

    const userId = signUpData.user?.id;

    // If email confirmation is required, user may be null
    if (!userId) {
      setSuccessMsg('Check your email to confirm your account before signing in.');
      setTimeout(() => router.push('/signin'), 2500);
      return;
    }

    // Save profile data
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone,
        country,
        region,
        city,
        address,
      },
    ]);

    if (profileError) {
      setErrorMsg(profileError.message);
      return;
    }

    setSuccessMsg('Account created! Redirecting to sign in...');
    setTimeout(() => router.push('/signin'), 2500);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 py-25">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl border p-8 shadow-md flex flex-col gap-6"
      >
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <p className="text-gray-600">Join LTBF and never miss an update!</p>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border-b py-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border-b py-2 focus:outline-none"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className="border-b py-2 focus:outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-b py-2 focus:outline-none"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border-b py-2 focus:outline-none"
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border-b py-2 focus:outline-none"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="region"
            placeholder="Region / State / Province"
            value={formData.region}
            onChange={handleChange}
            className="border-b py-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border-b py-2 focus:outline-none"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border-b py-2 focus:outline-none col-span-1 md:col-span-2"
            required
          />
        </div>

        {/* Error & Success Boxes */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm">
            {successMsg}
          </div>
        )}

        <FilledButton size="lg" type="submit">
          Create Account
        </FilledButton>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/signin" className="underline text-black">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
};

export default CreateAccount;
