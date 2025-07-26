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

const PresentProject = () => (
  <div className="bg-red-400 border border-gray-900 p-10 rounded-xl text-center">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Present Project</h3>
    <p className="text-gray-900">Details of the current ongoing project will appear here...</p>
  </div>
);

const TrackRecords = () => {
  const location = useLocation();
  const isPast = location.pathname.includes("past-projects");
  const isPresent = location.pathname.includes("present-projects");

  return (
    <div className="w-full bg-gray-400 py-16">
      <div className="flex flex-col items-center px-4 text-center max-w-4xl mx-auto">

        {/* Breadcrumbs */}
        <div className="pt-40 flex items-center text-sm text-gray-700 mb-6 gap-2 self-start">
          <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
            <FaHome />
            Home
          </Link>
          <FaChevronRight />
          <span className="text-gray-900 font-medium">Track Records</span>
          {isPast && (
            <>
              <FaChevronRight />
              <span className="text-blue-800 font-semibold">Past Projects</span>
            </>
          )}
          {isPresent && (
            <>
              <FaChevronRight />
              <span className="text-blue-800 font-semibold">Present Projects</span>
            </>
          )}
        </div>

        {/* Main Heading */}
        <h2 className="pt-20 text-3xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          <FaTools className="text-2xl" /> PROJECTS
        </h2>

        {/* Project Type Links */}
        <div className="flex gap-6 mb-10">
          <Link
            to="/track-records/past-projects"
            className={`text-lg font-medium border-b-2 transition duration-300 flex items-center gap-2 ${
              isPast
                ? "border-red-600 text-blue-900"
                : "border-transparent hover:border-blue-900 hover:text-blue-900"
            }`}
          >
            Past Projects
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isPast ? "rotate-180 text-blue-700" : "rotate-0"
              }`}
            />
          </Link>

          <Link
            to="/track-records/present-projects"
            className={`text-lg font-medium border-b-2 transition duration-300 flex items-center gap-2 ${
              isPresent
                ? "border-blue-600 text-blue-600"
                : "border-transparent hover:border-blue-400 hover:text-blue-400"
            }`}
          >
            Present Projects
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isPresent ? "rotate-180 text-blue-700" : "rotate-0"
              }`}
            />
          </Link>
        </div>

        {/* Track Records Summary */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
          <FaClipboardList className="text-xl" /> Track Records
        </h2>
        <p className="text-gray-700 max-w-2xl mb-10 leading-relaxed">
          Zero LTI (Lost Time Incidents) since inception. <br />
          Over 8 years combined technical and engineering experience in the oil & gas field operations. <br />
          Worked with Fynefield Petroleum, Mettle Energy, Alkanes Petroleum, NNPC, Montego Upstream, DormanLong, UNICEM, ORYX Energy etc. <br />
          Certified manpower pool (NUPRC, NMDPRA, NACE, HSE, Rig Pass, IWCF) etc. <br />
          Execution of projects in both active storage facilities, refinery zones and live offshore environments. <br />
          Reliable procurement and delivery network for critical oilfield equipment and consumables.
        </p>
      </div>

      {/* Full-width outlet area for nested routing */}
      <div className="w-full px-4">
        <Routes>
          <Route path="past-projects" element={<RecentProjects />} />
          <Route path="present-projects" element={<PresentProject />} />
        </Routes>
      </div>
    </div>
  );
};

export default TrackRecords;
