
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  Save,
  Loader2,
  Image as ImageIcon,
  RefreshCw,
  Users,
  CheckCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

const STORAGE_BUCKET = "client-logos";

const emptyForm = {
  name: "",
  website_url: "",
  display_order: 0,
  logo_path: "",
  is_published: false,
};

const uploadLogo = async (file) => {
  if (!file) return null;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Please upload a JPG, PNG or WebP logo.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Logo images must not exceed 5 MB.");
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  return path;
};

const getLogoUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
};

const ClienteleManagement = ({ onDataChanged }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [clientLogo, setClientLogo] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("*")
      .order("display_order", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setClients([]);
    } else {
      setClients(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setClientLogo(null);
    setEditingId(null);
    setFormOpen(false);
    setError("");
    setSuccess("");
  };

  const openNewForm = () => {
    resetForm();

    setForm({
      ...emptyForm,
      display_order: clients.length + 1,
    });

    setFormOpen(true);
  };

  const openEditForm = (client) => {
    setEditingId(client.id);
    setClientLogo(null);
    setError("");
    setSuccess("");

    setForm({
      name: client.name || "",
      website_url: client.website_url || "",
      display_order: client.display_order ?? 0,
      logo_path: client.logo_path || "",
      is_published: client.is_published || false,
    });

    setFormOpen(true);
  };

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.name.trim()) {
        throw new Error("Client or company name is required.");
      }

      if (
        form.website_url.trim() &&
        !/^https?:\/\/.+/i.test(form.website_url.trim())
      ) {
        throw new Error(
          "Please enter a valid website URL beginning with https:// or http://."
        );
      }

      let logoPath = form.logo_path;

      if (clientLogo) {
        logoPath = await uploadLogo(clientLogo);
      }

      const payload = {
        name: form.name.trim(),
        website_url: form.website_url.trim() || null,
        display_order: Number(form.display_order) || 0,
        logo_path: logoPath || null,
        is_published: form.is_published,
      };

      const query = editingId
        ? supabase
            .from("clients")
            .update(payload)
            .eq("id", editingId)
        : supabase
            .from("clients")
            .insert(payload);

      const { error: saveError } = await query;

      if (saveError) throw saveError;

      setSuccess(
        editingId
          ? "Client updated successfully."
          : "Client added successfully."
      );

      await fetchClients();
      onDataChanged?.();

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (saveError) {
      setError(saveError.message || "Unable to save client.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (client) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("clients")
      .update({
        is_published: !client.is_published,
      })
      .eq("id", client.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(
      client.is_published
        ? "Client unpublished."
        : "Client published."
    );

    await fetchClients();
    onDataChanged?.();
  };

  const deleteClient = async (client) => {
    const confirmed = window.confirm(
      `Delete "${client.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("clients")
      .delete()
      .eq("id", client.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess("Client deleted successfully.");

    await fetchClients();
    onDataChanged?.();
  };

  const publishedCount = clients.filter(
    (client) => client.is_published
  ).length;

  const draftCount = clients.length - publishedCount;

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/10";

  const labelClass =
    "block text-sm font-semibold text-[#10283f] mb-2";

  return (
    <div>
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-xl font-bold text-[#10283f]">
            Clientele Management
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage the client companies and logos displayed on your website.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchClients}
            className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openNewForm}
            className="flex items-center gap-2 bg-[#10283f] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#183f5c]"
          >
            <Plus size={17} />
            Add Client
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Clients</p>
              <h3 className="text-2xl font-bold text-[#10283f] mt-2">
                {clients.length}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#183f5c] flex items-center justify-center">
              <Users size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <h3 className="text-2xl font-bold text-green-600 mt-2">
                {publishedCount}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Drafts</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-2">
                {draftCount}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Client form */}
      {formOpen && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-2xl p-5 md:p-7 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#10283f]">
                {editingId ? "Edit Client" : "Add New Client"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Enter the client information below.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Client name */}
            <div>
              <label className={labelClass}>
                Client / Company Name *
              </label>

              <input
                className={inputClass}
                value={form.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                placeholder="e.g. Alkanes Petroleum Limited"
                required
              />
            </div>

            {/* Website */}
            <div>
              <label className={labelClass}>
                Company Website
              </label>

              <input
                type="url"
                className={inputClass}
                value={form.website_url}
                onChange={(e) =>
                  updateField("website_url", e.target.value)
                }
                placeholder="https://example.com"
              />
            </div>

            {/* Display order */}
            <div>
              <label className={labelClass}>
                Display Order
              </label>

              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.display_order}
                onChange={(e) =>
                  updateField("display_order", e.target.value)
                }
              />

              <p className="text-xs text-gray-400 mt-2">
                Lower numbers appear first.
              </p>
            </div>

            {/* Logo */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Client Logo
              </label>

              {clientLogo ? (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(clientLogo)}
                    alt="Selected client logo preview"
                    className="w-full max-w-xs h-32 object-contain bg-gray-50 border border-gray-100 rounded-xl p-3"
                  />

                  <button
                    type="button"
                    onClick={() => setClientLogo(null)}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Remove selected logo
                  </button>
                </div>
              ) : form.logo_path ? (
                <img
                  src={getLogoUrl(form.logo_path)}
                  alt="Current client logo"
                  className="w-full max-w-xs h-32 object-contain bg-gray-50 border border-gray-100 rounded-xl p-3 mb-3"
                />
              ) : null}

              <label className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#c69a55]">
                <Upload size={19} />

                <span className="text-sm">
                  {clientLogo
                    ? clientLogo.name
                    : "Choose client logo"}
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    setClientLogo(e.target.files?.[0] || null)
                  }
                />
              </label>

              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>
          </div>

          {/* Publish option */}
          <label className="flex items-center gap-3 mt-7 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                updateField("is_published", e.target.checked)
              }
              className="w-4 h-4 accent-[#c69a55]"
            />

            <span className="text-sm font-semibold text-[#10283f]">
              Publish this client on the website
            </span>
          </label>

          {/* Form actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-[#10283f] text-white px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-60 hover:bg-[#183f5c]"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}

              {saving ? "Saving..." : "Save Client"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Clients list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-[#c69a55]"
            size={32}
          />
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <Users
            size={38}
            className="mx-auto text-gray-300"
          />

          <h3 className="font-bold text-lg mt-4 text-[#10283f]">
            No clients added yet
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Add your first client to begin managing your website clientele.
          </p>

          <button
            type="button"
            onClick={openNewForm}
            className="mt-5 bg-[#10283f] text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            Add First Client
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#10283f]">
                All Clients
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {clients.length} client record(s)
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {clients.map((client) => (
              <div
                key={client.id}
                className="p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Logo */}
                {client.logo_path ? (
                  <div className="w-full md:w-32 h-24 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-3">
                    <img
                      src={getLogoUrl(client.logo_path)}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-32 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <ImageIcon size={26} />
                  </div>
                )}

                {/* Client information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-[#10283f]">
                      {client.name}
                    </h4>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        client.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {client.is_published ? "Published" : "Draft"}
                    </span>
                  </div>

                  {client.website_url && (
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#183f5c] hover:text-[#c69a55] mt-2 break-all"
                    >
                      {client.website_url}
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    Display order: {client.display_order}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(client)}
                    title={client.is_published ? "Unpublish" : "Publish"}
                    className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                  >
                    {client.is_published ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(client)}
                    title="Edit client"
                    className="p-3 rounded-xl border border-gray-200 text-[#183f5c] hover:bg-gray-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteClient(client)}
                    title="Delete client"
                    className="p-3 rounded-xl border border-gray-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteleManagement;
