import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TokenContext } from "../../context/TokenContext";
export default function Orders() {
  let { token } = useContext(TokenContext);
  const { id } = jwtDecode(token);

  const [orders, setOrders] = useState(null);
  let { cartData } = useContext(CartContext);
  async function allOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setOrders(data);
  }
  useEffect(() => {
    allOrders();
  }, []);
  return (
    <>
      <div className="min-h-100 p-10">
        {orders ? (
          <>
            {" "}
            {orders?.map((order) => {
              return (
                <>
                  <div className="border-1 mb-2 p-5">
                    <div className="flex justify-between">
                      <div>
                        <h2>Order id # {order.id}</h2>
                        <h2 className="font-semibold">Total Price: {order.totalOrderPrice} Egp</h2>
                      </div>
                      <div>
                        {order.isDelivered ? (
                          <h2 className="bg-blue-500 p-2 rounded mb-2">
                            Is Delivered
                          </h2>
                        ) : (
                          <h2 className="bg-blue-500 p-2 rounded mb-2">
                            Not Delivered
                          </h2>
                        )}
                        {order.isPaid ? (
                          <h2 className="bg-green-500 p-2 rounded mb-2 text-center">
                            Payed
                          </h2>
                        ) : (
                          <h2 className="bg-red-500 p-2 rounded mb-2">
                            Not Payed
                          </h2>
                        )}
                      </div>
                    </div>{" "}
                    {order.cartItems.map((item) => {
                      return (
                        <>
                          {" "}
                          <div>
                            {" "}
                            <img
                              src={item.product.imageCover}
                              alt=""
                              className="w-50 border-1 border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            {" "}
                            <h2>{item.product.title}</h2>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="flex justify-center items-center h-100">
              {" "}
              <h3>No orders</h3>
            </div>
          </>
        )}
      </div>
    </>
  );
}
