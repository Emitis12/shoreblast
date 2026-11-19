
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Newspaper } from "lucide-react";
import { supabase } from "../lib/supabase";

const News = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setPosts(data || []);
    }

    setLoading(false);
  };

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.post_type === activeFilter);

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

  return (
    <main className="bg-[#f4f6f8] min-h-screen">

      {/* PAGE HERO */}
      <section className="relative bg-[#091b2b] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#091b2b] via-[#10283f] to-[#183f5c]" />

        <div className="absolute right-0 top-0 w-1/2 h-full bg-white/[0.03] skew-x-[-20deg] translate-x-32" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-[#c69a55]" />
            <span className="text-[#e3c28d] uppercase tracking-[3px] text-xs font-semibold">
              ShoreBlast Energy
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            News & Events
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-8">
            Stay informed with the latest company updates, industry news,
            project highlights, announcements, and upcoming events.
          </p>
        </div>
      </section>

      {/* NEWS CONTENT */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 py-20">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[#c69a55] uppercase tracking-[3px] text-xs font-bold">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#10283f] mt-3">
              From Our Newsroom
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Updates", value: "all" },
              { label: "News", value: "news" },
              { label: "Events", value: "event" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.value
                    ? "bg-[#10283f] text-white"
                    : "bg-white text-[#10283f] hover:bg-[#e8edf1]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-[#c69a55] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <p className="text-gray-500">Loading latest updates...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white py-20 px-6 text-center">
            <Newspaper size={42} className="text-[#c69a55] mx-auto mb-5" />
            <h3 className="text-xl font-bold text-[#10283f] mb-2">
              No updates available
            </h3>
            <p className="text-gray-500">
              Please check back soon for our latest news and events.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white group shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <Link to={`/news/${post.slug}`} className="block">
                  <div className="relative h-60 overflow-hidden bg-[#10283f]">
                    {post.cover_image_path ? (
                      <img
                        src={getImageUrl(post.cover_image_path)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Newspaper size={55} className="text-white/30" />
                      </div>
                    )}

                    <span className="absolute top-5 left-5 bg-[#c69a55] text-[#10283f] px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                      {post.post_type === "event" ? "Event" : "News"}
                    </span>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                      <CalendarDays size={14} />
                      <span>{formatDate(post.published_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#10283f] leading-snug mb-4 group-hover:text-[#b48645] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-7 line-clamp-3 mb-6">
                      {post.excerpt || post.content}
                    </p>

                    {post.post_type === "event" && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-5">
                        <MapPin size={14} className="text-[#c69a55]" />
                        <span>{post.event_location || "Location to be announced"}</span>
                      </div>
                    )}

                    <span className="inline-flex items-center gap-3 text-[#10283f] text-sm font-bold group-hover:text-[#b48645] transition-colors">
                      Read More
                      <ArrowRight size={17} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default News;
