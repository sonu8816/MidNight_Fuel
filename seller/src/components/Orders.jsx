import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchOrders } from '../store/seller/productSlice';

function Orders() {
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders()).then((data) => {
      if (data?.payload) {
        setOrderList(data?.payload.data);
      }
    });
  }, [dispatch]);

  const handleToggleStatus = async (orderId, currentStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/seller/update-order/${orderId}`,
        { orderStatus: !currentStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setOrderList(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, orderStatus: !currentStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <div className="p-4 mt-20 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Orders</h2>
      <div className="overflow-y-auto max-h-[600px]">
        <ul className="space-y-6">
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <li key={order._id} className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col md:flex-row justify-between items-center">
                
                {/* Order & User Details */}
                <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  {/* Left: Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="text-lg font-semibold text-gray-800">Product: {order.productName}</div>
                    <div className="text-sm text-gray-600">Quantity: <span className="font-medium">{order.quantity}</span></div>
                    <div className="text-sm text-gray-600">Price: <span className="font-medium">${order.orderAmount}</span></div>
                    <div className="text-sm text-gray-600">Payment Mode: <span className="font-medium">{order.paymentMethod}</span></div>
                    <div className="text-sm text-gray-600">
                      Status: 
                      <span className={order.orderStatus ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {order.orderStatus ? " Delivered" : " Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Right: User & Address Details */}
                  <div className="flex-1 space-y-2 md:text-left">
                    <div className="text-lg font-semibold text-gray-800">Customer: {order.address.fullName}</div>
                    <div className="text-sm text-gray-600">User ID: {order.address.uid}</div>
                    <div className="text-sm text-gray-600">Room No: {order.address.roomNo}</div>
                    <div className="text-sm text-gray-600">Address: <span className="font-medium">{order.address.fullName}, Room {order.address.roomNo}</span></div>
                  </div>

                  {/* Button: Aligned to the right */}
                  <div className="md:w-auto">
                    <button
                      className={`px-4 py-2 text-white rounded-md transition duration-300 ${order.orderStatus ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
                      onClick={() => handleToggleStatus(order._id, order.orderStatus)}
                    >
                      {order.orderStatus ? "Mark as Pending" : "Mark as Delivered"}
                    </button>
                  </div>
                </div>

              </li>
            ))
          ) : (
            <li className="text-gray-600 text-center">No orders available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Orders;
