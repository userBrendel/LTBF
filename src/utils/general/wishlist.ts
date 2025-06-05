"use server";

import { createClient } from "../supabase/server";

export async function readUserWishlist(user: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("wishlist")
      .select(`*, product:product_id(*)`)
      .eq("user_id", user.id);

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem retrieving your wishlist.");
    }

    console.log(`User ${user.id} wishlist loaded.`);
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

export async function addToWishlist(user: any, product: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("wishlist")
      .insert({
        user_id: user.id,
        product_id: product.id,
      })
      .select(`*, product:product_id(*)`)
      .single();

    if (error) {
      console.error(error.message);
      throw new Error(
        "There was a problem adding the fragrance to your wishlist."
      );
    }

    console.log(`${product.id} added to wishlist of ${user.id}.`);
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

export async function removeFromWishlist(user: any, product: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", product.id);

    if (error) {
      console.error(error.message);
      throw new Error(
        "There was a problem removing the fragrance from your wishlist."
      );
    }

    console.log(`${product.id} removed from wishlist of ${user.id}.`);
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
