import Button from "../../ui-components/Button.tsx";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice.ts";

interface UpdateItemQuantityButtonsProps {
  pizzaID: number;
  currentQuantity?: number;
}

export default function UpdateItemQuantityButtons({
  pizzaID,
  currentQuantity,
}: UpdateItemQuantityButtonsProps) {
  const dispatch = useDispatch();

  return (
    <div className="ali flex items-center gap-2 md:gap-4">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaID))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaID))}
      >
        +
      </Button>
    </div>
  );
}
