import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeCartItmes,
  updateCartItmes,
  uploadCartItems,
  updateTotalAmount
} from "../Slice/CartItemSlice";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchProducts } from "../Slice/ProductSlice";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const cartData = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.items.data);
  // const [totalAmount, setTotalAmount] = useState(0);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const backendUrl = useSelector((state) => state.backendUrl.url);
  const navigate = useNavigate();
  
  const getToken = () => localStorage.getItem("token");
  // console.log(cartItems);
  // console.log(cartData);
  const fetchProduct = async () => {
    await dispatch(fetchProducts());
  };
  useEffect(() => {
    fetchProduct();
    FetchCartItems();
  }, []);

  // console.log(products[0]?._id);
  useEffect(() => {
    const updatedCartItems = [];
    let tempAmount = 0;
    products?.forEach((product) => {
      const cartItem = cartData.find((item) => item.id === product._id);
      if (cartItem) {
        updatedCartItems.push(product);
        tempAmount += product.price * cartItem.quantity;
      }
    });

    setCartItems(updatedCartItems);
    dispatch(updateTotalAmount(tempAmount));
  }, [cartData, products]);

  const FetchCartItems = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found in localStorage");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/user/getUserCart`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(uploadCartItems(response.data.cartData));
        //console.log(response.data.cartData);
      } else {
        console.warn("FetchCartItems failed:", response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err.response?.data || err.message);
      navigate("/login");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity > 0) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/updateCartItems`,
          { productId, quantity: newQuantity },
          { headers: { token: getToken() } }
        );
        if (response.data.success) {
          dispatch(updateCartItmes({ id: productId, quantity: newQuantity }));
        }
      } catch (err) {
        console.error("Error updating quantity:", err.response?.data || err.message);
      }
    }
  };

  const incrementQuantity = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  const deleteItems = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/removeCartItems`,
        { productId },
        { headers: { token: getToken() } }
      );
      if (response.data.success) {
        dispatch(removeCartItmes(productId));
      }
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty!</p>
      ) : (
        <ul className="space-y-6">
          {cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item.id
            );
            return (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-100 shadow-lg rounded-lg hover:bg-slate-400 transition duration-300"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold text-gray-800">
                      {productData?.productName}
                    </span>
                    <span className="text-sm text-gray-500">
                      Price: ₹{productData?.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => decrementQuantity(item.id, item.quantity)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    className="w-16 p-2 border border-gray-300 rounded-md text-center"
                  />
                  <button
                    onClick={() => incrementQuantity(item.id, item.quantity)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="text-lg font-semibold text-gray-800">
                    {item.quantity} x ₹{productData?.price}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    onClick={() => deleteItems(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {cartItems?.length > 0 && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            Total: ₹{totalAmount}
          </span>
          <NavLink
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 mt-6 sm:mt-0"
            to={"/orderPlaced"}
          >
            Proceed to Checkout
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Cart;
