import { getMenu, getOrder } from "../services/apiRestaurant.ts";
import { LoaderFunctionArgs } from "react-router-dom"; // Ensure you import LoaderFunctionArgs

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

interface OrderLoaderParams {
  params: {
    orderId: string;
  };
}

export async function orderLoader({
  params,
}: LoaderFunctionArgs<OrderLoaderParams>) {
  // Assuming params is of type any, ensure you validate or assert the correct structure
  const orderId = params.orderId!; // This casting is safe based on your routing setup
  const order = await getOrder(orderId);
  return order;
}
