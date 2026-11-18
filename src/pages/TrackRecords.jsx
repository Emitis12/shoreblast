
import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import RecentProjects from "../components/RecentProjects";
import {
  FaChevronDown,
  FaTools,
  FaClipboardList,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import {
  ShieldCheck,
  Award,
  HardHat,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const PresentProject = () => (
  <div className="max-w-5xl mx-auto py-16 px-6">
    <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-10 md:p-16 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#10283f] flex items-center justify-center">
        <FaTools className="text-[#c69a55] text-2xl" />
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-[#10283f] mb-4">
        Present Project
      </h3>

      <p className="text-gray-500 leading-7 max-w-xl mx-auto">
        Details of the current ongoing project will appear here...
      </p>

      <div className="w-16 h-[3px] bg-[#c69a55] mx-auto mt-8" />
    </div>
  </div>
);

const TrackRecords = () => {
  const location = useLocation();

  const isPast = location.pathname.includes("past-projects");
  const isPresent = location.pathname.includes("present-projects");

  const achievements = [
    {
      icon: ShieldCheck,
      title: "Zero LTI",
      description: "Lost Time Incidents since inception.",
    },
    {
      icon: Award,
      title: "8+ Years",
      description: "Combined technical and engineering experience.",
    },
    {
      icon: HardHat,
      title: "Certified Manpower",
      description: "Qualified personnel for demanding operations.",
    },
    {
      icon: Truck,
      title: "Reliable Supply",
      description: "Procurement and delivery of critical oilfield materials.",
    },
  ];

  const trackRecordPoints = [
    "Zero LTI (Lost Time Incidents) since inception.",
    "Over 8 years combined technical and engineering experience in the oil & gas field operations.",
    "Worked with Fynefield Petroleum, Mettle Energy, Alkanes Petroleum, NNPC, Montego Upstream, DormanLong, UNICEM, ORYX Energy etc.",
    "Certified manpower pool (NUPRC, NMDPRA, NACE, HSE, Rig Pass, IWCF) etc.",
    "Execution of projects in both active storage facilities, refinery zones and live offshore environments.",
    "Reliable procurement and delivery network for critical oilfield equipment and consumables.",
  ];

  const projectLinkStyle = (active) =>
    `group flex items-center justify-between gap-5 px-6 py-4 rounded-xl border transition-all duration-300 ${
      active
        ? "bg-[#10283f] border-[#10283f] text-white shadow-lg"
        : "bg-white border-gray-200 text-[#10283f] hover:border-[#c69a55] hover:shadow-md"
    }`;

  return (
    <div className="w-full bg-[#f5f7f9] min-h-screen">

      {/* Hero / Page Header */}
      <section className="relative bg-[#091b2b] pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#183f5c]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c69a55]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">

          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-12 gap-3">
            <Link
              to="/"
              className="hover:text-[#c69a55] flex items-center gap-2 transition-colors"
            >
              <FaHome />
              Home
            </Link>

            <FaChevronRight className="text-xs text-gray-600" />

            <span className="text-white font-medium">
              Track Records
            </span>

            {isPast && (
              <>
                <FaChevronRight className="text-xs text-gray-600" />
                <span className="text-[#c69a55] font-semibold">
                  Past Projects
                </span>
              </>
            )}

            {isPresent && (
              <>
                <FaChevronRight className="text-xs text-gray-600" />
                <span className="text-[#c69a55] font-semibold">
                  Present Projects
                </span>
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                Experience & Performance
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Our Project{" "}
              <span className="text-[#c69a55]">Track Records</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-8 max-w-2xl">
              A record of technical expertise, operational reliability and
              engineering solutions delivered across Nigeria's oil and gas
              industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievement Highlights */}
      <section className="relative -mt-10 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-[#10283f] flex items-center justify-center">
                  <Icon size={23} className="text-[#c69a55]" />
                </div>

                <div>
                  <h3 className="text-[#10283f] font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* Project Navigation */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">

          <Link
            to="/track-records/past-projects"
            className={projectLinkStyle(isPast)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isPast ? "bg-white/10" : "bg-[#f5f7f9]"
              }`}>
                <FaTools className={`text-xl ${
                  isPast ? "text-[#c69a55]" : "text-[#10283f]"
                }`} />
              </div>

              <div>
                <span className={`block text-xs uppercase tracking-wider mb-1 ${
                  isPast ? "text-gray-400" : "text-gray-500"
                }`}>
                  Our Experience
                </span>
                <span className="font-bold text-lg">
                  Past Projects
                </span>
              </div>
            </div>

            <FaChevronDown className={`transition-transform duration-300 ${
              isPast ? "rotate-180 text-[#c69a55]" : "-rotate-90 text-gray-400"
            }`} />
          </Link>

          <Link
            to="/track-records/present-projects"
            className={projectLinkStyle(isPresent)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isPresent ? "bg-white/10" : "bg-[#f5f7f9]"
              }`}>
                <FaClipboardList className={`text-xl ${
                  isPresent ? "text-[#c69a55]" : "text-[#10283f]"
                }`} />
              </div>

              <div>
                <span className={`block text-xs uppercase tracking-wider mb-1 ${
                  isPresent ? "text-gray-400" : "text-gray-500"
                }`}>
                  Current Activities
                </span>
                <span className="font-bold text-lg">
                  Present Projects
                </span>
              </div>
            </div>

            <FaChevronDown className={`transition-transform duration-300 ${
              isPresent ? "rotate-180 text-[#c69a55]" : "-rotate-90 text-gray-400"
            }`} />
          </Link>

        </div>

        {/* Track Records Summary */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#c69a55]" />
              <span className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase">
                Our Capabilities
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#10283f] leading-tight mb-6">
              A Proven Record of{" "}
              <span className="text-[#c69a55]">Performance</span>
            </h2>

            <p className="text-gray-500 leading-8">
              Our experience is built on safety, technical competence,
              dependable execution and a strong understanding of the
              oil and gas operating environment.
            </p>

            <div className="mt-8 w-20 h-1 bg-[#c69a55]" />
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-7 md:p-10 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#10283f] mb-7 flex items-center gap-3">
              <FaClipboardList className="text-[#c69a55]" />
              Track Records
            </h3>

            <div className="space-y-6">
              {trackRecordPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-7 h-7 shrink-0 rounded-full bg-[#f5f7f9] flex items-center justify-center mt-1">
                    <CheckCircle2 size={16} className="text-[#c69a55]" />
                  </div>

                  <p className="text-gray-600 leading-7 text-sm md:text-base">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Nested Project Routes */}
      <section className="w-full pb-20">
        <Routes>
          <Route path="past-projects" element={<RecentProjects />} />
          <Route path="present-projects" element={<PresentProject />} />
        </Routes>
      </section>

    </div>
  );
};

export default TrackRecords;
