import { createContext, useContext, useState } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function ContextProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  let { token } = useContext(TokenContext);

  async function addProduct(productId) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: { token },
        data: { productId },
      };
      const { data } = await axios.request(options);

      allCart();
      toast.success("Successful");
    } catch (error) {

    } finally {
      toast.dismiss(toastLoading);
    }
  }
  async function updateItem(productId, count) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: { token },
        data: { count },
      };
      toastLoading;
      const { data } = await axios.request(options);
      allCart();
    } catch (error) {

    } finally {
      toast.dismiss(toastLoading);
    }
  }

  async function removeItem(productId) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      allCart();
      toast.success("Removed");
    } catch (error) {
    } finally {
      toast.dismiss(toastLoading);
    }
  }

  async function clearCart() {
    const loadingToast = toast.loading("loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      allCart();
    } catch (error) {
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function allCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: { token },
      };
      const { data } = await axios.request(options);
      setCartData(data.data);
      setCartItem(data.numOfCartItems);
    } catch (error) {}
  }
  return (
    <CartContext.Provider
      value={{
        addProduct,
        cartData,
        allCart,
        clearCart,
        removeItem,
        updateItem,
        cartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
