import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem.tsx";

export interface Pizza {
  id?: number;
  name?: string;
  unitPrice?: number;
  imageUrl?: string;
  ingredients?: string[];
  soldOut?: boolean;
}

function Menu() {
  const menu: Pizza[] = useLoaderData() as Pizza[];
  return (
    <ul className="divide-y divide-stone-200">
      {menu.map((pizza: Pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
