import React from "react";
import proposal from "../images/proposal.jpg";

const ProposalFormSection = () => {
  return (
    <section id="proposal" className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={proposal}
            alt="Proposal Illustration"
            className="w-80 h-80 object-cover rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>

        {/* Form Section */}
        <form
          action="https://formspree.io/f/yourFormID" // Replace with your Formspree endpoint
          method="POST"
          className="w-full md:w-1/2 space-y-4  backdrop-blur-md p-8 rounded-xl shadow-md"
        >
          <h2 id="proposal" className="text-4xl font-bold mb-4 text-blue-500">Proposal</h2>

          {/* Name and Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name/Surname"
              required
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProposalFormSection;
