import Button from "../../ui-components/Button.tsx";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice.ts";

interface DeleteItemProps {
  pizzaID: number;
}

export default function DeleteItemButton({ pizzaID }: DeleteItemProps) {
  const dispatch = useDispatch();

  return (
    <Button type={"small"} onClick={() => dispatch(deleteItem(pizzaID))}>
      Delete
    </Button>
  );
}
