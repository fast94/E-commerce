import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext";

export default function GuardedRoute({ children }) {
  let { token } = useContext(TokenContext);
  if (token == null) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
