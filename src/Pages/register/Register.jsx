import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const passRegex = /^[a-zA-Z0-9]{5,}$/;
  const phoneRegex = /^01[1250][0-9]{8}$/;
  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(4, "must be at least four letters")
      .max(20, "must be at most 20 letters"),
    email: string().required("email is required").email(),
    password: string().required("password is required").matches(passRegex, ""),
    rePassword: string()
      .required("Repassword is required")
      .oneOf([ref("password")], "Password must match"),
    phone: string().matches(phoneRegex, "phone number must be egyptian "),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: submitValues,
    validationSchema,
  });

  async function submitValues(values) {
    const toastLoading = toast.loading("loading..");
    setLoading(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Registered");
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
        {error ? <p className="text-red-500">{error}</p> : null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            type="text"
            className="w-full bg-gray  border-1 p-1  rounded"
            placeholder="Name..."
          />{" "}
          {formik.errors.name && formik.touched.name && (
            <p className="bg-red-500 mt-1 px-1">{formik.errors.name} </p>
          )}
          <div className="mt-5">
            <label htmlFor="email">Email</label>
            <input
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full bg-gray  border-1  p-1  rounded"
              placeholder="email..."
            />{" "}
            {formik.errors.email && formik.touched.email && (
              <p className="bg-red-500 mt-1 px-1">{formik.errors.email} </p>
            )}
          </div>{" "}
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full bg-gray  border-1  p-1  rounded"
              placeholder="Password..."
            />{" "}
            {formik.errors.password && formik.touched.password && (
              <p className="bg-red-500 mt-1 px-1">{formik.errors.password} </p>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="rePass">Repassword</label>
            <input
              value={formik.values.rePassword}
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="w-full bg-gray  border-1  p-1  rounded"
              placeholder="Repassword..."
            />{" "}
            {formik.errors.rePassword && formik.touched.rePassword && (
              <p className="bg-red-500 mt-1 px-1">
                {formik.errors.rePassword}{" "}
              </p>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="phone">Phone</label>
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="phone"
              className="w-full bg-gray  border-1 p-1  rounded"
              placeholder="Phone Number..."
            />{" "}
            {formik.errors.phone && formik.touched.phone && (
              <p className="bg-red-500 mt-1 px-1">{formik.errors.phone} </p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-green-600 p-3 mx-auto block rounded mt-2"
          >
            {" "}
            Register
          </button>
        </form>
      </div>
    </>
  );
}
