export interface MenuItemType {
  id?: number;
  name: string;
  unitPrice: number;
  imageUrl?: string;
  ingredients?: string[];
  soldOut?: boolean;
  phone?: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface NewOrder {
  cart: MenuItemType[];
  priority: boolean;
  phone?: string;
}

export interface OrderDetail {
  id: string;
  items: MenuItemType[];
  total: number;
  priority: boolean;
}

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu(): Promise<MenuItemType[]> {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Failed getting menu");
  const response: ApiResponse<MenuItemType[]> = await res.json();
  return response.data;
}

export async function getOrder(id: string): Promise<OrderDetail> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const response: ApiResponse<OrderDetail> = await res.json();
  return response.data;
}

export async function createOrder(newOrder: NewOrder): Promise<OrderDetail> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const response: ApiResponse<OrderDetail> = await res.json();
    return response.data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(
  id: string,
  updateObj: Partial<OrderDetail>,
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // No need to parse JSON for updates as we don't expect a return value
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
