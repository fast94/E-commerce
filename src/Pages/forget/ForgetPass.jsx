import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    email: string().required("email is required").email(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetValue,
    validationSchema,
  });
  async function forgetValue(values) {
    const toastLoading = toast.loading("loading..");
    setLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Successful");
      setTimeout(() => {
        navigate("/code");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastLoading);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container min-h-screen bg-gray p-20 ">
        <h3>Please enter your Email</h3>
        <form onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full bg-gray  border-1  p-1  rounded"
            placeholder="email..."
          />{" "}
          <div className="p-10">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600 p-3 mx-auto block rounded mt-2 w-50 font-semibold cursor-pointer"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
