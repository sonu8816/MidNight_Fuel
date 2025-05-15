import React from "react";
import { Link } from "react-router-dom";
import bannerImg from '../assets/Image/banner.png';
function Banner() {
  return (
    <section className="relative h-[100vh] w-full">
      <img
        src={bannerImg}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
        Welcome to Night Canteen
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-6 max-w-2xl">
          Shop your daily essentials & snacks from your hostel in seconds.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-medium transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default Banner;
