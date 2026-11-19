
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Search,
  RefreshCw,
  FileText,
  Download,
  Mail,
  CalendarDays,
  UserRound,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
  Save,
  Eye,
  FileUser,
  AlertCircle,
} from "lucide-react";

const statuses = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
];

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewing: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  hired: "bg-green-50 text-green-700 border-green-200",
};

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CareerApplicationsManagement = ({ onDataChanged }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openingDocument, setOpeningDocument] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("new");
  const [adminNotes, setAdminNotes] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchApplications = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setErrorMessage("");

    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(
          "id, full_name, email, job_role, cv_path, credentials_path, status, admin_notes, created_at, updated_at"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      setApplications(data || []);

      if (selectedApplication) {
        const updatedSelected = (data || []).find(
          (item) => item.id === selectedApplication.id
        );

        if (updatedSelected) {
          setSelectedApplication(updatedSelected);
          setSelectedStatus(updatedSelected.status || "new");
          setAdminNotes(updatedSelected.admin_notes || "");
        } else {
          setSelectedApplication(null);
        }
      }
    } catch (error) {
      console.error("Career applications fetch error:", error);
      setErrorMessage(
        error.message || "Unable to load career applications."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // Initial fetch only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        application.full_name?.toLowerCase().includes(search) ||
        application.email?.toLowerCase().includes(search) ||
        application.job_role?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: applications.length,
      new: applications.filter((item) => item.status === "new").length,
      reviewing: applications.filter(
        (item) => item.status === "reviewing"
      ).length,
      shortlisted: applications.filter(
        (item) => item.status === "shortlisted"
      ).length,
      hired: applications.filter((item) => item.status === "hired").length,
    };
  }, [applications]);

  const openApplication = (application) => {
    setSelectedApplication(application);
    setSelectedStatus(application.status || "new");
    setAdminNotes(application.admin_notes || "");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const closeApplication = () => {
    if (saving || openingDocument) return;

    setSelectedApplication(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const saveApplication = async () => {
    if (!selectedApplication || saving) return;

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await supabase
        .from("job_applications")
        .update({
          status: selectedStatus,
          admin_notes: adminNotes.trim() || null,
        })
        .eq("id", selectedApplication.id)
        .select(
          "id, full_name, email, job_role, cv_path, credentials_path, status, admin_notes, created_at, updated_at"
        )
        .single();

      if (error) throw error;

      setApplications((current) =>
        current.map((item) =>
          item.id === data.id ? data : item
        )
      );

      setSelectedApplication(data);
      setSelectedStatus(data.status);
      setAdminNotes(data.admin_notes || "");
      setSuccessMessage("Application details updated successfully.");

      onDataChanged?.();
    } catch (error) {
      console.error("Career application update error:", error);
      setErrorMessage(
        error.message || "Unable to update this application."
      );
    } finally {
      setSaving(false);
    }
  };

  const openDocument = async (path, documentType) => {
    if (!path || openingDocument) return;

    // Open a blank tab synchronously to avoid browser popup blocking.
    const newWindow = window.open("about:blank", "_blank");

    if (!newWindow) {
      setErrorMessage(
        "Your browser blocked the document window. Please allow pop-ups for this website and try again."
      );
      return;
    }

    newWindow.opener = null;

    setOpeningDocument(documentType);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.storage
        .from("career-documents")
        .createSignedUrl(path, 300);

      if (error) throw error;

      if (!data?.signedUrl) {
        throw new Error("Unable to generate a secure document link.");
      }

      newWindow.location.href = data.signedUrl;
    } catch (error) {
      newWindow.close();

      console.error("Career document access error:", error);
      setErrorMessage(
        error.message || "Unable to open this document."
      );
    } finally {
      setOpeningDocument("");
    }
  };

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold mt-2 text-[#10283f]">
            {value}
          </p>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-7">
      {/* Page Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#b68b4b]">
            Recruitment Management
          </p>

          <h2 className="text-2xl font-bold text-[#10283f] mt-2">
            Career Applications
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Review applicants, manage recruitment progress and access
            submitted documents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchApplications(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 bg-[#10283f] hover:bg-[#183f5c] text-white px-5 py-3 rounded-xl text-sm font-semibold transition disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh Applications
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm"
        >
          <AlertCircle size={19} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && !selectedApplication && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
          {successMessage}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard
          label="Total Applications"
          value={counts.total}
          icon={FileUser}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          label="New"
          value={counts.new}
          icon={Clock3}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          label="Reviewing"
          value={counts.reviewing}
          icon={Eye}
          color="bg-purple-50 text-purple-600"
        />

        <StatCard
          label="Shortlisted"
          value={counts.shortlisted}
          icon={CheckCircle2}
          color="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          label="Hired"
          value={counts.hired}
          icon={CheckCircle2}
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Applications List */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#10283f]">
                Submitted Applications
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                {filteredApplications.length} application(s) found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search applicants..."
                  className="w-full sm:w-64 pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#c69a55]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#c69a55] bg-white"
              >
                <option value="all">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              size={32}
              className="animate-spin text-[#c69a55]"
            />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="py-20 px-6 text-center">
            <FileUser
              size={42}
              className="text-gray-300 mx-auto mb-4"
            />

            <h4 className="font-bold text-[#10283f]">
              No applications found
            </h4>

            <p className="text-sm text-gray-400 mt-2">
              Applications will appear here when candidates submit the
              Careers form.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <div
                key={application.id}
                className="p-5 md:px-6 hover:bg-gray-50/70 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#10283f] text-[#d8b477] flex items-center justify-center shrink-0">
                      <UserRound size={22} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-[#10283f]">
                        {application.full_name}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1 break-all">
                        {application.email}
                      </p>

                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                        <BriefcaseBusiness
                          size={15}
                          className="text-[#b68b4b] shrink-0"
                        />
                        {application.job_role}
                      </p>

                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                        <CalendarDays size={14} />
                        Submitted {formatDate(application.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:shrink-0">
                    <span
                      className={`inline-flex justify-center items-center border px-3 py-2 rounded-full text-xs font-bold capitalize ${
                        statusStyles[application.status] ||
                        statusStyles.new
                      }`}
                    >
                      {application.status || "new"}
                    </span>

                    <button
                      type="button"
                      onClick={() => openApplication(application)}
                      className="inline-flex items-center justify-center gap-2 bg-[#10283f] hover:bg-[#183f5c] text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
                    >
                      <Eye size={16} />
                      View Application
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-[110] bg-[#071522]/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeApplication}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#10283f] px-6 py-6 sm:px-8 rounded-t-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#d8b477] font-bold">
                    Applicant Details
                  </p>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                    {selectedApplication.full_name}
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    {selectedApplication.job_role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeApplication}
                  disabled={saving || Boolean(openingDocument)}
                  className="text-gray-300 hover:text-white text-sm font-semibold disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-7">
              {/* Applicant Information */}
              <div>
                <h4 className="font-bold text-[#10283f] mb-4">
                  Applicant Information
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      FULL NAME
                    </p>

                    <p className="text-sm font-semibold text-[#10283f]">
                      {selectedApplication.full_name}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      EMAIL ADDRESS
                    </p>

                    <a
                      href={`mailto:${selectedApplication.email}`}
                      className="text-sm font-semibold text-[#183f5c] break-all hover:text-[#c69a55]"
                    >
                      {selectedApplication.email}
                    </a>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      JOB ROLE
                    </p>

                    <p className="text-sm font-semibold text-[#10283f]">
                      {selectedApplication.job_role}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">
                      DATE SUBMITTED
                    </p>

                    <p className="text-sm font-semibold text-[#10283f]">
                      {formatDate(selectedApplication.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-bold text-[#10283f] mb-4">
                  Submitted Documents
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <FileText size={21} />
                      </div>

                      <div>
                        <p className="font-semibold text-sm text-[#10283f]">
                          Curriculum Vitae
                        </p>
                        <p className="text-xs text-gray-400">
                          Applicant CV
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={
                        !selectedApplication.cv_path ||
                        Boolean(openingDocument)
                      }
                      onClick={() =>
                        openDocument(
                          selectedApplication.cv_path,
                          "cv"
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 bg-[#10283f] hover:bg-[#183f5c] text-white rounded-lg py-3 text-sm font-semibold disabled:opacity-50"
                    >
                      {openingDocument === "cv" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                      Open CV
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={21} />
                      </div>

                      <div>
                        <p className="font-semibold text-sm text-[#10283f]">
                          Credentials
                        </p>
                        <p className="text-xs text-gray-400">
                          Supporting documents
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={
                        !selectedApplication.credentials_path ||
                        Boolean(openingDocument)
                      }
                      onClick={() =>
                        openDocument(
                          selectedApplication.credentials_path,
                          "credentials"
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 bg-[#10283f] hover:bg-[#183f5c] text-white rounded-lg py-3 text-sm font-semibold disabled:opacity-50"
                    >
                      {openingDocument === "credentials" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Download size={16} />
                      )}
                      Open Credentials
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Document links are generated securely and expire after
                  five minutes.
                </p>
              </div>

              {/* Application Status */}
              <div>
                <label
                  htmlFor="application-status"
                  className="block text-sm font-bold text-[#10283f] mb-2"
                >
                  Application Status
                </label>

                <select
                  id="application-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={saving}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#c69a55] bg-white"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Admin Notes */}
              <div>
                <label
                  htmlFor="application-notes"
                  className="block text-sm font-bold text-[#10283f] mb-2"
                >
                  Internal Admin Notes
                </label>

                <textarea
                  id="application-notes"
                  rows={4}
                  maxLength={5000}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  disabled={saving}
                  placeholder="Add interview feedback, review comments or other internal notes..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#c69a55] resize-y disabled:bg-gray-100"
                />

                <p className="text-xs text-gray-400 mt-2">
                  These notes are for internal administration only.
                </p>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm"
                >
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                  {successMessage}
                </div>
              )}

              {/* Save */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeApplication}
                  disabled={saving || Boolean(openingDocument)}
                  className="sm:w-1/3 border border-gray-300 text-gray-700 font-semibold rounded-xl px-5 py-3 hover:bg-gray-50 disabled:opacity-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={saveApplication}
                  disabled={saving || Boolean(openingDocument)}
                  className="sm:flex-1 flex items-center justify-center gap-2 bg-[#c69a55] hover:bg-[#d8b477] text-[#10283f] font-bold rounded-xl px-5 py-3 transition disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerApplicationsManagement;
