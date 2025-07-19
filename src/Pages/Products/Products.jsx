import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import { BeatLoader } from "react-spinners";
import { CartContext } from "../../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState(null);

  async function allProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);
  }

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <>
      <div className="container min-h-screen bg-gray ">
        {products ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  p-5">
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
