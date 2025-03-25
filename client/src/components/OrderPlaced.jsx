import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function OrderPlaced() {
  // Initialize navigate function at the top level
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    uid: "",
    roomNo: "",
    paymentMode: "COD",
  });

  const cartData = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const backendUrl = useSelector((state) => state.backendUrl.url);
  console.log(totalAmount);
  console.log(cartData);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        backendUrl + "/api/user/orderplaced",
        {
          address: formData,
          cartData: cartData,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
  
      // Show success toast if the response indicates success
      if (response.data.success) {
        toast.success("Order placed successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
  
      // Navigate to Orders page after success
      setTimeout(() => {
        navigate("/orders");
      }, 3000); // Delay to allow toast visibility
  
    } catch (error) {
      // Show error toast
      toast.error("Failed to place order. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Placed</h1>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Section - Address Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-medium mb-4">Enter Address Details</h2>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* UID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UID:
            </label>
            <input
              type="text"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              placeholder="Enter your UID"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Number:
            </label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              placeholder="Enter room number"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Payment Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Mode:
            </label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="online">Online Payment</option>
            </select>
          </div>
        </div>

        {/* Right Section - Total Amount & Submit Button */}
        <div className="bg-gray-50 p-6 rounded-md shadow-md space-y-6">
          <h2 className="text-xl font-medium">Total Amount</h2>
          <p className="text-3xl font-semibold text-green-600">
            ₹{totalAmount}
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      </form>

      {/* Add ToastContainer to show toasts */}
      <ToastContainer />
    </div>
  );
}

export default OrderPlaced;
