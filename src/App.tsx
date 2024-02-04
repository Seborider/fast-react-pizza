import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui-components/Home.tsx";
import Menu from "./features/menu/Menu.tsx";
import Cart from "./features/cart/Cart.tsx";
import CreateOrder from "./features/order/CreateOrder.tsx";
import Order from "./features/order/Order.tsx";
import AppLayout from "./ui-components/AppLayout.tsx";
import { menuLoader } from "./loaders/loaders.ts";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
