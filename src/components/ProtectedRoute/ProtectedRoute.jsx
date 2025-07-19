import React, { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { token } = useContext(TokenContext);
  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"}/>;
  }
}
