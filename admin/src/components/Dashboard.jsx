import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeller, getUser } from "../store/admin/controlSlice";
import SellerList from "./SellerList"; // Import SellerList component

const Dashboard = () => {
  const dispatch = useDispatch();

  const [totalSellers, setTotalSellers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [newRequests, setNewRequests] = useState(0);
  const [totalActiveSellers, setTotalActiveSellers] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [sellerList, setSellerList] = useState([]);
  const [dummySellerList, setDummySellerList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showSellerList, setShowSellerList] = useState(false); // State to toggle SellerList
  const { isAuthentication } = useSelector(state => state.auth);





  // if(isAuthentication)
  useEffect(()=>{
    // console.log("lkdjflkjsdflj");
    dispatch(getSeller())
        .then((data) => {
          // console.log("data is ", data);
          if (data?.payload?.success) {
            const verifiedSeller = data.payload.data.filter(
              (seller) => seller.varified === true
            );
            const notVarifiedSeller = data.payload.data.filter(
              (seller) => seller.varified === false
            );

            setTotalSellers(verifiedSeller.length);
            setNewRequests(notVarifiedSeller.length);
            setDummySellerList(notVarifiedSeller)

          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, [sellerList])



  useEffect(() => {
    // console.log('emptyoisdfo')
    const getData = () => {
      dispatch(getUser())
        .then((data) => {
          if (data?.payload?.success) {
            setTotalUsers(data.payload.data.length);
            setUserList(data.payload.data);
            setSellerList(dummySellerList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, [dispatch, newRequests]);

  


  return (
    <div className="p-6">
      {!showSellerList ? (
        <>
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* Container for the stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Sellers */}
            <div className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer">
              <h2 className="text-xl font-bold text-gray-700">Total Sellers</h2>
              <p className="text-3xl font-semibold text-indigo-600">
                {totalSellers}
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer">
              <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
              <p className="text-3xl font-semibold text-indigo-600">
                {totalUsers}
              </p>
            </div>

            {/* Total Active Sellers */}
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold text-gray-700">
                Active Sellers
              </h2>
              <p className="text-3xl font-semibold text-green-600">
                {totalActiveSellers}
              </p>
            </div>

            {/* Total Active Users */}
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold text-gray-700">Active Users</h2>
              <p className="text-3xl font-semibold text-green-600">
                {totalActiveUsers}
              </p>
            </div>

            {/* New Requests for Becoming Seller */}
            <div
              className="bg-white p-4 rounded-lg shadow-lg text-center cursor-pointer"
              onClick={() => setShowSellerList(true)} // Show SellerList on click
            >
              <h2 className="text-xl font-bold text-gray-700">New Requests</h2>
              <p className="text-3xl font-semibold text-red-600">
                {newRequests}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setShowSellerList(false)} // Back to Dashboard
          >
            Back to Dashboard
          </button>
          <SellerList
            sellerList={sellerList} // Pass unverified sellers
            setSellerList={setSellerList}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
