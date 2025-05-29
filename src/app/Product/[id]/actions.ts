"use server";

import { createClient } from "../../../utils/supabase/server";

export async function readSingleProduct(id: string) {
  try {
    const supabase = await createClient();

    const { data: product, error: productError } = await supabase
      .from("Product")
      .select("*")
      .eq("id", id)
      .single();

    if (productError) {
      throw new Error(productError.message);
    }

    return {
      product,
      productError,
    };
  } catch (e) {
    const errorMessage = (e as Error).message;

    console.error(errorMessage);
    return { resultError: { message: errorMessage } };
  }
}
