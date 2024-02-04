import Header from "./Header.tsx";
import CartOverview from "../features/cart/CartOverview.tsx";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader.tsx";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
