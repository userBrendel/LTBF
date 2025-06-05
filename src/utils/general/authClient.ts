"use client";

import { createClient } from "../../utils/supabase/client";

export async function signIn(formData: FormData) {
  const supabase = createClient();

  try {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!email || !password) {
      console.error("Missing required fields.");
      throw new Error("Missing required fields.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        console.error("User email is not verified.");
        throw new Error("Please verify your email before signing in.");
      }

      console.error(error.message);
      throw new Error("Invalid email or password.");
    }

    console.log(`User signed in: ${data.user?.id}`);
    return { data, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: (error as Error).message,
    };
  }
}

export async function signOut() {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem signing out.");
    }

    console.log("User signed out.");
    return { data: true, error: null };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: (error as Error).message,
    };
  }
}
