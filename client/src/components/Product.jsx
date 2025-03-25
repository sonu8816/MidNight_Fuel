import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCartItmes } from "../Slice/CartItemSlice";

function Product({ product }) {
  const dispatch = useDispatch();
  const backendUrl = useSelector((state) => state.backendUrl.url);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add product to cart");
        navigate('/login');
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/user/addtoCart",
        { productId: product._id },
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(addCartItmes(product.productId));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="relative border rounded-xl shadow-md p-4 bg-gray-900 text-white transition-transform transform hover:scale-105 hover:shadow-2xl w-64">
      {/* Stock Badge */}
      <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${product.totalStock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
        {product.totalStock > 0 ? "✔ In Stock" : "❌ Out of Stock"}
      </span>

      {/* Product Image Placeholder */}
      <div className="w-full h-28 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mb-3">
        <p className="text-gray-400 text-sm">
          <img src="" alt="image placeholder" />
        </p>
      </div>

      {/* Product Name */}
      <h2 className="text-lg font-semibold text-gray-100 truncate">{product.productName}</h2>

      {/* Hostel & Room No */}
      <p className="text-sm text-gray-400"><strong>🏠 Hostel:</strong> {product.hostelName}</p>
      <p className="text-sm text-gray-400"><strong>🚪 Room:</strong> {product.roomNo}</p>

      {/* Price Section */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-green-400">₹{product.price}</span>
        <span className="text-xs px-2 py-1 bg-blue-600 rounded-full text-white">{product.totalStock} Left</span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full mt-3 px-3 py-2 flex items-center justify-center rounded-lg transition duration-300 ${
          product.totalStock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={product.totalStock === 0}
      >
        🛒 {product.totalStock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default Product;
