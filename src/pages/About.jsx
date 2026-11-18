
import React from "react";

import downstreamImage from "../images/downstream.jpeg";
import midstreamImage from "../images/midstream.jpg";
import offshoreImage from "../images/offshore.jpg";
import procurementImage from "../images/haulage.png";

// Import slick carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Documentation images
import doc1 from "../images/cac.png";
import doc2 from "../images/NUPRC.jpg";
import doc3 from "../images/Nmdpralogo.png";
import doc4 from "../images/hse.png";
import doc5 from "../images/image-1.webp";
import doc6 from "../images/Logo-ZuiBya77.svg";
import doc7 from "../images/doc7.jpeg";
import doc8 from "../images/doc8.jpeg";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

const About = () => {
  // Slider settings
  const docSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const coreValues = [
    {
      title: "EXCELLENCE",
      description:
        "We strive for the highest quality and precision in all our services, ensuring that we exceed client expectations and industry standards.",
    },
    {
      title: "INTEGRITY",
      description:
        "Our business practices are rooted in honesty, transparency, and ethical conduct. We are committed to building trust with our clients, partners, and communities.",
    },
    {
      title: "INNOVATION",
      description:
        "We embrace creativity and technological advancements, continuously seeking new ways to improve our services and stay ahead in the industry.",
    },
    {
      title: "SUSTAINABILITY",
      description:
        "We are dedicated to responsible and sustainable business practices, aiming to minimize our environmental impact and support the long-term well-being of the communities we serve.",
    },
    {
      title: "SAFETY",
      description:
        "The safety of our employees, clients, and stakeholders is paramount. We maintain rigorous safety protocols and foster a culture of safety in all our operations.",
    },
    {
      title: "CUSTOMER FOCUS",
      description:
        "We place our clients at the heart of everything we do, tailoring our services to meet their specific needs and delivering exceptional customer satisfaction.",
    },
    {
      title: "TEAMWORK",
      description:
        "We believe in the power of collaboration and respect within our team, encouraging diversity of thought and fostering a supportive and inclusive work environment.",
    },
    {
      title: "ACCOUNTABILITY",
      description:
        "We take responsibility for our actions and outcomes, maintaining transparency and accountability in all our business dealings and project deliveries.",
    },
    {
      title: "COMMUNITY ENGAGEMENT",
      description:
        "We are committed to giving back to the communities where we operate, supporting social initiatives, and contributing to economic and social development.",
    },
    {
      title: "CONTINUOUS IMPROVEMENT",
      description:
        "We are dedicated to ongoing learning and improvement, continually enhancing our skills, processes, and services to better serve our clients and achieve our mission.",
    },
  ];

  const services = [
    {
      number: "01",
      title: "Downstream Operations",
      image: downstreamImage,
      description:
        "Supporting refineries, terminals, and tank farms with critical services in:",
      items: [
        "Abrasive Blasting & Surface Preparation",
        "Protective Coating Application (Epoxy, PU, Bitumen, etc.)",
        "Storage tank and Pipeline Rehabilitation & Wrapping",
        "Shutdown Maintenance Support & Weld-Cut Prep",
        "Fabrication & Welding (Tanks, Skids, Platforms)",
        "Procurement & Supply of Industrial Materials, Coatings and Mechanical Tools",
      ],
    },
    {
      number: "02",
      title: "Midstream Operations",
      image: midstreamImage,
      reverse: true,
      description:
        "Ensuring continuity in pipeline and midstream infrastructure through:",
      items: [
        "ROW Pipeline Coating & Joint Protection",
        "Tank Fabrication, Surface Prep, and Coating",
        "Welding & Structural Repairs for Pump Stations and Skids",
        "Equipment Leasing: Compressors, Generators, Scaffolds, PPE",
        "Procurement & Supply of Materials for Midstream Projects",
      ],
    },
    {
      number: "03",
      title: "Offshore Operations",
      image: offshoreImage,
      description:
        "Licensed for offshore operations, delivering on platforms, rigs and FPSOs:",
      items: [
        "Offshore Blasting, Coating & Rope Access Work",
        "Tank & Vessel Internal Lining (Ballast, Potable Water, Cargo)",
        "Offshore Welding (Carbon Steel, Duplex, Stainless)",
        "Structural Fabrication of Handrails, Modules, Skids",
        "Manpower Supply & NUPRC-Compliant Operations",
        "Procurement & Delivery of Offshore-Spec Equipment and Materials",
      ],
    },
    {
      number: "04",
      title: "Procurement & Supply Chain Services",
      image: procurementImage,
      reverse: true,
      description:
        "We procure and supply a broad range of oil & gas materials, equipment and mechanical tools to operators, contractors and EPC firms. This includes:",
      items: [
        "Industrial paints & coatings (Jotun, International, Hempel, etc.)",
        "Abrasives: Garnet, Aluminum Oxide, Steel Grit, Slag",
        "Blasting and Coating Equipment",
        "PPE, HSE Gear, Welding Machines, Spray Systems.",
        "Heavy-Duty Equipment (Compressors, Generators, Forklifts)",
        "Pipeline Accessories, Valves, Fittings & Structural Materials",
      ],
      closing:
        "With strong OEM relationships and a reliable global supply chain, we ensure fast delivery, competitive pricing and full compliance.",
    },
  ];

  const documentation = [
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
  ];

  return (
    <div id="about" className="bg-white overflow-hidden">

      {/* ABOUT US */}
      <section className="relative bg-[#091b2b] py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#183f5c]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c69a55]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center pt-20 gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] uppercase tracking-[0.25em] text-xs font-bold">
                Who We Are
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              About <span className="text-[#c69a55]">Us</span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-9">
              At SHORE BLAST & COATING AND TECHNICAL SERVICES LTD, we deliver
              specialized technical and industrial solutions across the Downstream,
              Midstream and Upstream sectors of Nigeria’s oil and gas industry. Our
              focus is on asset integrity, corrosion protection, structural
              reliability and operational efficiency with integrated support in
              equipment procurement and supply. Headquartered in Calabar, Nigeria,
              and actively operating across the Niger Delta and offshore fields, we
              provide services that protect assets, reduce downtime, and enhance
              operational performance for major players in Nigeria’s oil and gas
              value chain. Our operational excellence is built on over a decade of
              field experience, robust safety culture, skilled workforce and a
              strategic understanding of Nigeria’s industrial terrain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="py-24 px-6 bg-[#f5f7f9]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-[#10283f] flex items-center justify-center mb-7">
              <Target className="text-[#c69a55]" size={28} />
            </div>

            <span className="text-[#c69a55] text-xs font-bold tracking-[0.2em] uppercase">
              Our Purpose
            </span>

            <h2 className="text-3xl font-bold text-[#10283f] mt-3 mb-5">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              Our mission is to deliver superior technical and engineering services
              that drive Nigeria's industrial growth and economic diversification.
              We are dedicated to providing comprehensive solutions in oil and gas,
              energy, and infrastructure through excellence in Blasting and
              Coating, Integrity test, logistics, scaffolding, and various other
              services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#10283f] p-8 md:p-10 rounded-2xl shadow-xl text-white relative overflow-hidden"
          >
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border-[25px] border-white/5" />

            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-[#c69a55] flex items-center justify-center mb-7">
                <Eye className="text-[#10283f]" size={28} />
              </div>

              <span className="text-[#c69a55] text-xs font-bold tracking-[0.2em] uppercase">
                Our Aspiration
              </span>

              <h2 className="text-3xl font-bold mt-3 mb-5">
                Our Vision
              </h2>

              <p className="text-gray-300 leading-8">
                Our vision is to become a leading conglomerate in Nigeria and beyond,
                renowned for excellence in technical and engineering services across
                diverse sectors. We aim to pioneer advancements in the oil and gas
                industry, transforming into a top-tier Engineering, Procurement,
                Construction, and Installation (EPCI) company. Our vision includes
                becoming a key player in energy supply, contributing to sustainable
                energy solutions, and diversifying into agriculture to support
                economic growth and development. Through innovation, quality, and
                integrity, we aspire to drive industrial growth, enhance
                infrastructure, and foster a prosperous future for our clients, our
                community, and our country.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                What Guides Us
              </span>
              <span className="w-10 h-[2px] bg-[#c69a55]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10283f] mb-5">
              Our Core Values
            </h2>

            <p className="text-gray-500 leading-7">
              The principles that define our culture, guide our decisions and shape
              the quality of our service delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (index % 5) * 0.07 }}
                className="group bg-[#f5f7f9] border border-gray-100 rounded-xl p-6 hover:bg-[#10283f] hover:border-[#10283f] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="w-11 h-11 rounded-lg bg-[#10283f] group-hover:bg-[#c69a55] flex items-center justify-center transition-colors">
                    <Award className="text-[#c69a55] group-hover:text-[#10283f]" size={22} />
                  </div>

                  <span className="text-3xl font-bold text-gray-200 group-hover:text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#10283f] group-hover:text-[#c69a55] mb-4 tracking-wide">
                  {value.title}
                </h3>

                <p className="text-sm text-gray-600 group-hover:text-gray-300 leading-7 transition-colors">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-24 px-6 bg-[#f5f7f9]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                Our Expertise
              </span>
              <span className="w-10 h-[2px] bg-[#c69a55]" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10283f] mb-5">
              Our Services
            </h2>

            <p className="text-gray-500 leading-7">
              Delivering specialized technical and industrial solutions across
              the oil and gas value chain.
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${service.reverse ? "md:order-2" : ""} relative min-h-[280px] md:min-h-[500px] overflow-hidden`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#091b2b]/60 via-transparent to-transparent" />

                  <span className="absolute bottom-6 left-6 text-white text-5xl font-bold opacity-80">
                    {service.number}
                  </span>
                </div>

                <div className={`${service.reverse ? "md:order-1" : ""} p-7 md:p-10 lg:p-12 flex flex-col justify-center`}>
                  <div className="w-12 h-[3px] bg-[#c69a55] mb-6" />

                  <h3 className="text-2xl md:text-3xl font-bold text-[#10283f] mb-5">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-gray-600 text-sm leading-6"
                      >
                        <CheckCircle2
                          size={17}
                          className="text-[#c69a55] shrink-0 mt-1"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {service.closing && (
                    <p className="text-gray-600 text-sm leading-7 mt-6 pt-5 border-t border-gray-100">
                      {service.closing}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* LICENCES AND ACCREDITATION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Documentation Information */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-[2px] bg-[#c69a55]" />
                <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                  Compliance & Standards
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#10283f] mb-7">
                Licences And Accreditation
              </h2>

              <p className="text-gray-600 leading-8 mb-7">
                We operate with full legal compliance under Nigerian corporate and oil
                & gas regulations.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Corporate Affairs Commission (CAC)",
                  "Offshore Contractor License",
                  "NUPRC | NMDPRA License",
                  "Tax Identification Number (TIN)",
                  "HSE Policy & Safety Statement",
                  "TDS, MSDS, and Coating Specs – Available per project",
                  "Employees Insurance Policy etc.",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <div className="w-7 h-7 rounded-full bg-[#f5f7f9] flex items-center justify-center shrink-0">
                      <FileCheck2 size={15} className="text-[#c69a55]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#10283f] p-6 rounded-xl text-white">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="text-[#c69a55]" size={25} />
                  <h3 className="font-semibold text-lg">
                    Documentation & Due Diligence
                  </h3>
                </div>

                <p className="text-gray-300 text-sm leading-7">
                  Documentation available upon request or for due diligence purposes. Our
                  company’s profile is attached and downloadable here (attached file).
                </p>
              </div>
            </div>

            {/* Documentation Carousel */}
            <div className="bg-[#f5f7f9] rounded-2xl p-5 md:p-8">
              <h3 className="text-xl font-bold text-[#10283f] mb-2">
                Our Certifications & Documents
              </h3>

              <p className="text-sm text-gray-500 mb-8">
                A selection of our corporate and operational documentation.
              </p>

              <Slider {...docSettings}>
                {documentation.map((doc, idx) => (
                  <div key={idx} className="px-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center h-64 p-4">
                      <img
                        src={doc}
                        alt={`Document ${idx + 1}`}
                        className="max-h-56 max-w-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
