import { createClient } from "../../utils/supabase/server";

export async function readAllProducts() {
  try {
    const supabase = await createClient();

    const { data: products, error: productsError } = await supabase
      .from("Product")
      .select("*");

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
