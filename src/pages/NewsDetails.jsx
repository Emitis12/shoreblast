
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Newspaper,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const NewsDetails = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching article:", error);
      setError("We couldn't load this article. Please try again.");
    } else if (!data) {
      setError("This article may have been removed or is not available.");
    } else {
      setPost(data);
    }

    setLoading(false);
  };

  const getImageUrl = (path) => {
    if (!path) return null;

    if (path.startsWith("http")) return path;

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(path);

    return data?.publicUrl;
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#c69a55] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#f4f6f8] flex items-center justify-center px-6 pt-24">
        <div className="bg-white max-w-lg w-full p-10 text-center shadow-sm">
          <Newspaper size={42} className="text-[#c69a55] mx-auto mb-5" />
          <h1 className="text-2xl font-bold text-[#10283f] mb-4">
            Article Unavailable
          </h1>
          <p className="text-gray-500 mb-8">{error}</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-3 bg-[#10283f] text-white px-6 py-4 text-sm font-semibold hover:bg-[#183f5c] transition-colors"
          >
            <ArrowLeft size={17} />
            Back to News & Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f6f8] min-h-screen">

      {/* ARTICLE HEADER */}
      <section className="bg-[#091b2b] pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-3 text-white/70 hover:text-[#e3c28d] text-sm mb-12 transition-colors"
          >
            <ArrowLeft size={17} />
            Back to News & Events
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#c69a55] text-[#10283f] px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
              {post.post_type === "event" ? "Event" : "News"}
            </span>

            <span className="text-white/60 text-xs">
              {formatDate(post.published_at)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-white/65 text-lg leading-8 mt-7 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {post.post_type === "event" && (
            <div className="flex flex-col sm:flex-row gap-5 mt-8 text-white/70 text-sm">
              {post.event_date && (
                <div className="flex items-center gap-3">
                  <CalendarDays size={17} className="text-[#c69a55]" />
                  {new Date(post.event_date).toLocaleString("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </div>
              )}

              {post.event_location && (
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="text-[#c69a55]" />
                  {post.event_location}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        {post.cover_image_path && (
          <div className="mb-12 overflow-hidden bg-[#10283f]">
            <img
              src={getImageUrl(post.cover_image_path)}
              alt={post.title}
              className="w-full max-h-[560px] object-cover"
            />
          </div>
        )}

        <article className="bg-white p-7 md:p-12 shadow-sm">
          <div className="whitespace-pre-wrap break-words text-gray-700 text-base md:text-lg leading-9">
            {post.content}
          </div>
        </article>

        <div className="mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-3 text-[#10283f] font-bold hover:text-[#b48645] transition-colors"
          >
            <ArrowLeft size={18} />
            Explore More News & Events
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NewsDetails;
