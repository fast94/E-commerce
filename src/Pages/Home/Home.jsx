import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import { BeatLoader } from "react-spinners";
import HomeSwiper from "../../components/HomeSwiper/HomeSwiper";
import homeslider1 from "../../assets/slider-image-1.jpeg";
import homeslider2 from "../../assets/slider-image-2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
export default function Home() {
  const [products, setProducts] = useState(null);
  const [categorey, setCategorey] = useState(null);

  async function allProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);

  }
  async function getCategorey() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setCategorey(data.data);
  }

  useEffect(() => {
    allProducts();
    getCategorey();
  }, []);

  return (
    <>
      <div className="container min-h-screen bg-gray">
        {products ? (
          <>
            {" "}
            <div className="grid grid-cols-12 mt-3 p-10">
              <div className="col-span-8">
                <HomeSwiper />
              </div>{" "}
              <div className="col-span-4 mx-1">
                <img src={homeslider1} alt="" className="h-50 w-80" />
                <img src={homeslider2} alt="" className="h-50 w-80" />
              </div>
            </div>
            <div className="grid grid-cols-1  p-2">
              {" "}
              <div className="">
                <Swiper slidesPerView={4}>
                  {categorey?.map((item) => {
                    return (
                      <SwiperSlide>
                        <div className="mx-1 ">
                          <img src={item.image} alt="" className="h-50 w-50" />
                        </div>{" "}
                        <h2>{item.name}</h2>
                      </SwiperSlide>
                    );
                  })}{" "}
                </Swiper>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  ">
              {products?.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-100">
            {" "}
            <BeatLoader color="green" size={50} />
          </div>
        )}
      </div>
    </>
  );
}
