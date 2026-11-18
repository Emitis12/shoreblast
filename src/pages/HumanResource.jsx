
import React, { useState } from "react";
import {
  FaHardHat,
  FaFileUpload,
  FaTimes,
  FaArrowRight,
  FaUserTie,
  FaShieldAlt,
  FaCheckCircle,
  FaFilePdf,
  FaFileAlt,
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
  const [cvFile, setCvFile] = useState("");
  const [credentialFile, setCredentialFile] = useState("");

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob("");
    setCvFile("");
    setCredentialFile("");
  };

  return (
    <div className="w-full bg-[#f4f6f8]">
      {/* Careers Hero */}
      <section className="relative overflow-hidden bg-[#10283f] pt-36 pb-28 px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -right-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] border border-white rounded-full" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c69a55]/10 to-transparent" />
        </div>

        <div className="relative max-w-5xl pt-20 mx-auto text-center">
          <span className="inline-block text-[#d8b477] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-5">
            Careers at Shore Blast
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            CAREERS
          </h1>

          <div className="w-20 h-1 bg-[#c69a55] mx-auto rounded-full mb-7" />

          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-200">
            Join Our Team of Skilled Technicians & Innovators
          </p>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            We are always seeking professionals with integrity, technical
            skill, and a safety-first mindset.
          </p>
        </div>
      </section>

      {/* Careers Content */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#b68b4b] uppercase tracking-[0.2em] text-xs font-bold">
              Opportunities
            </span>

            <h2 className="text-2xl md:text-3xl font-bold text-[#10283f] mt-3">
              Explore Our Available Job Roles
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              We welcome qualified professionals who are ready to contribute
              their expertise to our industrial and technical operations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobRoles.map((role, index) => (
              <div
                key={index}
                className="group bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#c69a55]/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#10283f] text-[#d8b477] text-2xl group-hover:bg-[#c69a55] group-hover:text-[#10283f] transition-colors duration-300">
                    <FaHardHat />
                  </div>

                  <span className="text-sm font-bold text-gray-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#10283f] leading-relaxed">
                  {role}
                </h3>

                <div className="w-10 h-1 bg-[#c69a55] mt-6 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Application CTA */}
          <div className="mt-16 bg-[#10283f] rounded-3xl px-7 py-12 md:px-14 text-center relative overflow-hidden shadow-xl">
            <div className="absolute -top-24 -right-20 w-72 h-72 border border-white/10 rounded-full" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 border border-white/10 rounded-full" />

            <div className="relative">
              <FaUserTie className="text-[#d8b477] text-4xl mx-auto mb-5" />

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Join Our Team?
              </h2>

              <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Select your preferred job role and submit your application
                with the required documents for consideration.
              </p>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 bg-[#c69a55] hover:bg-[#d8b477] text-[#10283f] font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <FaFileUpload className="text-xl" />
                Submit Your CV
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-[#071522]/80 backdrop-blur-sm z-[100] flex items-center justify-center px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#10283f] px-6 py-7 sm:px-8 rounded-t-2xl relative">
              <button
                type="button"
                aria-label="Close application form"
                className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl transition"
                onClick={closeModal}
              >
                <FaTimes />
              </button>

              <span className="text-[#d8b477] text-xs font-bold uppercase tracking-[0.2em]">
                Careers & Recruitment
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-3 pr-8">
                {selectedJob || "Submit Your Application"}
              </h2>

              <p className="text-gray-300 text-sm mt-2">
                {selectedJob
                  ? "Complete the form and attach your supporting documents."
                  : "Choose the position you wish to apply for."}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {!selectedJob ? (
                <>
                  <h3 className="font-bold text-[#10283f] mb-4">
                    Select a Job Role
                  </h3>

                  <div className="space-y-3">
                    {jobRoles.map((job, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center justify-between gap-3 w-full text-left bg-gray-50 hover:bg-[#10283f] hover:text-white text-[#10283f] px-4 py-4 rounded-xl border border-gray-200 hover:border-[#10283f] transition-all duration-300 group"
                      >
                        <span className="font-medium text-sm sm:text-base">
                          {job}
                        </span>

                        <FaArrowRight className="text-[#c69a55] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <FaShieldAlt className="text-[#b68b4b]" />
                    Please provide accurate information.
                  </div>

                  <form
                    action="https://formspree.io/f/mgejgjjj"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-5"
                  >
                    <input
                      type="hidden"
                      name="Job Role"
                      value={selectedJob}
                    />

                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="Full Name"
                        required
                        placeholder="Your Full Name"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="Email"
                        required
                        placeholder="Your Email"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition"
                      />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Upload CV (PDF or DOC)
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-dashed border-gray-300 hover:border-[#c69a55] rounded-xl p-4 transition">
                        <FaFilePdf className="text-2xl text-[#b68b4b] shrink-0" />

                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#10283f]">
                            Choose CV
                          </span>

                          <span className="block text-xs text-gray-500 truncate">
                            {cvFile || "PDF, DOC or DOCX"}
                          </span>
                        </div>

                        <input
                          type="file"
                          name="CV"
                          accept=".pdf,.doc,.docx"
                          required
                          className="hidden"
                          onChange={(e) =>
                            setCvFile(e.target.files?.[0]?.name || "")
                          }
                        />
                      </label>
                    </div>

                    {/* Credentials Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Upload Credentials (PDF or Image)
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-dashed border-gray-300 hover:border-[#c69a55] rounded-xl p-4 transition">
                        <FaFileAlt className="text-2xl text-[#b68b4b] shrink-0" />

                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#10283f]">
                            Choose File
                          </span>

                          <span className="block text-xs text-gray-500 truncate">
                            {credentialFile || "PDF, JPG, JPEG or PNG"}
                          </span>
                        </div>

                        <input
                          type="file"
                          name="Credentials"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                          className="hidden"
                          onChange={(e) =>
                            setCredentialFile(
                              e.target.files?.[0]?.name || ""
                            )
                          }
                        />
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedJob("");
                          setCvFile("");
                          setCredentialFile("");
                        }}
                        className="sm:w-1/3 border border-gray-300 text-gray-700 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        className="sm:flex-1 bg-[#10283f] hover:bg-[#183f5c] text-white font-bold px-6 py-3 rounded-xl shadow transition-all duration-300"
                      >
                        <span className="inline-flex items-center justify-center gap-2">
                          <FaCheckCircle />
                          Submit Application
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanResource;
