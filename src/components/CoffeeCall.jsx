
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const CoffeeInviteSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#091b2b] py-24 md:py-28">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-[#183f5c]/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-[#c69a55]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,transparent_45%,#ffffff_45%,#ffffff_46%,transparent_46%)] bg-[length:28px_28px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-2/3"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                Let's Connect
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              FOR COFFEE WE ARE{" "}
              <span className="text-[#c69a55]">WAITING</span>
            </h2>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
              We would be happy to host you in our office so that you can have more
              detailed information about our projects.
            </p>
          </motion.div>

          {/* Right Button Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full md:w-1/3 flex justify-center md:justify-end"
          >
            <a
              href="tel:+2347063314134"
              className="group flex flex-col items-center justify-center min-w-[190px] bg-[#c69a55] text-[#091b2b] px-9 py-7 rounded-2xl font-semibold shadow-xl shadow-black/20 hover:bg-white hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-14 h-14 rounded-full bg-[#091b2b]/10 flex items-center justify-center mb-4 group-hover:bg-[#091b2b]/5 transition-colors">
                <FaPhoneAlt className="text-2xl" />
              </span>

              <span className="text-lg font-bold">
                Contact Us
              </span>

              <span className="text-xs mt-2 opacity-75 tracking-wide">
                Speak with our team
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoffeeInviteSection;
