import { Pizza } from "./Menu.tsx";
import { formatCurrency } from "../../utils/helpers.ts";
import Button from "../../ui-components/Button.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  CartItem,
  getCurrentQuantityByID,
} from "../cart/cartSlice.ts";
import DeleteItemButton from "../cart/DeleteItemButton.tsx";
import UpdateItemQuantityButtons from "../cart/UpdateItemQuantityButtons.tsx";

interface MenuItemProps {
  pizza: Pizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityByID(id!));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    if (
      typeof id === "number" &&
      typeof unitPrice === "number" &&
      typeof name === "string"
    ) {
      const newItem: CartItem = {
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice, // `unitPrice` is guaranteed to be defined here
      };
      dispatch(addItem(newItem));
    }
  }

  return (
    <li className=" flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients?.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice!)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-6">
              <UpdateItemQuantityButtons
                pizzaId={id!}
                currentQuantity={currentQuantity}
              />
              <DeleteItemButton pizzaId={id!} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
