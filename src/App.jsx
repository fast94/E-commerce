import { Children, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { Toaster } from "react-hot-toast";
import GuardedRoute from "./components/guarded/GuardedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import TokenProvider from "./context/TokenContext";
import ContextProvider from "./context/CartContext";
import Cart from "./Pages/Cart/Cart";
import ForgetPass from "./Pages/forget/ForgetPass";
import Code from "./Pages/code/Code";
import NewPass from "./Pages/newPass/newPass";
import Wishlist from "./Pages/wishlist/Wishlist";
import WishProvider from "./context/WishContext";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import CheckOut from "./Pages/checkout/CheckOut";
import Orders from "./Pages/Orders/Orders";
import Details from "./Pages/Details/Details";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brand", element: <Brands /> },
        { path: "/allorders", element: <Orders /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/details/:id", element: <Details /> },
      ],
    },
    {
      path: "",
      element: (
        <GuardedRoute>
          <Layout />
        </GuardedRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forget", element: <ForgetPass /> },
        { path: "/code", element: <Code /> },
        { path: "/newPass", element: <NewPass /> },
      ],
    },
  ]);
  return (
    <>
      <TokenProvider>
        {" "}
        <ContextProvider>
          <WishProvider>
            {" "}
            <RouterProvider router={routes} />
            <Toaster />{" "}
          </WishProvider>{" "}
        </ContextProvider>
      </TokenProvider>
    </>
  );
}

export default App;
