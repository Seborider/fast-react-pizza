// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useLoaderData } from "react-router-dom";
import OrderItem, { OrderItemType } from "./OrderItem.tsx";

interface Order {
  id?: string;
  status: string;
  priority: string;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: OrderItemType[];
}

function Order() {
  const order: Order = useLoaderData() as Order;

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    id,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Status of Order #{id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
            {status} order
          </span>
        </div>
      </div>

      <ul className=" dive-stone-200 divide-y border-b border-t">
        {cart.map((item: OrderItemType) => (
          <OrderItem item={item} key={item.id}></OrderItem>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-4 py-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="space-y-2 bg-stone-200 px-6 py-5 ">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default Order;
