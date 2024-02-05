import {
  createOrder,
  MenuItemType,
  NewOrder,
} from "../services/apiRestaurant.ts";
import { redirect } from "react-router-dom";
import { isValidPhone } from "../utils/helpers.ts";

interface Request {
  request: {
    formData: () => Promise<FormData>;
  };
}

export interface FormErrors {
  phone: string;
}

export async function createOrderAction({ request }: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  // Ensure data.cart is a string before parsing
  const cart: MenuItemType[] =
    typeof data.cart === "string" ? JSON.parse(data.cart) : [];

  const order: NewOrder = {
    ...data,
    cart: cart,
    priority: data.priority === "on",
  };

  const errors: FormErrors = {
    phone: "",
  };

  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your phone number, we might need to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
