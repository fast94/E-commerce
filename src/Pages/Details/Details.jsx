import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
export default function Details() {
  let { addProduct } = useContext(CartContext);
  const { id } = useParams();
  const [details, setDetails] = useState();

  async function getProduct() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setDetails(data.data);
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {details ? (
        <>
          {" "}
          <div className="min-h-screen container">
            <div className="flex mt-3 p-10 ">
              <img
                src={details.imageCover}
                alt=""
                className="w-50 border-1
             rounded"
              />{" "}
              <div>
                <h2 className="text-2xl p-5 font-semibold">{details.title}</h2>
                <h2 className="text-2xl p-5 ">{details.description}</h2>
                <h2 className="text-2xl p-5 font-semibold">
                  {details.price} Egp
                </h2>{" "}
                <div className="flex justify-center">
                  {" "}
                  <button
                    className="bg-green-500 rounded p-2 m-1 mt-2 cursor-pointer "
                    onClick={() => {
                      addProduct(details.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Swiper
              loop={true}
              modules={[Pagination]}
              pagination={true}
              className="h-50 w-50  "
            >
              {" "}
              {details.images.map((image) => {
                return (
                  <SwiperSlide>
                    <img src={image} alt="" className=" w-50 h-50 " />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>{" "}
        </>
      ) : null}
    </>
  );
}
