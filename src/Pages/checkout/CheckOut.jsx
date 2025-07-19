import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { CartContext } from "../../context/CartContext";

export default function CheckOut() {
  const { cartData } = useContext(CartContext);
  let { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const phoneRegex = /^01[1250][0-9]{8}$/;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(null);

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: onlineOrder,
  });

  async function onlineOrder(values) {
    const toastLoading = toast.loading("loading..");
    setLoading(true);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartData._id}?url=https://fast94.github.io/E-commerce/`,
        method: "POST",
        headers: { token },
        data: values,
      };
      const { data } = await axios.request(options);

      toast.success("Successful");
      setTimeout(() => {
        window.location.href = data.session.url;
      }, 2000);
    } catch (error) {
      console.log(error);

    } finally {
      toast.dismiss(toastLoading);
      setLoading(false);
    }
  }


  return (
    <>
      <div className="container min-h-screen bg-gray p-20">
        {" "}
        {error ? <p className="text-red-500">{error}</p> : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-5">
            <label htmlFor="shippingAddress.details">Name</label>
            <input
              value={formik.values.shippingAddress.details}
              name="shippingAddress.details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full bg-gray  border-1  p-1  rounded"
              placeholder="Name..."
            />

          </div>
          <div className="mt-5">
            <label htmlFor="shippingAddress.phone">Phone</label>
            <input
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="shippingAddress.phone"
              className="w-full bg-gray  border-1 p-1  rounded"
              placeholder="Phone..."
            />{" "}
            <label htmlFor="shippingAddress.city">City</label>
            <input
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="shippingAddress.city"
              className="w-full bg-gray  border-1 p-1  rounded"
              placeholder="city..."
            />

          </div>{" "}
          <div className="flex justify-center flex-col gap-2 mt-3">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 p-3 mx-auto block rounded mt-2"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
