
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
  FolderOpen,
  CheckCircle,
  Clock,
} from "lucide-react";

const STORAGE_BUCKET = "project-images";

const emptyForm = {
  title: "",
  client_name: "",
  description: "",
  category: "past",
  project_date: "",
  display_order: 0,
  image_path: "",
  is_published: false,
};

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
    .from(STORAGE_BUCKET)
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
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
};

const ProjectsManagement = ({ onDataChanged }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [projectImage, setProjectImage] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setProjects([]);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setProjectImage(null);
    setEditingId(null);
    setFormOpen(false);
    setError("");
    setSuccess("");
  };

  const openNewForm = () => {
    resetForm();

    setForm({
      ...emptyForm,
      display_order: projects.length + 10,
    });

    setFormOpen(true);
  };

  const openEditForm = (project) => {
    setEditingId(project.id);
    setProjectImage(null);
    setError("");
    setSuccess("");

    setForm({
      title: project.title || "",
      client_name: project.client_name || "",
      description: project.description || "",
      category: project.category || "past",
      project_date: project.project_date || "",
      display_order: project.display_order ?? 0,
      image_path: project.image_path || "",
      is_published: project.is_published || false,
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
      if (!form.title.trim()) {
        throw new Error("Project title is required.");
      }

      if (!form.description.trim()) {
        throw new Error("Project description is required.");
      }

      if (!["past", "present"].includes(form.category)) {
        throw new Error("Please select a valid project category.");
      }

      let imagePath = form.image_path;

      if (projectImage) {
        imagePath = await uploadImage(projectImage);
      }

      const payload = {
        title: form.title.trim(),
        client_name: form.client_name.trim() || null,
        description: form.description.trim(),
        category: form.category,
        project_date: form.project_date || null,
        display_order: Number(form.display_order) || 0,
        image_path: imagePath || null,
        is_published: form.is_published,
      };

      const query = editingId
        ? supabase
            .from("projects")
            .update(payload)
            .eq("id", editingId)
        : supabase
            .from("projects")
            .insert(payload);

      const { error: saveError } = await query;

      if (saveError) throw saveError;

      setSuccess(
        editingId
          ? "Project updated successfully."
          : "Project added successfully."
      );

      await fetchProjects();
      onDataChanged?.();

      setTimeout(() => {
        resetForm();
      }, 700);
    } catch (saveError) {
      setError(saveError.message || "Unable to save project.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (project) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("projects")
      .update({
        is_published: !project.is_published,
      })
      .eq("id", project.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(
      project.is_published
        ? "Project unpublished."
        : "Project published."
    );

    await fetchProjects();
    onDataChanged?.();
  };

  const deleteProject = async (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setSuccess("Project deleted successfully.");

    await fetchProjects();
    onDataChanged?.();
  };

  const publishedCount = projects.filter(
    (project) => project.is_published
  ).length;

  const draftCount = projects.length - publishedCount;

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
            Projects Management
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage the projects displayed in your website portfolio.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchProjects}
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
            Add Project
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold text-[#10283f] mt-2">
                {projects.length}
              </h3>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#183f5c] flex items-center justify-center">
              <FolderOpen size={21} />
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

      {/* Project form */}
      {formOpen && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-2xl p-5 md:p-7 mb-8 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#10283f]">
                {editingId ? "Edit Project" : "Add New Project"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Enter the project information below.
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
            {/* Project title */}
            <div>
              <label className={labelClass}>
                Project Title *
              </label>

              <input
                className={inputClass}
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                placeholder="e.g. Sandblasting and Painting of Crude Oil Tanks"
                required
              />
            </div>

            {/* Client name */}
            <div>
              <label className={labelClass}>
                Client / Company Name
              </label>

              <input
                className={inputClass}
                value={form.client_name}
                onChange={(e) =>
                  updateField("client_name", e.target.value)
                }
                placeholder="e.g. Alkanes Petroleum Limited"
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>
                Project Category *
              </label>

              <select
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                required
              >
                <option value="past">Past Project</option>
                <option value="present">Present Project</option>
              </select>
            </div>

            {/* Project date */}
            <div>
              <label className={labelClass}>
                Project Date
              </label>

              <input
                type="date"
                className={inputClass}
                value={form.project_date}
                onChange={(e) =>
                  updateField("project_date", e.target.value)
                }
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

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Project Description *
              </label>

              <textarea
                rows={5}
                className={inputClass}
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                placeholder="Describe the project, work carried out and services delivered..."
                required
              />
            </div>

            {/* Project image */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Project Image
              </label>

              {projectImage ? (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(projectImage)}
                    alt="Selected project preview"
                    className="w-full max-w-sm h-48 object-cover rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setProjectImage(null)}
                    className="mt-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Remove selected image
                  </button>
                </div>
              ) : form.image_path ? (
                <img
                  src={getImageUrl(form.image_path)}
                  alt="Current project"
                  className="w-full max-w-sm h-48 object-cover rounded-xl mb-3"
                />
              ) : null}

              <label className="flex items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#c69a55]">
                <Upload size={19} />

                <span className="text-sm">
                  {projectImage
                    ? projectImage.name
                    : "Choose project image"}
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) =>
                    setProjectImage(e.target.files?.[0] || null)
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
              Publish this project on the website
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

              {saving ? "Saving..." : "Save Project"}
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

      {/* Projects list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            className="animate-spin text-[#c69a55]"
            size={32}
          />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <FolderOpen
            size={38}
            className="mx-auto text-gray-300"
          />

          <h3 className="font-bold text-lg mt-4 text-[#10283f]">
            No projects added yet
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Add your first project to begin managing your website portfolio.
          </p>

          <button
            type="button"
            onClick={openNewForm}
            className="mt-5 bg-[#10283f] text-white px-5 py-3 rounded-xl text-sm font-semibold"
          >
            Add First Project
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#10283f]">
                All Projects
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {projects.length} project record(s)
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Image */}
                {project.image_path ? (
                  <img
                    src={getImageUrl(project.image_path)}
                    alt={project.title}
                    className="w-full md:w-32 h-24 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full md:w-32 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <ImageIcon size={26} />
                  </div>
                )}

                {/* Project information */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-[#10283f]">
                      {project.title}
                    </h4>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.is_published
                        ? "Published"
                        : "Draft"}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      {project.category === "present"
                        ? "Present"
                        : "Past"}
                    </span>
                  </div>

                  {project.client_name && (
                    <p className="text-sm font-medium text-gray-600 mt-1">
                      {project.client_name}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Display order: {project.display_order}
                    {project.project_date &&
                      ` • Date: ${project.project_date}`}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(project)}
                    title={
                      project.is_published
                        ? "Unpublish"
                        : "Publish"
                    }
                    className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                  >
                    {project.is_published ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(project)}
                    title="Edit project"
                    className="p-3 rounded-xl border border-gray-200 text-[#183f5c] hover:bg-gray-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProject(project)}
                    title="Delete project"
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

export default ProjectsManagement;
