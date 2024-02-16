import { OrderType } from "./Order.tsx";
import { useFetcher } from "react-router-dom";
import Button from "../../ui-components/Button.tsx";

interface UpdateOrderProps {
  order?: OrderType;
}

export default function UpdateOrder({ order }: UpdateOrderProps) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={"primary"}>Make this order a priority</Button>
    </fetcher.Form>
  );
}
