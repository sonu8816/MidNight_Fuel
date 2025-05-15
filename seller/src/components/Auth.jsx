import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/seller/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const hostels = [
    "Aryabhatta",
    "Chanakya",
    "Sarabhai",
    "Bose",
    "Trisha",
    "Kalpana",
    "Gargi",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    UID: "",
    hostel: "",
    room: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setFormData({
        ...formData,
        [id]: value,
        email: `${value.trim().toLowerCase()}.midnightSeller@gmail.com`,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser(formData))
        .then((data) => {
          if (data?.payload?.success == "true") {
            toast.success(data?.payload?.message);
            localStorage.setItem("authToken", JSON.stringify(data?.payload?.token));
            navigate("/seller/orders");
          } else {
            toast.error(data?.payload?.message);
          }
        })
        .catch(() => {
          toast.error("Invalid credentials");
        });
    } else {
      dispatch(registerUser(formData))
        .then((data) => {
          if (data?.payload?.success) {
            toast.success(data?.payload?.message);
            setIsLogin(true);
          } else {
            toast.error(data.payload.message);
          }
        });
    }
  };

  const handleResetPassword = () => {
    navigate("/seller/resetpassword");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {isLogin ? (
          <>
            <h3 className="text-xl font-bold text-center text-gray-800">Login</h3>
            <p className="text-center text-sm text-gray-600 mb-4">
              Enter your credentials to continue.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                  Email:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name prefix"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                  <span className="text-gray-700">@midnightSeller.com</span>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
                <p
                  className="text-sm text-pink-600 hover:underline cursor-pointer mt-1"
                  onClick={handleResetPassword}
                >
                  Forget Password?
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-gray-700">
              Don't have an account?{" "}
              <button onClick={toggleForm} className="text-pink-600 hover:text-pink-700 font-medium">
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-center text-gray-800">Sign Up</h3>
            <p className="text-center text-sm text-gray-600 mb-4">
              Create a new account to get started.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your Username"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
                    Phone:
                  </label>
                  <input
                    type="number"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your Phone number"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="UID" className="block text-sm font-medium text-gray-800">
                    UID:
                  </label>
                  <input
                    type="number"
                    id="UID"
                    value={formData.UID}
                    onChange={handleInputChange}
                    placeholder="Enter your UID"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="hostel" className="block text-sm font-medium text-gray-800">
                    Hostel:
                  </label>
                  <select
                    id="hostel"
                    value={formData.hostel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  >
                    <option value="">Select your Hostel</option>
                    {hostels.map((hostel) => (
                      <option key={hostel} value={hostel}>
                        {hostel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="room" className="block text-sm font-medium text-gray-800">
                  Room:
                </label>
                <input
                  type="text"
                  id="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  placeholder="Enter your Room number"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <button onClick={toggleForm} className="text-pink-600 hover:text-pink-700 font-medium">
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
