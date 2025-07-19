import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function Code() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: codeValue,
    validationSchema,
  });
  async function codeValue(values) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Successful");
      setTimeout(() => {
        navigate("/newPass");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(toastLoading);
    }
  }


  return (
    <>
      <div className="container min-h-screen bg-gray p-20 ">
        <h3>Enter the code</h3>
        {error ? <p className="text-red-500">{error}</p> : null}
        <form onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.resetCode}
            name="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full bg-gray border-1 p-1 rounded"
            placeholder="Code..."
          />{" "}
          <div className="p-10">
            <button
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
