import { createContext, useState } from "react";

export const TokenContext = createContext(null);

export default function TokenProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
