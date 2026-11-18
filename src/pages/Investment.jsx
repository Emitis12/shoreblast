
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaShieldAlt,
  FaEye,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBalanceScale,
  FaArrowRight,
} from "react-icons/fa";

const investmentBenefits = [
  {
    icon: FaHandshake,
    title: "Secured Agreement & MoU",
    description: "Legal framework in place to protect all investors.",
  },
  {
    icon: FaEye,
    title: "Project Verification Access",
    description: "Verify ongoing projects and contracts directly.",
  },
  {
    icon: FaShieldAlt,
    title: "Transparent Payment Cycle",
    description: "Track the invoice cycle and expected returns.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Site Visit Availability",
    description: "Physical access to project locations on request.",
  },
  {
    icon: FaBalanceScale,
    title: "Staggered Draw-downs",
    description: "Risk mitigation through controlled fund disbursement.",
  },
];

const Investment = () => {
  return (
    <div className="w-full bg-[#f4f6f8]">
      {/* Investment Hero */}
      <section className="relative overflow-hidden bg-[#10283f] pt-36 pb-28 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute -bottom-48 -left-20 w-[500px] h-[500px] border border-white rounded-full" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c69a55]/10 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block pt-20 text-[#d8b477] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-5">
              Partnership & Growth
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              INVESTMENT
              <span className="block text-[#d8b477]">OPPORTUNITY</span>
            </h1>

            <div className="w-20 h-1 bg-[#c69a55] mx-auto mb-7 rounded-full" />

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-200">
              Now Open to Strategic Investment Partners
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investment Introduction */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#b68b4b] uppercase tracking-[0.2em] text-xs font-bold">
              Strategic Investment
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-[#10283f] mt-3 mb-7">
              Building Opportunities Through Industrial Excellence
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-8 max-w-4xl mx-auto">
              <span className="font-bold text-[#10283f]">
                SHORE BLAST & COATING AND TECHNICAL SERVICES LTD
              </span>{" "}
              offers a secure and high-yield investment opportunity tied to
              active projects with verified invoice cycles.
            </p>
          </motion.div>

          {/* Why Invest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-8 md:py-10"
          >
            <FaCheckCircle className="text-[#b68b4b] text-3xl mx-auto mb-4" />

            <h3 className="text-2xl md:text-3xl font-bold text-[#10283f] mb-3">
              Why Invest With Us?
            </h3>

            <p className="text-gray-700 text-base md:text-lg">
              We are{" "}
              <span className="font-bold text-[#10283f]">
                Trusted, Transparent and Reliable.
              </span>
            </p>

            <div className="w-16 h-1 bg-[#c69a55] mx-auto mt-6 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#b68b4b] uppercase tracking-[0.2em] text-xs font-bold">
              Investor Benefits
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-[#10283f] mt-3">
              A Transparent Investment Framework
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Our investment framework emphasizes transparency, verification,
              structured agreements and controlled project funding.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentBenefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -7 }}
                  className="group bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#c69a55]/60 transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#10283f] text-[#d8b477] text-2xl mb-6 group-hover:bg-[#c69a55] group-hover:text-[#10283f] transition-colors duration-300">
                    <Icon />
                  </div>

                  <h3 className="font-bold text-lg text-[#10283f] mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  <div className="w-10 h-1 bg-[#c69a55] mt-6 rounded-full group-hover:w-16 transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Enquiry CTA */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden max-w-6xl mx-auto bg-[#10283f] rounded-3xl px-7 py-14 md:px-16 md:py-16 text-center shadow-xl"
        >
          <div className="absolute -top-24 -right-20 w-72 h-72 border border-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 border border-white/10 rounded-full" />

          <div className="relative">
            <span className="text-[#d8b477] uppercase tracking-[0.2em] text-xs font-bold">
              Let's Build Together
            </span>

            <h2 className="text-2xl md:text-4xl font-bold text-white mt-4 mb-5">
              Interested in Our Investment Opportunity?
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-9">
              Contact our team to request an investment brief and discuss
              potential strategic partnership opportunities.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#c69a55] hover:bg-[#d8b477] text-[#10283f] text-base md:text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us to Request an Investment Brief
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Investment;
