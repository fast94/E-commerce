import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import WishItem from "../../components/wishItem/WishItem";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { WishContext } from "../../context/WishContext";

export default function Wishlist() {
  const [isMounted, setIsMounted] = useState(true);
  let { wishData, allWish } = useContext(WishContext);

  useEffect(() => {
    if (isMounted) {
      allWish();
      setIsMounted(false);
    }
  }, []);
  return (
    <>
      <div className="container min-h-screen  p-5 flex flex-col gap-1">
        {wishData ? (
          <>
            {" "}
            {wishData?.map((item) => {
              return <WishItem item={item} key={item.id} fun={allWish} />;
            })}{" "}
            <button className="bg-green-500 rounded p-2  mt-2 cursor-pointer block m-auto w-50">
              <Link to={"/"}>Go to Home</Link>
            </button>
          </>
        ) : (
          <>
            {" "}
            <div className="flex justify-center items-center h-100">
              {" "}
              <BeatLoader color="green" size={50} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
