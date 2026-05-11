import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Error from "./layout/Error";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./layout/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      { path: "/app", element: <ProtectedRoute><AppLayout /></ProtectedRoute> }

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
