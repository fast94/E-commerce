import { Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { use } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export default function Cart() {
  let { cartData, allCart, clearCart } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isMounted) {
      allCart();
      setIsMounted(false);
    }
  }, []);

  return (
    <>
      <div className="container min-h-screen  p-5 flex flex-col gap-1">
        <h2 className=" ">
          Total Price :{" "}
          <span className="font-bold">{cartData?.totalCartPrice}</span>{" "}
        </h2>{" "}
        {cartData ? (
          <>
            {" "}
            {cartData.products?.map((item) => {
              return <CartItem item={item} key={item._id} />;
            })}{" "}
            {cartData.totalCartPrice ? (
              <>
                {" "}
                <Link
                  to={`/checkout/`}
                  className="bg-blue-500 rounded w-50 p-2 m-1 mt-2 cursor-pointer block mx-auto"
                >
                  Check Out
                </Link>
                <button
                  onClick={clearCart}
                  className="bg-red-500 rounded p-2 m-1 mt-2 cursor-pointer block ms-auto"
                >
                  Clear Cart
                </button>{" "}
              </>
            ) : (
              <button className="bg-green-500 rounded p-2  mt-2 cursor-pointer block m-auto w-50">
                <Link to={"/"}>Go to Home</Link>
              </button>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex justify-center items-center h-100">
              {" "}
              <BeatLoader color="green" size={50} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
