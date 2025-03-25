import React from "react";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Seller from "./components/Seller";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import ProtectRoute from "./components/ProtectRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  // const {isAuthentication} = useSelector(state => state.auth);
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
        <Route path="/" element={<Auth/>} />
        <Route path="/login" element={<Auth/>}/>
      </Route>
      
      <Route element={<ProtectRoute/>}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="seller" element={<Seller />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
          {/* <Route path="logout" element={<Logout />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
