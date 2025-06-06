"use server";

import { createClient } from "../supabase/server";

export async function readUserOrders(user: any) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("order")
      .select(
        `
    *,
    order_item (
      *,
      product (
        name
      )
    )
  `
      )
      .eq("user_id", user.id);
    if (error) {
      console.error(error.message);
      throw new Error("There was a problem retrieving your orders.");
    }

    console.log(`User ${user.id} orders loaded.`);
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

export async function createOrder(user: any, shoppingBag: any[]) {
  const supabase = await createClient();

  let totalPrice = 0;

  shoppingBag.forEach((item) => {
    item.total_price = item.product.price * item.quantity;
    totalPrice += item.total_price;
  });

  try {
    const { data: orderData, error: orderError } = await supabase
      .from("order")
      .insert({
        user_id: user.id,
        total_price: totalPrice,
        status: "pending",
      })
      .select()
      .single();
    if (orderError) {
      console.error(orderError.message);
      throw new Error("There was a problem creating your order.");
    }

    const orderItems = shoppingBag.map((item) => ({
      order_id: orderData.id,
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
    }));

    const { data, error: orderItemError } = await supabase
      .from("order_item")
      .insert(orderItems);
    if (orderItemError) {
      console.error(orderItemError.message);
      throw new Error("There was a problem creating your order.");
    }

    console.log(`Order ${orderData.id} created.`);
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
