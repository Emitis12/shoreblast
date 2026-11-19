
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
} from "lucide-react";

const emptyForm = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  display_order: 0,
  image_path: "",
  details_image_path: "",
  items: [{ label: "", link: "" }],
  is_published: false,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const uploadImage = async (file) => {
  if (!file) return null;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Please upload a JPG, PNG or WebP image.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Images must not exceed 5 MB.");
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("services-images")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  return path;
};

const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const { data } = supabase.storage
    .from("services-images")
    .getPublicUrl(path);

  return data.publicUrl;
};

const ServicesManagement = ({ onDataChanged }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [mainImage, setMainImage] = useState(null);
  const [detailsImage, setDetailsImage] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setServices([]);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setMainImage(null);
    setDetailsImage(null);
    setEditingId(null);
    setFormOpen(false);
    setError("");
    setSuccess("");
  };

  const openNewForm = () => {
    resetForm();
    setForm({
      ...emptyForm,
      display_order: services.length + 1,
    });
    setFormOpen(true);
  };

  const openEditForm = (service) => {
    const details = service.details || {};

    setEditingId(service.id);
    setMainImage(null);
    setDetailsImage(null);
    setError("");
    setSuccess("");

    setForm({
      title: service.title || "",
      slug: service.slug || "",
      summary: service.summary || "",
      description: service.description || "",
      display_order: service.display_order ?? 0,
      image_path: service.image_path || "",
      details_image_path: details.details_image_path || "",
      items:
        Array.isArray(details.items) && details.items.length
          ? details.items.map((item) => ({
              label: item.label || "",
              link: item.link || "",
            }))
          : [{ label: "", link: "" }],
      is_published: service.is_published || false,
    });

    setFormOpen(true);
  };

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateItem = (index, field, value) => {
    setForm((previous) => ({
      ...previous,
      items: previous.items.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      ),
    }));
  };

  const addItem = () => {
    setForm((previous) => ({
      ...previous,
      items: [...previous.items, { label: "", link: "" }],
    }));
  };

  const removeItem = (index) => {
    setForm((previous) => ({
      ...previous,
      items: previous.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title.trim()) {
        throw new Error("Service title is required.");
      }

      if (!form.slug.trim()) {
        throw new Error("Service slug is required.");
      }

      let imagePath = form.image_path;
      let detailsImagePath = form.details_image_path;

      if (mainImage) {
        imagePath = await uploadImage(mainImage);
      }

      if (detailsImage) {
        detailsImagePath = await uploadImage(detailsImage);
      }

      const cleanItems = form.items
        .filter((item) => item.label.trim())
        .map((item) => ({
          label: item.label.trim(),
          link: item.link.trim(),
        }));

      const payload = {
        title: form.title.trim(),
        slug: slugify(form.slug),
        summary: form.summary.trim(),
        description: form.description.trim(),
        image_path: imagePath || null,
        details: {
          details_image_path: detailsImagePath || null,
          items: cleanItems,
        },
        display_order: Number(form.display_order) || 0,
        is_published: form.is_published,
      };

      const query = editingId
        ? supabase.from("services").update(payload).eq("id", editingId)
        : supabase.from("services").insert(payload);

      const { error: saveError } = await query;

      if (saveError) throw saveError;

      setSuccess(
        editingId
          ? "Service updated successfully."
          : "Service added successfully."
      );

      await fetchServices();
      onDataChanged?.();

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (saveError) {
      setError(saveError.message || "Unable to save service.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (service) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("services")
      .update({ is_published: !service.is_published })
      .eq("id", service.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(
      service.is_published
        ? "Service unpublished."
        : "Service published."
    );

    await fetchServices();
    onDataChanged?.();
  };

  const deleteService = async (service) => {
    const confirmed = window.confirm(
      `Delete "${service.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", service.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess("Service deleted.");
    await fetchServices();
    onDataChanged?.();
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55] focus:ring-2 focus:ring-[#c69a55]/10";

  const labelClass =
    "block text-sm font-semibold text-[#10283f] mb-2";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-xl font-bold text-[#10283f]">
            Services Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage the services displayed on your website.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchServices}
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
            Add Service
          </button>
        </div>
      </div>

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

      {formOpen && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-2xl p-5 md:p-7 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold">
                {editingId ? "Edit Service" : "Add New Service"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Complete the service information below.
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
            <div>
              <label className={labelClass}>Service Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((previous) => ({
                    ...previous,
                    title,
                    slug: editingId
                      ? previous.slug
                      : slugify(title),
                  }));
                }}
                placeholder="e.g. Offshore Oil and Gas Services"
                required
              />
            </div>

            <div>
              <label className={labelClass}>URL Slug *</label>
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) =>
                  updateField("slug", e.target.value)
                }
                placeholder="offshore-oil-and-gas-services"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.display_order}
                onChange={(e) =>
                  updateField("display_order", e.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Short Summary</label>
              <input
                className={inputClass}
                value={form.summary}
                onChange={(e) =>
                  updateField("summary", e.target.value)
                }
                placeholder="A short description for the service card"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Full Description</label>
              <textarea
                rows={4}
                className={inputClass}
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                placeholder="Enter the full service description..."
              />
            </div>

            <div>
              <label className={labelClass}>Main Card Image</label>
              {form.image_path && !mainImage && (
                <img
                  src={getImageUrl(form.image_path)}
                  alt="Current service"
                  className="w-full h-36 object-cover rounded-xl mb-3"
                />
              )}
              <label className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl p-5 cursor-pointer hover:border-[#c69a55]">
                <Upload size={18} />
                <span className="text-sm">
                  {mainImage ? mainImage.name : "Choose card image"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    setMainImage(e.target.files?.[0] || null)
                  }
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>

            <div>
              <label className={labelClass}>Modal Header Image</label>
              {form.details_image_path && !detailsImage && (
                <img
                  src={getImageUrl(form.details_image_path)}
                  alt="Current modal"
                  className="w-full h-36 object-cover rounded-xl mb-3"
                />
              )}
              <label className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl p-5 cursor-pointer hover:border-[#c69a55]">
                <ImageIcon size={18} />
                <span className="text-sm">
                  {detailsImage
                    ? detailsImage.name
                    : "Choose modal image"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    setDetailsImage(e.target.files?.[0] || null)
                  }
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="font-bold text-[#10283f]">
                  Service Offerings
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Add the clickable items displayed inside the service modal.
                </p>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="text-sm font-semibold text-[#a47b40] hover:text-[#10283f]"
              >
                + Add Offering
              </button>
            </div>

            <div className="space-y-3">
              {form.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-center"
                >
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) =>
                      updateItem(index, "label", e.target.value)
                    }
                    placeholder="Offering name"
                  />

                  <input
                    className={inputClass}
                    value={item.link}
                    onChange={(e) =>
                      updateItem(index, "link", e.target.value)
                    }
                    placeholder="/service-detail"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                    aria-label="Remove offering"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 mt-7 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                updateField("is_published", e.target.checked)
              }
              className="w-4 h-4 accent-[#c69a55]"
            />
            <span className="text-sm font-semibold">
              Publish this service on the website
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-[#10283f] text-white px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Saving..." : "Save Service"}
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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#c69a55]" size={32} />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <ImageIcon size={38} className="mx-auto text-gray-300" />
          <h3 className="font-bold text-lg mt-4">
            No services added yet
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Add your first service to begin managing your website content.
          </p>
          <button
            type="button"
            onClick={openNewForm}
            className="mt-5 bg-[#10283f] text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            Add First Service
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold">All Services</h3>
              <p className="text-xs text-gray-500 mt-1">
                {services.length} service record(s)
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                {service.image_path ? (
                  <img
                    src={getImageUrl(service.image_path)}
                    alt={service.title}
                    className="w-full md:w-28 h-24 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full md:w-28 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <ImageIcon size={26} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-[#10283f]">
                      {service.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        service.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {service.is_published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {service.summary || service.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Display order: {service.display_order}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(service)}
                    title={
                      service.is_published ? "Unpublish" : "Publish"
                    }
                    className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                  >
                    {service.is_published ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(service)}
                    title="Edit service"
                    className="p-3 rounded-xl border border-gray-200 text-[#183f5c] hover:bg-gray-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteService(service)}
                    title="Delete service"
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

export default ServicesManagement;
