import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flame } from "lucide-react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  const sellerPath = import.meta.env.VITE_SELLER_API_URL;
  const adminPath = import.meta.env.VITE_ADMIN_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Update cart item count from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(cart.length);

  }, [localStorage.getItem("token")]); // Re-run effect when the token changes

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    setTimeout(() => {
      navigate("/");
      navigate("/login");
      setIsLoggedIn(false);
    }, 1000);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const openAdminLogin = () => {
    // Open the Admin login page in a new window
    window.open(adminPath, "_blank");
  };

  const openSellerLogin = () => {
    // Open the Seller login page in a new window
    window.open(sellerPath, "_blank");
  };

  return (
    <div className="navbar bg-[#0e1c2f] text-white shadow-lg px-6">
      {/* Logo */}
      <div className="flex-none flex items-center gap-2">
        <Flame className="w-6 h-6 text-pink-500 animate-pulse" />
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-fuchsia-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          MidNIGHT-FUEL
        </NavLink>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right Side */}
      <div className="flex-none flex items-center gap-4">
        {/* Become Seller */}
        <button
          onClick={openSellerLogin}
          className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
        >
          Become Seller
        </button>

        {/* Admin Login */}
        <button
          onClick={openAdminLogin}
          className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white"
        >
          Admin Login
        </button>

        {/* Cart */}
        <button onClick={handleCartClick} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 
                    2.293c-.63.63-.184 1.707.707 1.707H17m0 
                    0a2 2 0 100 4 2 2 0 000-4zm-8 
                    2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="badge badge-sm indicator-item">
                {cartItemCount}
              </span>
            )}
          </div>
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 text-gray"
          >
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <a onClick={logout}>Logout</a>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
