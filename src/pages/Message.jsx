
import React from "react";
import { motion } from "framer-motion";
import ceoImage from "../images/message.png";

const MessageFromCEO = () => {
  return (
    <div className="w-full bg-[#f4f6f8]">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-[#10283f] pt-36 pb-24 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] border border-white rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto text-center"
        >
          <span className="inline-block text-[#d8b477] pt-20 uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-5">
            Leadership & Vision
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Message from the CEO
          </h1>

          <div className="w-20 h-1 bg-[#c69a55] mx-auto rounded-full" />

          <p className="text-gray-300 text-base sm:text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
            A message from the leadership of Shore Blast & Coating and
            Technical Services Ltd.
          </p>
        </motion.div>
      </section>

      {/* CEO Message Image */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-2xl p-3 sm:p-5 md:p-7 shadow-xl border border-gray-200"
          >
            <div className="absolute top-0 left-8 sm:left-12 w-20 h-1 bg-[#c69a55] rounded-b-full" />

            <img
              src={ceoImage}
              alt="CEO Portrait"
              className="block w-full max-w-3xl mx-auto rounded-xl shadow-lg border border-gray-200 object-contain"
            />

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-px bg-[#c69a55]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#10283f]">
                Office of the Chief Executive Officer
              </span>
              <div className="w-10 h-px bg-[#c69a55]" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MessageFromCEO;
