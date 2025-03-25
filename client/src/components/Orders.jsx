import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Orders() {
  const backendUrl = useSelector((state) => state.backendUrl.url);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/orders`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders.reverse());
        } else {
          setError("No orders found");
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg"> {/* Changed background to gray-100 */}
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6">Your Orders</h1>

      {error ? (
        <div className="text-center text-lg text-red-500">{error}</div>
      ) : (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-md"> {/* White background for cards */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                  <span className="text-lg font-semibold text-gray-700">Order ID: {order._id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p><span className="font-semibold">Name:</span> {order.address.fullName}</p>
                    <p><span className="font-semibold">UID:</span> {order.address.uid}</p>
                    <p><span className="font-semibold">Room No:</span> {order.address.roomNo}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Product:</span> {order.productName}</p>
                    <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                    <p><span className="font-semibold">Amount:</span> ₹{order.orderAmount}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">Payment Mode: {order.address.paymentMode}</span>
                  <span className={`px-3 py-1 rounded-full text-white ${order.orderStatus ? "bg-green-500" : "bg-yellow-500"}`}>
                    {order.orderStatus ? "Order Received" : "Order Placed"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-600">You have no orders yet.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
