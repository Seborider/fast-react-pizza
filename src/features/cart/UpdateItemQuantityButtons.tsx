import Button from "../../ui-components/Button.tsx";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice.ts";

interface UpdateItemQuantityButtonsProps {
  pizzaId: number;
  currentQuantity?: number;
}

export default function UpdateItemQuantityButtons({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityButtonsProps) {
  const dispatch = useDispatch();

  return (
    <div className="ali flex items-center gap-2 md:gap-4">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
