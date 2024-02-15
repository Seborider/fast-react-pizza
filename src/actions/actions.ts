import {
  createOrder,
  MenuItemType,
  NewOrder,
} from "../services/apiRestaurant.ts";
import { redirect } from "react-router-dom";
import { isValidPhone } from "../utils/helpers.ts";
import store from "../store.ts";
import { clearCart } from "../features/cart/cartSlice.ts";

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
  const priority = formData.has("priority") && data.priority === "on";

  const cart: MenuItemType[] =
    typeof data.cart === "string"
      ? (JSON.parse(data.cart) as MenuItemType[])
      : [];
  const order: NewOrder = {
    ...data,
    cart: cart,
    priority,
  };
  console.log(order);

  const errors: FormErrors = {
    phone: "",
  };

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your phone number; we might need to contact you.";
  }

  const hasValidationErrors = Object.values(errors).some(
    (value) => value !== "",
  );
  if (hasValidationErrors) {
    console.log("Returning errors:", errors);
    return errors;
  }

  try {
    const newOrder = await createOrder(order);
    console.log("New order:", newOrder);
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
