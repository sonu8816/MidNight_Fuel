import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/seller/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const hostels = ["Aryabhatta", "Chanakya", "Sarabhai", "Bose", "Trisha", "Kalpana", "Gargi"];
  // State for form values
  const [formData, setFormData] = useState({
    name: "",
    email: ".midnightSeller@gmail.com", // default email
    password: "",
    phone: "",
    UID: "", // UID can be generated or provided
    hostel: "", // New field for hostel
    room: "", // New field for room
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // console.log(id, value);
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // console.log("Logging in with:", formData);
      dispatch(loginUser(formData))
        .then((data) => {
          console.log(data);
          if (data?.payload?.success == "true") {
            // Add success handling logic if necessary
            toast.success(data?.payload?.message);
            console.log(data?.payload?.token);
            // console.log(data.payload);
            localStorage.setItem(
              "authToken",
              JSON.stringify(data?.payload?.token)
            );
            navigate("/seller/orders");
          } else {
            console.log("message is ", data.payload.message);
            toast.error(data?.payload?.message);
          }
        })
        .catch((error) => {
          console.log("shubham", error);
          toast.error("invalid credentials");
        });
    } else {
      // console.log("Signing up with:", formData);
      dispatch(registerUser(formData)).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          // Add success handling logic if necessary
          toast.success(data?.payload?.message);
          //console.log(data.payload.token);
          setIsLogin(true);
        } else {
          toast.success(data.payload.message);
        }
      });
    }
  };

  const handleResetPassword = () => {
    navigate("/seller/resetpassword");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {isLogin ? (
          <>
            <h3 className="text-xl font-bold text-center">Login</h3>
            <p className="text-center text-sm text-gray-500 mb-4">
              Enter your credentials to continue.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ".midnightSeller@gmail.com"}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  className="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p
                  className="hover: cursor-pointer"
                  onClick={handleResetPassword}
                >
                  Forget Password
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
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-pink-600 hover:text-pink-700"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-center">Sign Up</h3>
            <p className="text-center text-sm text-gray-500 mb-4">
              Create a new account to get started.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Username"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ".midnightSeller@gmail.com"}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone:
                </label>
                <input
                  type="number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your Phone number"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="UID"
                  className="block text-sm font-medium text-gray-700"
                >
                  UID:
                </label>
                <input
                  type="number"
                  id="UID"
                  value={formData.UID}
                  onChange={handleInputChange}
                  placeholder="Enter your UID"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="hostel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hostel:
                </label>
                <select
                  id="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select your Hostel</option>
                  {hostels.map((hostel) => (
                    <option key={hostel} value={hostel}>
                      {hostel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="room"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room:
                </label>
                <input
                  type="text"
                  id="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  placeholder="Enter your Room number"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-pink-600 hover:text-pink-700"
              >
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
