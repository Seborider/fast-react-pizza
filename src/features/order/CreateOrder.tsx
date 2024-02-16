import { Form, useActionData, useNavigation } from "react-router-dom";
import { MenuItemType } from "../../services/apiRestaurant.ts";
import Button from "../../ui-components/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdress, getUser } from "../user/userSlice.ts";
import { getCart, getTotalCartPrice } from "../cart/cartSlice.ts";

import { FormErrors } from "../../actions/actions.ts";
import EmptyCart from "../cart/EmptyCart.tsx";
import { formatCurrency } from "../../utils/helpers.ts";
import React, { useState } from "react";
import { AppDispatch } from "../../store.ts";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(getUser);
  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch<AppDispatch>();
  const actionData = useActionData() as FormErrors;
  const formErrors: FormErrors = actionData || { phone: "" };

  const cart: MenuItemType[] = useSelector(getCart);

  if (!cart) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
          </div>
          {formErrors.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "failed" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[4px] top-[4px]">
              <Button
                disabled={isLoadingAddress}
                type={"small"}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  void dispatch(fetchAdress());
                }}
              >
                Get current Location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position ? `${position.longitude}, ${position.latitude}` : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Ordering"
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
