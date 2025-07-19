import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishContext } from "../../context/WishContext";

export default function WishItem({ item, allWish }) {
  let { addProduct } = useContext(CartContext);
  let { remove } = useContext(WishContext);

  return (
    <>
      <div className="flex justify-between items-center gap-1  p-5 ">
        <div className="  flex items-center gap-1">
          <img
            src={item.imageCover}
            alt=""
            className="w-40  rounded  border-1"
          />{" "}
          <div>
            {" "}
            <h2 className="font-bold">{item.title}</h2>
            <h2 className="font-bold">{item.price} Egp</h2>{" "}
            <button
              className="bg-red-500 rounded p-2 m-1 mt-2 cursor-pointer"
              onClick={() => {
                remove(item.id);
              }}
            >
              Remove
            </button>{" "}
            <div className="flex gap-2 ">
              <button
                className="bg-green-500 rounded p-2 m-1 mt-2 cursor-pointer "
                onClick={() => {
                  addProduct(item.id);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
