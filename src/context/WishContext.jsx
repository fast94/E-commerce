import { createContext, useContext, useState } from "react";
import { TokenContext } from "./TokenContext";
import axios from "axios";
import toast from "react-hot-toast";

export const WishContext = createContext(null);

export default function WishProvider({ children }) {
  const [wishData, setWishData] = useState(null);
  let { token } = useContext(TokenContext);

  async function allWish() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: { token },
      };
      const { data } = await axios.request(options);
      setWishData(data.data);

    } catch (error) {
    }
  }
  async function addWish(productId) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: { token },
        data: { productId },
      };
      const { data } = await axios.request(options);
      allWish();
      toast.success("Successful");
    } catch (error) {

    } finally {
      toast.dismiss(toastLoading);
    }
  }
  async function remove(productId) {
    const toastLoading = toast.loading("loading..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);

      allWish();
      toast.success("Removed");
    } catch (error) {

    } finally {
      toast.dismiss(toastLoading);
    }
  }

  return (
    <WishContext.Provider value={{ remove, allWish, wishData, addWish }}>
      {children}
    </WishContext.Provider>
  );
}
