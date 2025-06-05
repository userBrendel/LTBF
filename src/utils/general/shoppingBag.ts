"use server";

import { createClient } from "../supabase/server";

export async function readUserShoppingBag(user: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("bag")
      .select(`*, product:product_id(*)`)
      .eq("user_id", user.id);

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem retrieving your bag.");
    }

    console.log(`User ${user.id} bag loaded.`);
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

export async function addToShoppingBag(
  user: any,
  product: any,
  quantity: number,
  size: number
) {
  const supabase = await createClient();

  try {
    if (size === 0) {
      console.error("No size is selected.");
      throw new Error("Please select a size.");
    }

    const { data, error } = await supabase
      .from("bag")
      .insert({
        user_id: user.id,
        product_id: product.id,
        quantity,
        size,
      })
      .select(`*, product:product_id(*)`)
      .single();

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem adding the fragrance to your bag.");
    }

    console.log(`${data.product_id} added to bag of ${data.user_id}.`);
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

export async function removeFromShoppingBag(bag: any) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("bag").delete().eq("id", bag.id);

    if (error) {
      console.error(error.message);
      throw new Error(
        "There was a problem removing the fragrance from your bag."
      );
    }

    console.log(`${bag.product_id} removed from bag of ${bag.user_id}.`);
    return {
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: (error as Error).message,
    };
  }
}
