
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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const HumanResource = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [cvFile, setCvFile] = useState("");
  const [credentialFile, setCredentialFile] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    if (isSubmitting) return;

    setShowModal(false);
    setSelectedJob("");
    setCvFile("");
    setCredentialFile("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setErrorMessage("");
    setSuccessMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const jobRole = String(formData.get("jobRole") || "").trim();

    const cv = formData.get("cv");
    const credentials = formData.get("credentials");

    if (!fullName || !email || !jobRole) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!(cv instanceof File) || !(credentials instanceof File)) {
      setErrorMessage("Please upload your CV and credentials.");
      return;
    }

    if (cv.size > MAX_FILE_SIZE || credentials.size > MAX_FILE_SIZE) {
      setErrorMessage("Each document must not exceed 5 MB.");
      return;
    }

    if (cv.size === 0 || credentials.size === 0) {
      setErrorMessage("Please select valid documents.");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setErrorMessage(
        "Application service is currently unavailable. Please try again later."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/submit-job-application`,
        {
          method: "POST",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: formData,
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an unexpected response. Please try again."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to submit your application. Please try again."
        );
      }

      setSuccessMessage(
        "Your application has been submitted successfully. Thank you for your interest in joining Shore Blast Energy."
      );

      setErrorMessage("");
      setCvFile("");
      setCredentialFile("");
      form.reset();
    } catch (error) {
      console.error("Career application submission error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong while submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                onClick={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                  setShowModal(true);
                }}
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
          onClick={() => {
            if (!isSubmitting) closeModal();
          }}
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
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
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
                        onClick={() => {
                          setSelectedJob(job);
                          setErrorMessage("");
                        }}
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
              ) : successMessage ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-5" />

                  <h3 className="text-xl font-bold text-[#10283f] mb-3">
                    Application Submitted!
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-7">
                    {successMessage}
                  </p>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-[#10283f] hover:bg-[#183f5c] text-white font-bold px-8 py-3 rounded-xl transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <FaShieldAlt className="text-[#b68b4b]" />
                    Please provide accurate information.
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <input
                      type="hidden"
                      name="jobRole"
                      value={selectedJob}
                    />

                    <div>
                      <label
                        htmlFor="career-full-name"
                        className="block text-sm font-semibold text-[#10283f] mb-2"
                      >
                        Full Name
                      </label>

                      <input
                        id="career-full-name"
                        type="text"
                        name="fullName"
                        required
                        maxLength={150}
                        placeholder="Your Full Name"
                        disabled={isSubmitting}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="career-email"
                        className="block text-sm font-semibold text-[#10283f] mb-2"
                      >
                        Email Address
                      </label>

                      <input
                        id="career-email"
                        type="email"
                        name="email"
                        required
                        maxLength={254}
                        placeholder="Your Email"
                        disabled={isSubmitting}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/20 transition disabled:bg-gray-100"
                      />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Upload CV (PDF or DOC)
                      </label>

                      <label className={`flex items-center gap-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 transition ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:border-[#c69a55]"
                      }`}>
                        <FaFilePdf className="text-2xl text-[#b68b4b] shrink-0" />

                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#10283f]">
                            Choose CV
                          </span>

                          <span className="block text-xs text-gray-500 truncate">
                            {cvFile || "PDF, DOC or DOCX — Maximum 5 MB"}
                          </span>
                        </div>

                        <input
                          type="file"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          required
                          disabled={isSubmitting}
                          className="hidden"
                          onChange={(e) => {
                            setCvFile(e.target.files?.[0]?.name || "");
                            setErrorMessage("");
                          }}
                        />
                      </label>
                    </div>

                    {/* Credentials Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-[#10283f] mb-2">
                        Upload Credentials (PDF or Image)
                      </label>

                      <label className={`flex items-center gap-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 transition ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:border-[#c69a55]"
                      }`}>
                        <FaFileAlt className="text-2xl text-[#b68b4b] shrink-0" />

                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#10283f]">
                            Choose File
                          </span>

                          <span className="block text-xs text-gray-500 truncate">
                            {credentialFile ||
                              "PDF, JPG, JPEG or PNG — Maximum 5 MB"}
                          </span>
                        </div>

                        <input
                          type="file"
                          name="credentials"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                          disabled={isSubmitting}
                          className="hidden"
                          onChange={(e) => {
                            setCredentialFile(
                              e.target.files?.[0]?.name || ""
                            );
                            setErrorMessage("");
                          }}
                        />
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          setSelectedJob("");
                          setCvFile("");
                          setCredentialFile("");
                          setErrorMessage("");
                        }}
                        className="sm:w-1/3 border border-gray-300 text-gray-700 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="sm:flex-1 bg-[#10283f] hover:bg-[#183f5c] text-white font-bold px-6 py-3 rounded-xl shadow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <span className="inline-flex items-center justify-center gap-2">
                          <FaCheckCircle />
                          {isSubmitting
                            ? "Submitting Application..."
                            : "Submit Application"}
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
