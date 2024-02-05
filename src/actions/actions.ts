import { createOrder, MenuItemType } from "../services/apiRestaurant.ts";
import { redirect } from "react-router-dom";

interface Request {
  request: {
    formData: () => Promise<FormData>;
  };
}

export async function createOrderAction({ request }: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()); // Correctly convert formData to a plain object

  // Ensure data.cart is a string before parsing
  const cart: MenuItemType[] =
    typeof data.cart === "string" ? JSON.parse(data.cart) : [];

  const order = {
    ...data,
    cart: cart,
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
