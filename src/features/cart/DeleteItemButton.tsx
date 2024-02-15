import Button from "../../ui-components/Button.tsx";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice.ts";

interface DeleteItemProps {
  pizzaId: number;
}

export default function DeleteItemButton({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  return (
    <Button type={"small"} onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
