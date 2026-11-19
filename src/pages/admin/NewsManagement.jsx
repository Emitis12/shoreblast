
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Search,
  RefreshCw,
  Newspaper,
  CalendarDays,
  ImagePlus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Loader2,
  MapPin,
  FileText,
} from "lucide-react";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  post_type: "news",
  event_date: "",
  event_location: "",
  is_published: false,
  cover_image_path: "",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not scheduled";

const NewsManagement = ({ onDataChanged }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("news_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setPosts([]);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const publishedCount = posts.filter((post) => post.is_published).length;
  const draftCount = posts.filter((post) => !post.is_published).length;
  const eventCount = posts.filter(
    (post) => post.post_type === "event"
  ).length;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "published" && post.is_published) ||
      (filter === "draft" && !post.is_published) ||
      post.post_type === filter;

    return matchesSearch && matchesFilter;
  });

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const openEditForm = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      post_type: post.post_type || "news",
      event_date: post.event_date
        ? new Date(post.event_date).toISOString().slice(0, 16)
        : "",
      event_location: post.event_location || "",
      is_published: post.is_published || false,
      cover_image_path: post.cover_image_path || "",
    });

    setImageFile(null);
    setImagePreview(
      post.cover_image_path
        ? supabase.storage
            .from("news-images")
            .getPublicUrl(post.cover_image_path).data.publicUrl
        : ""
    );

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
  };

  const handleTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: editingId ? current.slug : slugify(value),
    }));
  };

  const handleImageChange = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Cover image must not exceed 5MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return form.cover_image_path;

    const extension = imageFile.name.split(".").pop().toLowerCase();
    const filePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    return filePath;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    let uploadedPath = null;

    try {
      if (!form.title.trim() || !form.content.trim()) {
        throw new Error("Please provide an article title and content.");
      }

      const finalSlug = slugify(form.slug || form.title);

      if (!finalSlug) {
        throw new Error("Please provide a valid article title or URL slug.");
      }

      if (
        form.post_type === "event" &&
        !form.event_date
      ) {
        throw new Error("Please provide the event date.");
      }

      const imagePath = await uploadImage();

      if (imageFile && imagePath !== form.cover_image_path) {
        uploadedPath = imagePath;
      }

      const postData = {
        title: form.title.trim(),
        slug: finalSlug,
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        post_type: form.post_type,
        event_date:
          form.post_type === "event" && form.event_date
            ? new Date(form.event_date).toISOString()
            : null,
        event_location:
          form.post_type === "event"
            ? form.event_location.trim()
            : null,
        cover_image_path: imagePath || null,
        is_published: form.is_published,
        published_at: form.is_published
          ? new Date().toISOString()
          : null,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("news_posts")
          .update(postData)
          .eq("id", editingId)
          .select()
          .single();
      } else {
        result = await supabase
          .from("news_posts")
          .insert(postData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Remove the old image only after a successful replacement.
      if (
        editingId &&
        imageFile &&
        form.cover_image_path &&
        form.cover_image_path !== imagePath
      ) {
        await supabase.storage
          .from("news-images")
          .remove([form.cover_image_path]);
      }

      setSuccess(editingId ? "Post updated successfully." : "Post created successfully.");
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");

      await fetchPosts();
      onDataChanged?.();
    } catch (err) {
      // Avoid leaving an uploaded image behind if saving the post failed.
      if (uploadedPath) {
        await supabase.storage
          .from("news-images")
          .remove([uploadedPath]);
      }

      setError(err.message || "Unable to save this post.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post) => {
    setError("");
    setSuccess("");

    const nextPublished = !post.is_published;

    const { error: updateError } = await supabase
      .from("news_posts")
      .update({
        is_published: nextPublished,
        published_at: nextPublished
          ? new Date().toISOString()
          : null,
      })
      .eq("id", post.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(
      nextPublished
        ? "Post published successfully."
        : "Post moved to drafts."
    );

    await fetchPosts();
    onDataChanged?.();
  };

  const deletePost = async (post) => {
    const confirmed = window.confirm(
      `Delete "${post.title}" permanently?`
    );

    if (!confirmed) return;

    setDeletingId(post.id);
    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase
        .from("news_posts")
        .delete()
        .eq("id", post.id);

      if (deleteError) throw deleteError;

      if (post.cover_image_path) {
        const { error: imageError } = await supabase.storage
          .from("news-images")
          .remove([post.cover_image_path]);

        if (imageError) {
          console.warn("Post deleted, but its image could not be removed:", imageError.message);
        }
      }

      setSuccess("Post deleted successfully.");
      await fetchPosts();
      onDataChanged?.();
    } catch (err) {
      setError(err.message || "Unable to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#c69a55]">
            Content Management
          </p>
          <h1 className="text-2xl font-bold text-[#10283f] sm:text-3xl">
            News & Events
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage company news and event announcements.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-lg bg-[#10283f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#183f5c]"
          >
            <Plus size={17} />
            Create Post
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && !showForm && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && !showForm && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Posts",
            value: posts.length,
            icon: Newspaper,
          },
          {
            label: "Published",
            value: publishedCount,
            icon: Eye,
          },
          {
            label: "Drafts",
            value: draftCount,
            icon: FileText,
          },
          {
            label: "Events",
            value: eventCount,
            icon: CalendarDays,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-[#10283f]">
                    {item.value}
                  </p>
                </div>
                <div className="rounded-xl bg-[#f4f6f8] p-3 text-[#c69a55]">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#c69a55]"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#c69a55]"
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="news">News</option>
          <option value="event">Events</option>
        </select>
      </div>

      {/* Posts list */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
            <Loader2 className="animate-spin" size={22} />
            Loading posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Newspaper className="mx-auto mb-3 text-gray-300" size={42} />
            <h3 className="font-semibold text-[#10283f]">
              No posts found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your first news article or event announcement.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredPosts.map((post) => {
              const imageUrl = post.cover_image_path
                ? supabase.storage
                    .from("news-images")
                    .getPublicUrl(post.cover_image_path).data.publicUrl
                : "";

              return (
                <div
                  key={post.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-36">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <ImagePlus size={30} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#f4f6f8] px-2.5 py-1 text-xs font-semibold capitalize text-[#183f5c]">
                        {post.post_type}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          post.is_published
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <h3 className="truncate font-bold text-[#10283f]">
                      {post.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {post.excerpt || post.content}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={13} />
                        {formatDate(post.created_at)}
                      </span>

                      {post.post_type === "event" && post.event_location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {post.event_location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                      onClick={() => togglePublish(post)}
                      title={post.is_published ? "Unpublish" : "Publish"}
                      className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:border-[#c69a55] hover:text-[#c69a55]"
                    >
                      {post.is_published ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>

                    <button
                      onClick={() => openEditForm(post)}
                      title="Edit post"
                      className="rounded-lg border border-gray-200 p-2.5 text-[#183f5c] hover:border-[#c69a55]"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      onClick={() => deletePost(post)}
                      disabled={deletingId === post.id}
                      title="Delete post"
                      className="rounded-lg border border-gray-200 p-2.5 text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === post.id ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6">
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#10283f] px-5 py-4 text-white sm:px-7">
              <div>
                <h2 className="text-lg font-bold">
                  {editingId ? "Edit Post" : "Create New Post"}
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  Manage your news article or event announcement
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  Post Type
                </label>
                <select
                  value={form.post_type}
                  onChange={(e) =>
                    setForm({ ...form, post_type: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                >
                  <option value="news">Company News</option>
                  <option value="event">Event Announcement</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  Post Title *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter a title"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  URL Slug *
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                  placeholder="example-company-announcement"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Used in the public article URL. Each post needs a unique slug.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  Short Summary
                </label>
                <textarea
                  rows={3}
                  maxLength={300}
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  placeholder="Write a short introduction for the feed..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.excerpt.length}/300
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  Article Content *
                </label>
                <textarea
                  required
                  rows={10}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Write your full article or event announcement here..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm leading-7 outline-none focus:border-[#c69a55]"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Use blank lines to separate paragraphs. Rich text editing can be added later.
                </p>
              </div>

              {form.post_type === "event" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                      Event Date & Time *
                    </label>
                    <input
                      required
                      type="datetime-local"
                      value={form.event_date}
                      onChange={(e) =>
                        setForm({ ...form, event_date: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                      Event Venue
                    </label>
                    <input
                      value={form.event_location}
                      onChange={(e) =>
                        setForm({ ...form, event_location: e.target.value })
                      }
                      placeholder="Enter event venue"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#c69a55]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#10283f]">
                  Cover Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 text-center hover:border-[#c69a55]">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="mb-3 max-h-52 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <ImagePlus size={30} className="mb-2 text-[#c69a55]" />
                  )}

                  <span className="text-sm font-semibold text-[#10283f]">
                    {imageFile ? imageFile.name : "Choose cover image"}
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    JPG, PNG or WEBP · Maximum 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files?.[0])}
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_published: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-[#10283f]"
                />
                <span>
                  <span className="block text-sm font-semibold text-[#10283f]">
                    Publish this post
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Published posts can appear on the public website.
                  </span>
                </span>
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#10283f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#183f5c] disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;
