import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export default function Categories() {
  const [category, setCategory] = useState(null);

  async function allCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategory(data.data);
    } catch (error) {

    }
  }

  useEffect(() => {
    allCategories();
  }, []);
  return (
    <>
      {" "}
      <div className="container min-h-screen bg-gray">
        {category ? (
          <>
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 space-x-1">
              {category?.map((item) => {
                return (
                  <>
                    <div className="mt-4  rounded hover:border-1 border-green-400">
                      <div className="flex justify-center">
                        {" "}
                        <img
                          src={item.image}
                          alt=""
                          className="h-60 w-60 object-contain"
                        />
                      </div>{" "}
                      <h2 className="text-center ">{item.name}</h2>
                    </div>{" "}
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <>
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
