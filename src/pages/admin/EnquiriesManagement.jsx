
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Search,
  RefreshCw,
  Mail,
  Phone,
  CalendarDays,
  MessageSquare,
  Trash2,
  Save,
  X,
  Loader2,
  Filter,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const STATUS_OPTIONS = [
  "new",
  "in_progress",
  "resolved",
  "archived",
];

const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-amber-50 text-amber-700 border-amber-100",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  archived: "bg-gray-100 text-gray-600 border-gray-200",
};

const formatStatus = (status) =>
  (status || "new")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const EnquiriesManagement = ({ onDataChanged }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [notes, setNotes] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchEnquiries = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("enquiries")
        .select(
          "id, name, phone, email, message, source, status, admin_notes, created_at"
        )
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setEnquiries(data || []);

      const savedNotes = {};
      (data || []).forEach((enquiry) => {
        savedNotes[enquiry.id] = enquiry.admin_notes || "";
      });

      setNotes(savedNotes);
    } catch (err) {
      console.error("Unable to load enquiries:", err);
      setError(err.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const filteredEnquiries = useMemo(() => {
    const term = search.toLowerCase().trim();

    return enquiries.filter((enquiry) => {
      const matchesStatus =
        statusFilter === "all" || enquiry.status === statusFilter;

      const matchesSearch =
        !term ||
        [
          enquiry.name,
          enquiry.email,
          enquiry.phone,
          enquiry.message,
          enquiry.source,
        ].some((value) =>
          String(value || "").toLowerCase().includes(term)
        );

      return matchesStatus && matchesSearch;
    });
  }, [enquiries, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter((item) => item.status === "new").length,
      in_progress: enquiries.filter(
        (item) => item.status === "in_progress"
      ).length,
      resolved: enquiries.filter((item) => item.status === "resolved").length,
      archived: enquiries.filter((item) => item.status === "archived").length,
    };
  }, [enquiries]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ status })
        .eq("id", id);

      if (updateError) throw updateError;

      setEnquiries((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );

      onDataChanged?.();
    } catch (err) {
      console.error("Unable to update enquiry status:", err);
      setError(err.message || "Unable to update enquiry status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const saveNotes = async (id) => {
    setSavingId(id);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("enquiries")
        .update({ admin_notes: notes[id] || "" })
        .eq("id", id);

      if (updateError) throw updateError;

      setEnquiries((previous) =>
        previous.map((item) =>
          item.id === id
            ? { ...item, admin_notes: notes[id] || "" }
            : item
        )
      );

      setExpandedId(null);
    } catch (err) {
      console.error("Unable to save enquiry notes:", err);
      setError(err.message || "Unable to save internal notes.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this enquiry? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      const { error: deleteError } = await supabase
        .from("enquiries")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setEnquiries((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (expandedId === id) setExpandedId(null);

      onDataChanged?.();
    } catch (err) {
      console.error("Unable to delete enquiry:", err);
      setError(err.message || "Unable to delete enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  const statusCards = [
    { label: "Total Enquiries", value: counts.all, key: "all" },
    { label: "New", value: counts.new, key: "new" },
    { label: "In Progress", value: counts.in_progress, key: "in_progress" },
    { label: "Resolved", value: counts.resolved, key: "resolved" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-[#c69a55]" size={36} />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm">
            Manage messages submitted through your website.
          </p>
          <h2 className="text-2xl font-bold mt-1">Enquiries Management</h2>
        </div>

        <button
          type="button"
          onClick={() => fetchEnquiries(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#10283f] text-white text-sm font-semibold hover:bg-[#183f5c] disabled:opacity-60 transition"
        >
          <RefreshCw
            size={17}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh Enquiries
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <button
            type="button"
            key={card.key}
            onClick={() => setStatusFilter(card.key)}
            className={`text-left bg-white border rounded-2xl p-5 shadow-sm transition hover:shadow-md ${
              statusFilter === card.key
                ? "border-[#c69a55] ring-1 ring-[#c69a55]"
                : "border-gray-100"
            }`}
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-3xl font-bold mt-3">{card.value}</p>
          </button>
        ))}
      </div>

      {/* Search and filters */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, phone or message..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#c69a55] text-sm"
            />
          </div>

          <div className="relative">
            <Filter
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full appearance-none pl-11 pr-10 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#c69a55] text-sm bg-white"
            >
              <option value="all">All enquiries ({counts.all})</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)} (
                  {counts[status]})
                </option>
              ))}
            </select>
            <ChevronDown
              size={17}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Enquiry list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Submitted Enquiries</h3>
          <span className="text-sm text-gray-400">
            {filteredEnquiries.length} result(s)
          </span>
        </div>

        {filteredEnquiries.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#f4f6f8] flex items-center justify-center text-[#c69a55]">
              <Mail size={27} />
            </div>
            <h3 className="font-bold mt-4">No enquiries found</h3>
            <p className="text-sm text-gray-400 mt-2">
              {enquiries.length === 0
                ? "Website enquiries will appear here when submitted."
                : "Try changing your search or status filter."}
            </p>
          </div>
        ) : (
          filteredEnquiries.map((enquiry) => {
            const isExpanded = expandedId === enquiry.id;

            return (
              <article
                key={enquiry.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-5 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-bold text-lg">
                          {enquiry.name}
                        </h4>

                        <span
                          className={`inline-flex items-center border px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[enquiry.status] || STATUS_STYLES.new}`}
                        >
                          {formatStatus(enquiry.status)}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 mt-3 text-sm text-gray-500">
                        {enquiry.email && (
                          <a
                            href={`mailto:${enquiry.email}`}
                            className="inline-flex items-center gap-2 hover:text-[#c69a55] break-all"
                          >
                            <Mail size={15} />
                            {enquiry.email}
                          </a>
                        )}

                        {enquiry.phone && (
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="inline-flex items-center gap-2 hover:text-[#c69a55]"
                          >
                            <Phone size={15} />
                            {enquiry.phone}
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(enquiry.created_at)}
                        </span>

                        {enquiry.source && (
                          <span className="inline-flex items-center gap-1.5">
                            <ExternalLink size={13} />
                            Source: {enquiry.source}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-44 shrink-0">
                      <label className="text-xs font-semibold text-gray-500">
                        Update Status
                      </label>

                      <select
                        value={enquiry.status || "new"}
                        onChange={(event) =>
                          updateStatus(enquiry.id, event.target.value)
                        }
                        disabled={updatingId === enquiry.id}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white outline-none focus:border-[#c69a55] disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>

                      {updatingId === enquiry.id && (
                        <span className="text-xs text-gray-400">
                          Updating...
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 bg-[#f8f9fa] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      <MessageSquare size={14} />
                      Message
                    </div>

                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-7">
                      {enquiry.message || "No message provided."}
                    </p>
                  </div>

                  {/* Internal notes */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : enquiry.id)
                      }
                      className="text-sm font-semibold text-[#183f5c] hover:text-[#c69a55] transition"
                    >
                      {isExpanded ? "Close internal notes" : "Add / View Internal Notes"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteEnquiry(enquiry.id)}
                      disabled={deletingId === enquiry.id}
                      className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      {deletingId === enquiry.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border-t border-gray-100 pt-5">
                      <label
                        htmlFor={`notes-${enquiry.id}`}
                        className="block text-sm font-semibold mb-2"
                      >
                        Private Administrator Notes
                      </label>

                      <textarea
                        id={`notes-${enquiry.id}`}
                        rows={4}
                        value={notes[enquiry.id] ?? ""}
                        onChange={(event) =>
                          setNotes((previous) => ({
                            ...previous,
                            [enquiry.id]: event.target.value,
                          }))
                        }
                        placeholder="Add follow-up details or internal notes. These are not shown publicly."
                        className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-[#c69a55] resize-y"
                      />

                      <div className="flex justify-end gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => setExpandedId(null)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                        >
                          <X size={16} />
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={() => saveNotes(enquiry.id)}
                          disabled={savingId === enquiry.id}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10283f] text-white text-sm font-semibold hover:bg-[#183f5c] disabled:opacity-60"
                        >
                          {savingId === enquiry.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Save size={16} />
                          )}
                          Save Notes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EnquiriesManagement;
