import { formatCurrency } from "../../utils/helpers.ts";
import DeleteItemButton from "./DeleteItemButton.tsx";
import UpdateItemQuantityButtons from "./UpdateItemQuantityButtons.tsx";
import { useSelector } from "react-redux";
import { getCurrentQuantityByID } from "./cartSlice.ts";

export interface CartItemProps {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
  };
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQantity = useSelector(getCurrentQuantityByID(pizzaId));

  return (
    <li className="sm: py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold"> {formatCurrency(totalPrice)}</p>
        <UpdateItemQuantityButtons
          pizzaId={pizzaId}
          currentQuantity={currentQantity}
        />
        <DeleteItemButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
