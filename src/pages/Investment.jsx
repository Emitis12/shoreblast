import React from "react";
import { Link } from "react-router-dom";
import {
  FaHandshake,
  FaShieldAlt,
  FaEye,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBalanceScale,
} from "react-icons/fa";

const Investment = () => {
  return (
    <div className="w-full bg-gray-400 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="pt-40 text-4xl font-extrabold text-blue-900 mb-4">
          INVESTMENT OPPORTUNITY
        </h1>
        <p className="text-xl font-medium text-gray-800 mb-10">
          Now Open to Strategic Investment Partners
        </p>

        <p className="text-lg text-gray-900 leading-relaxed max-w-3xl mx-auto mb-12">
          <span className="font-semibold text-blue-900">
            SHORE BLAST & COATING AND TECHNICAL SERVICES LTD
          </span>{" "}
          offers a secure and high-yield investment opportunity tied to active
          projects with verified invoice cycles.
        </p>

        <div className="mb-14">
          <p className="text-2xl font-semibold text-green-700 inline-flex items-center gap-2 justify-center">
            <FaCheckCircle className="text-green-600" /> Why Invest:
            <span className="ml-2 text-black font-bold">
              We are trusted, Transparent and Reliable.
            </span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left text-gray-800">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-blue-700 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Secured Agreement & MoU
            </h3>
            <p className="text-sm">
              Legal framework in place to protect all investors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaEye className="text-blue-700 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Project Verification Access
            </h3>
            <p className="text-sm">
              Verify ongoing projects and contracts directly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-blue-700 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Transparent Payment Cycle
            </h3>
            <p className="text-sm">
              Track the invoice cycle and expected returns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-blue-700 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Site Visit Availability
            </h3>
            <p className="text-sm">
              Physical access to project locations on request.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaBalanceScale className="text-blue-700 text-3xl mb-3" />
            <h3 className="font-semibold text-lg mb-1">
              Staggered Draw-downs
            </h3>
            <p className="text-sm">
              Risk mitigation through controlled fund disbursement.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Link
            to="/contact"
            className="inline-block bg-blue-700 hover:bg-blue-900 text-white text-lg font-semibold px-8 py-4 rounded-full shadow transition duration-300"
          >
            Contact Us to Request an Investment Brief
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Investment;
