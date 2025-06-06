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
      options: {
        data: {
          phone,
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

    console.log(data);
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

export async function updateAccount(formData: FormData) {
  const supabase = await createClient();

  const display_name = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();

  if (!email || !phone || !display_name) {
    console.error("Missing required fields.");
    throw new Error("Missing required fields.");
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      email,
      data: {
        phone,
        display_name,
      },
    });

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem updating your account.");
    }

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

export async function updateAddress(user: any, formData: FormData) {
  const supabase = await createClient();

  const country = formData.get("country")?.toString().trim();
  const region = formData.get("region")?.toString().trim();
  const address = formData.get("address")?.toString().trim();

  try {
    if (!country || !region || !address) {
      console.error("Missing required fields.");
      throw new Error("Missing required fields.");
    }

    const { data, error } = await supabase
      .from("address")
      .update({
        country,
        region,
        address,
      })
      .eq("id", user.id);
    if (error) {
      console.error(error.message);
      throw new Error("There was a problem updating your address.");
    }

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

export async function readSelf() {
  const supabase = await createClient();

  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.error(sessionError);
      throw new Error("There was a problem retrieving your session.");
    }

    const userID = sessionData.session?.user.id;
    if (!userID) {
      throw new Error("User is not logged in.");
    }

    const { data: addressData, error: addressError } = await supabase
      .from("address")
      .select("*")
      .eq("id", userID)
      .single();
    if (addressError) {
      console.error(addressError);
      throw new Error("There was a problem retrieving your address.");
    }

    return {
      data: {
        session: sessionData.session,
        address: addressData,
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}
