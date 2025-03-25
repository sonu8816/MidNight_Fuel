import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const ProtectRoutes = () => {
  // Get the token from cookies
  // const token = getCookie("authToken");
  const token = localStorage.getItem('authToken')
  // console.log(token);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default ProtectRoutes;
