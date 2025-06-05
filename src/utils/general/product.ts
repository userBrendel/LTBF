"use server";

import { createClient } from "../supabase/server";

export async function readAllFragrances() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("product").select("*");

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem displaying all fragrances.");
    }

    console.log("All fragrances loaded.");
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}

export async function readOneFragrance(id: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem displaying one fragrance.");
    }

    console.log(`Fragrance ${id} loaded.`);
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { data: null, error: (error as Error).message };
  }
}

export async function readSuggestedFragrances(id: string) {
  try {
    const supabase = await createClient();

    const { data: productData, error: productError } = await supabase
      .from("product")
      .select("concentration, gender")
      .eq("id", id)
      .single();

    if (productError) {
      console.error(productError.message);
      throw new Error("There was a problem displaying all fragrances.");
    }

    const { concentration, gender } = productData;

    const { data, error } = await supabase
      .from("product")
      .select("*")
      .neq("id", id)
      .or(`concentration.eq.${concentration},gender.eq.${gender}`)
      .limit(4);

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem displaying the products.");
    }

    console.log("Suggested fragrances loaded.");
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message };
  }
}

export async function filterFragrances(column: string, value: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .eq(column, value)
      .limit(4);

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem filtering the fragrances.");
    }

    console.log(`Fragrances filtered by ${column}.`);
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

export async function sortFragrances(column: string, ascending: boolean) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .order(column, { ascending: ascending })
      .limit(4);

    if (error) {
      console.error(error.message);
      throw new Error("There was a problem sorting the fragrances.");
    }

    console.log(`Fragrances sorted by ${column}.`);
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
