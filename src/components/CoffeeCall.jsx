import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const CoffeeInviteSection = () => {
  return (
    <section
      className="pt-32 pb-32 bg-cover bg-center bg-no-repeat max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-80">
      {/* Left Text Section */}
      <div className="md:w-2/3">
        <h2 className="text-4xl font-bold text-gray-50 mb-4">
          FOR COFFEE WE ARE WAITING
        </h2>
        <p className="text-lg text-gray-50">
          We would be happy to host you in our office so that you can have more
          detailed information about our projects.
        </p>
      </div>

      {/* Right Button Section */}
      <div className="md:w-1/3 flex justify-center md:justify-end">
        <a
          href="tel:+2347063314134"
          className="flex flex-col items-center bg-gradient-to-r from-blue-900 via-red-600 to-red-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <FaPhoneAlt className="text-3xl mb-2" />
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default CoffeeInviteSection;
