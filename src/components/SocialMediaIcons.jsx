import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SocialMediaIcons = ({ hiddenOnMobile }) => {
  return (
    <div
      className={`fixed bottom-6 left-4 z-50 flex flex-col items-center gap-4 transition-opacity duration-500 ${
        hiddenOnMobile ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <a
        href="https://www.facebook.com/share/1CDKhq9bMD/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
      >
        <FaFacebookF size={20} />
      </a>

      <a
        href="https://www.instagram.com/shoreblast2015?igsh=bzBza2sxdTNhdHhz"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white p-3 rounded-full hover:opacity-90 transition"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="https://wa.link/0hyqwp"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
      >
        <FaWhatsapp size={20} />
      </a>

      <a
        href="mailto:info.shoreblastenergy@gmail.com"
        className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
      >
        <MdEmail size={20} />
      </a>

      <a
        href="tel:+2347063314134"
        className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-900 transition"
      >
        <FaPhone size={20} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
