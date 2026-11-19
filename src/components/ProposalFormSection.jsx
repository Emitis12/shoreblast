
import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import proposal from "../images/proposal.jpg";

const ProposalFormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const enquiry = {
      name: formData.get("name")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "submit-enquiry",
        {
          body: enquiry,
        }
      );

      if (error) {
        throw new Error(
          error.message || "Unable to submit your proposal."
        );
      }

      if (!data?.success) {
        throw new Error(
          data?.error || "Your proposal could not be submitted."
        );
      }

      form.reset();

      setSuccessMessage(
        "Thank you! Your proposal enquiry has been submitted successfully. Our team will get in touch with you."
      );
    } catch (error) {
      console.error("Proposal submission error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f7f9] py-20 md:py-28 px-5 md:px-8">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section introduction */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-amber-500" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Let's Work Together
            </span>
            <span className="w-10 h-[2px] bg-amber-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#10283f]">
            Request a Proposal
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 leading-7">
            Tell us about your project or service requirements. Our team is
            ready to discuss reliable technical and industrial solutions
            tailored to your operational needs.
          </p>

          <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image section */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 md:w-[420px] md:h-[420px] border-2 border-amber-400/50 rounded-full" />

            <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] p-3 rounded-full bg-white shadow-2xl">
              <img
                src={proposal}
                alt="Proposal Illustration"
                className="w-full h-full object-cover rounded-full"
              />

              <div className="absolute bottom-5 right-0 md:bottom-10 md:-right-5 bg-[#10283f] text-white px-5 py-4 md:px-7 md:py-5 rounded-xl shadow-xl border-l-4 border-amber-500">
                <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                  ShoreBlast
                </p>
                <p className="text-sm md:text-base font-semibold">
                  Engineering Excellence
                </p>
              </div>
            </div>
          </div>

          {/* Form section */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 space-y-6"
            >
              <div className="mb-2">
                <h3
                  id="proposal"
                  className="text-2xl md:text-3xl font-extrabold text-[#10283f]"
                >
                  Submit Your Proposal
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Complete the form below and we'll get in touch.
                </p>
              </div>

              {/* Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="proposal-name"
                    className="block text-sm font-semibold text-[#10283f] mb-2"
                  >
                    Name / Surname
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="proposal-name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      maxLength={120}
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="proposal-phone"
                    className="block text-sm font-semibold text-[#10283f] mb-2"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="proposal-phone"
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      maxLength={40}
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="proposal-email"
                  className="block text-sm font-semibold text-[#10283f] mb-2"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="proposal-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="proposal-message"
                  className="block text-sm font-semibold text-[#10283f] mb-2"
                >
                  Your Message
                </label>

                <div className="relative">
                  <MessageSquare
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <textarea
                    id="proposal-message"
                    name="message"
                    placeholder="Tell us about your project or service requirements..."
                    rows={5}
                    maxLength={5000}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-400 outline-none resize-y transition-all duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:bg-white"
                  />
                </div>
              </div>

              {/* Submission feedback */}
              {successMessage && (
                <div
                  role="status"
                  className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm"
                >
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-[#10283f] hover:bg-amber-500 text-white hover:text-[#10283f] font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}

                {!isSubmitting && (
                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                We appreciate your interest in ShoreBlast's services.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalFormSection;
