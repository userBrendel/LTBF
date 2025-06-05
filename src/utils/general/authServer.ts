"use server";

import { createClient } from "../supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function signUp(formData: FormData) {
  const supabaseService = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const supabase = await createClient();

  try {
    const display_name = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const phone = formData.get("phone")?.toString().trim();
    const country = formData.get("country")?.toString().trim();
    const region = formData.get("region")?.toString().trim();
    const address = formData.get("address")?.toString().trim();

    if (
      !display_name ||
      !email ||
      !password ||
      !phone ||
      !country ||
      !region ||
      !address
    ) {
      console.error("Missing required fields.");
      throw new Error("Missing required fields.");
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: {
          display_name,
        },
        emailRedirectTo: `http://localhost:3000/emailconfirmation`,
      },
    });

    const user = data?.user;
    if (authError || !user) {
      console.error(authError?.message || "No user returned");
      throw new Error("There was an error creating your account.");
    }

    const { error: addressError } = await supabaseService
      .from("address")
      .insert({
        id: user.id,
        country,
        region,
        address,
      });

    if (addressError) {
      await supabaseService.auth.admin.deleteUser(user.id);
      console.error(addressError.message);
      throw new Error("There was an error saving your address.");
    }

    console.log(`User ${user.id} signed up.`);
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: (error as Error).message,
    };
  }
}

export async function readSelfSession() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      throw new Error("There was a problem retrieving your session.");
    }

    return { data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}
