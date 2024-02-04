import Header from "./Header.tsx";
import CartOverview from "../features/cart/CartOverview.tsx";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <CartOverview></CartOverview>
    </div>
  );
}

export default AppLayout;
