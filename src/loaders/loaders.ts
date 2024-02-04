import { getMenu, getOrder } from "../services/apiRestaurant.ts";

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

interface OrderLoaderParams {
  params: {
    orderId: string;
  };
}

export async function orderLoader({ params }: OrderLoaderParams) {
  const order = await getOrder(params.orderId);
  return order;
}
