import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { WishContext } from "../../context/WishContext";
import { useNavigate } from "react-router-dom";

export default function Product({ product }) {
  const { addProduct } = useContext(CartContext);
  const { addWish } = useContext(WishContext);
  const navigate = useNavigate();

  async function getProduct(productId) {
    const loadingToast = toast.loading("loading..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setTimeout(() => {
        navigate(`/details/${productId}`);
      }, 1000);
    } catch (error) {
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  return (
    <>
      <div className=" rounded group border-1 border-gray-400 mb-1 mx-1 ">
        <div className="relative">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-fit object-cover"
          />{" "}
          <div className="absolute inset-0 flex justify-center items-center  gap-2 bg-gray-300/40 opacity-0  group-hover:opacity-100">
            <Eye
              onClick={() => {
                getProduct(product.id);
              }}
              className="bg-green-400 rounded-full cursor-pointer"
            />
            <ShoppingCart
              className="bg-green-400 rounded-full cursor-pointer"
              onClick={() => {
                addProduct(product.id);
              }}
            />
            <Heart
              className="bg-green-400 rounded-full cursor-pointer"
              onClick={() => {
                addWish(product.id);
              }}
            />
          </div>
        </div>

        <div className="bg-gray-100 p-1">
          <h2 className="text-green-700">{product.category.name}</h2>
          <h3 className="line-clamp-1">{product.title}</h3>
          <div className="flex justify-between p-2">
            {" "}
            <p className="font-bold">{product.price} Egp</p>
            <div className="flex gap-1">
              <p className="font-bold">{product.ratingsAverage}</p>
              <Star className="text-amber-500 " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
