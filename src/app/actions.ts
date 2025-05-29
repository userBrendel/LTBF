"use server";

import { createClient } from "../utils/supabase/server";

type filterProductsProps = {
  column: string;
  value: string;
};

export async function filterProducts({ column, value }: filterProductsProps) {
  try {
    const supabase = await createClient();

    const { data: products, error: productsError } = await supabase
      .from("Product")
      .select("*")
      .eq(column, value)
      .limit(4);

    if (productsError) {
      throw new Error(productsError.message);
    }

    return {
      products,
      productsError,
    };
  } catch (e) {
    const errorMessage = (e as Error).message;

    console.error(errorMessage);
    return { resultError: { message: errorMessage } };
  }
}

type sortProductsProps = {
  column: string;
  ascending: boolean;
};

export async function sortProducts({ column, ascending }: sortProductsProps) {
  try {
    const supabase = await createClient();

    const { data: products, error: productsError } = await supabase
      .from("Product")
      .select("*")
      .order(column, { ascending: ascending })
      .limit(4);

    if (productsError) {
      throw new Error(productsError.message);
    }

    return {
      products,
      productsError,
    };
  } catch (e) {
    const errorMessage = (e as Error).message;

    console.error(errorMessage);
    return { resultError: { message: errorMessage } };
  }
}
