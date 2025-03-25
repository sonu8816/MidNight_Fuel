import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../Slice/ProductSlice";

function Home() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items.data);

  const [selectedHostel, setSelectedHostel] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hostels = ["All","Aryabhatta", "Chanakya", "Sarabhai", "Bose", "Trisha", "Kalpana", "Gargi"];

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.productName} has been added to the cart!`);
  };

  const filteredData = selectedHostel === "All"
    ? products
    : products.filter((product) => product.hostelName === selectedHostel);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-wide text-gray-100">All Products</h1>

        {/* Hostel Filter Dropdown */}
        <div className="relative z-50">
  <button
    onClick={toggleDropdown}
    className="bg-blue-500 px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
  >
    Filter by Hostel
  </button>
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border rounded-lg shadow-md z-50">
      {hostels.map((hostel) => (
        <button
          key={hostel}
          onClick={() => {
            setSelectedHostel(hostel);
            toggleDropdown();
          }}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        >
          {hostel}
        </button>
      ))}
    </div>
  )}
</div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1">
  {filteredData?.length > 0 ? (
    filteredData.map((product) => (
      <Product key={product._id} product={product} />
    ))
  ) : (
    <p className="col-span-full text-center text-lg">No products found.</p>
  )}
</div>

    </div>
  );
}

export default Home;
