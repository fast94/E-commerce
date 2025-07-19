import { LogOut, Menu, MenuIcon, ShoppingCart, X } from "lucide-react";
import React, { use, useContext, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";
import { CartContext } from "../../context/CartContext";

export default function Nav() {
  let { token, setToken } = useContext(TokenContext);
  let { cartItem } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(true);
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const navigate = useNavigate();
  function logOut() {
    setToken(localStorage.removeItem("token"));
    navigate("/login");
  }
  return (
    <>
      <nav>
        <div className="container bg-green-500 flex justify-between p-4 ">
          <Link to={"/"} className=" font-bold text-2xl ">
            fresh cart
          </Link>
          {isOpen && (
            <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
              <MenuIcon />
            </div>
          )}

          <ul
            className={` gap-3 mt-1 md:flex ${
              !isOpen ? `flex flex-col` : `hidden`
            } 
              ${isOpen ? `md:flex-row ` : `md:flex-row`}`}
          >
            {" "}
            {!isOpen && (
              <div className="cursor-pointer md:hidden" onClick={toggleMenu}>
                <X />
              </div>
            )}{" "}
            {token ? (
              <>
                {" "}
                <NavLink className="" to={"/"}>
                  Home
                </NavLink>
                <NavLink to={"/products"}>Products</NavLink>
                <NavLink to={"/categories"}>Categories</NavLink>
                <NavLink to={"/wishlist"}>Wishlist</NavLink>
                <NavLink to={"/brand"}>Brands</NavLink>
              </>
            ) : null}
          </ul>

          <ul className="flex gap-4 mt-1">
            {token ? (
              <>
                {" "}
                <div className="relative  ">
                  <NavLink to={"/cart"}>
                    {" "}
                    <ShoppingCart className=" cursor-pointer" />
                  </NavLink>
                  <p className="bg-blue-600 absolute top-[-11px] right-[-10px] w-5 h-5 rounded flex justify-center items-center">
                    {cartItem | null}
                  </p>
                </div>
                <NavLink onClick={logOut}>
                  <LogOut />
                </NavLink>
              </>
            ) : (
              <>
                {" "}
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/register"}>Register</NavLink>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
