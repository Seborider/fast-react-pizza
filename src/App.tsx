import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui-components/Home.tsx";
import Menu from "./features/menu/Menu.tsx";
import Cart from "./features/cart/Cart.tsx";
import CreateOrder from "./features/order/CreateOrder.tsx";
import Order from "./features/order/Order.tsx";
import AppLayout from "./ui-components/AppLayout.tsx";
import { menuLoader, orderLoader } from "./loaders/loaders.ts";
import Error from "./ui-components/Error.tsx";
import { createOrderAction, updateOrderAction } from "./actions/actions.ts";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
