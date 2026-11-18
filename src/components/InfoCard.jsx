
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logovi from "../images/logovi.gif";

const InfoCard = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-28 h-28 border-t-4 border-l-4 border-amber-500 rounded-tl-3xl" />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
              <img
                src={logovi}
                alt="Shore Blast industrial operations"
                className="w-full h-[320px] md:h-[460px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#091b2b]/20 to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b-4 border-r-4 border-amber-500 rounded-br-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative lg:pl-4"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-amber-500" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-amber-600">
                Who We Are
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#10283f] leading-tight mb-7">
              ABOUT <span className="text-amber-600">SHOREBLAST</span>
            </h2>

            <div className="space-y-5 text-gray-600 text-base md:text-[17px] leading-8">
              <p>
                At{" "}
                <span className="font-bold text-[#10283f]">
                  SHORE BLAST & COATING AND TECHNICAL SERVICES LTD
                </span>{" "}
                we deliver specialized technical and industrial solutions
                across the Downstream, Midstream and Upstream sectors of
                Nigeria’s oil and gas industry. Our focus is on asset integrity,
                corrosion protection, structural reliability and operational
                efficiency with integrated support in equipment procurement
                and supply.
              </p>

              <p>
                Headquartered in Calabar, Nigeria, and actively operating
                across the Niger Delta and offshore fields, we provide services
                that protect assets, reduce downtime, and enhance operational
                performance for major players in Nigeria’s oil and gas value
                chain.
              </p>

              <p>
                Our operational excellence is built on over a decade of field
                experience, robust safety culture, skilled workforce and a
                strategic understanding of Nigeria’s industrial terrain.
              </p>
            </div>

            <div className="mt-9">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center gap-3 bg-[#10283f] hover:bg-amber-600 text-white font-semibold px-7 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Find Out More
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InfoCard;
