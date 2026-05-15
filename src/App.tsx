import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import Error from "./layout/Error";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./layout/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import MainContainer from "./layout/MainContainer";
import CitiesList from "./pages/CitiesList";
import CountriesList from "./pages/CountriesList";
import Form from "./pages/Form";
import City from "./pages/City";
import Insight from "./pages/Insight";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      {
        path: "/app",
        element: (
          <ProtectedRoute>
            <MainContainer />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate replace to="cities" /> },
          { path: "cities", element: <CitiesList /> },
          {path: "city/:id", element: <City /> },
          { path: "countries", element: <CountriesList /> },
          { path: "form", element: <Form /> },
          { path: "insight", element: <Insight /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
