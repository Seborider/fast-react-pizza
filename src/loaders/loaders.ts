import { getMenu } from "../services/apiRestaurant.ts";

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}
