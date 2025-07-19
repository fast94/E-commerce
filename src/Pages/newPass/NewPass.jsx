import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { object, string } from "yup";

export default function NewPass() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const passRegex = /^[a-zA-Z0-9]{5,}$/;
  const [loading, setLoading] = useState(false);
  const validationSchema = object({
    email: string().required("email is required").email(),
    password: string()
      .required("password is required")
      .matches(passRegex, "password at least 5 chars"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: newPassValues,
    validationSchema,
  });

  async function newPassValues(values) {
    const toastLoading = toast.loading("loading..");
    setLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
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
            <input
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full bg-gray  border-1  p-1  rounded"
              placeholder="email..."
            />
            {formik.errors.email && formik.touched.email && (
              <p className="bg-red-500 mt-1 px-1">{formik.errors.email} </p>
            )}
          </div>
          <div className="mt-5">
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="newPassword"
              className="w-full bg-gray  border-1 p-1  rounded"
              placeholder="New Password..."
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="bg-red-500 mt-1 px-1">{formik.errors.newPassword} </p>
            )}
          </div>{" "}
          <div className="flex justify-center flex-col gap-2 mt-3">
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600 p-3 mx-auto block rounded mt-2 w-50 cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
