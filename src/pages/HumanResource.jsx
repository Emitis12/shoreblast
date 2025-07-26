import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaTools,
  FaHardHat,
  FaPaintRoller,
  FaClipboardList,
  FaFileUpload,
  FaTimes,
} from "react-icons/fa";

const jobRoles = [
  "Industrial Blasters & Painters",
  "Fabricators & Welders",
  "Offshore-certified Riggers and Technicians",
  "NACE/SSPC Coating Inspectors",
  "HSE Officers (Level 1–3 Certified)",
  "Project Engineers and Site Coordinators",
];

const HumanResource = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  return (
    <div className="pt-60 w-full bg-gray-400 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">CAREERS</h1>
        <p className="text-lg text-gray-700 mb-10">
          Join Our Team of Skilled Technicians & Innovators
        </p>
        <p className="text-base text-gray-600 mb-10 max-w-3xl mx-auto">
          We are always seeking professionals with integrity, technical skill, and a safety-first mindset.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-left text-gray-800 mb-14">
          {jobRoles.map((role, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow flex items-start gap-4 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-gray-50"
            >
              <FaHardHat className="text-blue-700 text-2xl mt-1" />
              <p className="font-medium">{role}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-900 text-white font-semibold text-lg px-8 py-4 rounded-full shadow transition duration-300"
          >
            <FaFileUpload className="text-xl" />
            Submit Your CV
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
              onClick={() => {
                setShowModal(false);
                setSelectedJob("");
              }}
            >
              <FaTimes />
            </button>

            {!selectedJob ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-blue-800">Select a Job Role</h2>
                <div className="space-y-3">
                  {jobRoles.map((job, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedJob(job)}
                      className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-2 rounded shadow"
                    >
                      {job}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-blue-800">{selectedJob}</h2>
                <form
                  action="https://formspree.io/f/mgejgjjj"
                  method="POST"
                  encType="multipart/form-data"
                  className="space-y-4"
                >
                  <input type="hidden" name="Job Role" value={selectedJob} />
                  <input
                    type="text"
                    name="Full Name"
                    required
                    placeholder="Your Full Name"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="email"
                    name="Email"
                    required
                    placeholder="Your Email"
                    className="w-full border p-2 rounded"
                  />

                  <div>
                    <label className="block mb-1 font-semibold">Upload CV (PDF or DOC)</label>
                    <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                      Choose CV
                      <input
                        type="file"
                        name="CV"
                        accept=".pdf,.doc,.docx"
                        required
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Upload Credentials (PDF or Image)</label>
                    <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                      Choose File
                      <input
                        type="file"
                        name="Credentials"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-900"
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanResource;
