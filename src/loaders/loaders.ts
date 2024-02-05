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
  const orderId = params.orderId!;
  const order = await getOrder(orderId);
  return order;
}
