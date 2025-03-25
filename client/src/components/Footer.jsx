import React from "react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We are a team of passionate developers committed to delivering high-quality content and services. Our focus is on innovation and customer satisfaction.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-orange-400 transition duration-300">Home</a>
            </li>
            <li>
              <a href="/mypost" className="text-gray-400 hover:text-orange-400 transition duration-300">Blog</a>
            </li>
            <li>
              <a href="/about" className="text-gray-400 hover:text-orange-400 transition duration-300">About</a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-orange-400 transition duration-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>Email: <a href="mailto:info@example.com" className="hover:text-orange-400 transition duration-300">info@example.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-orange-400 transition duration-300">+123-456-7890</a></li>
            <li>Address: 123 Developer Lane, Code City, Tech Country</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © 2024 YourCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
