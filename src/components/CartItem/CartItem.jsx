import { Minus, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartItem({ item }) {
  let { removeItem, updateItem } = useContext(CartContext);
  let count = item.count;

  return (
    <>
      <div className="flex justify-between items-center gap-1  p-5 ">
        <div className="flex items-center gap-1">
          <img
            src={item.product.imageCover}
            alt=""
            className="w-40  rounded "
          />{" "}
          <div>
            {" "}
            <h2 className="font-bold">{item.product.title}</h2>
            <h2 className="font-bold">{item.price} Egp</h2>{" "}
            <button
              className="bg-red-500 rounded p-2 m-1 mt-2 cursor-pointer"
              onClick={() => {
                removeItem(item.product.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <Plus
            className="bg-green-500 rounded cursor-pointer"
            onClick={() => {
              updateItem(item.product.id, count + 1);
            }}
          />
          <p>{count}</p>
          <Minus
            className="bg-green-500 rounded cursor-pointer"
            onClick={() => {
              updateItem(item.product.id, count - 1);
            }}
          />
        </div>
      </div>
    </>
  );
}
