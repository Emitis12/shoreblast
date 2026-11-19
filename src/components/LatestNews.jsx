
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Newspaper,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const LatestNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error loading latest news:", error);
    } else {
      setPosts(data || []);
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

  return (
    <section className="bg-[#f4f6f8] py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20">

        {/* SECTION HEADING */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-[2px] bg-[#c69a55]" />
              <span className="text-[#b48645] text-xs font-bold uppercase tracking-[3px]">
                Stay Informed
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10283f]">
              Latest News & Events
            </h2>

            <p className="text-gray-500 mt-5 max-w-2xl leading-7">
              Discover the latest updates, company announcements,
              industry developments, and upcoming events from ShoreBlast Energy.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-4 text-[#10283f] font-bold text-sm border-b-2 border-[#c69a55] pb-3 hover:text-[#b48645] transition-colors w-fit"
          >
            View All Updates
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* NEWS POSTS */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white animate-pulse"
              >
                <div className="h-60 bg-gray-200" />
                <div className="p-7 space-y-4">
                  <div className="h-3 bg-gray-200 w-1/3" />
                  <div className="h-6 bg-gray-200 w-4/5" />
                  <div className="h-4 bg-gray-200 w-full" />
                  <div className="h-4 bg-gray-200 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-gray-100 px-6 py-16 text-center">
            <Newspaper
              size={42}
              className="text-[#c69a55] mx-auto mb-5"
            />

            <h3 className="text-xl font-bold text-[#10283f] mb-3">
              Stay Tuned for Updates
            </h3>

            <p className="text-gray-500 text-sm">
              Our latest news and events will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link
                  to={`/news/${post.slug}`}
                  className="block"
                >
                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden bg-[#10283f]">
                    {post.cover_image_path ? (
                      <img
                        src={getImageUrl(post.cover_image_path)}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Newspaper
                          size={55}
                          className="text-white/30"
                        />
                      </div>
                    )}

                    <span className="absolute top-5 left-5 bg-[#c69a55] text-[#10283f] px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                      {post.post_type === "event" ? "Event" : "News"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-5">
                      <CalendarDays size={14} />
                      <span>{formatDate(post.published_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#10283f] leading-snug mb-4 group-hover:text-[#b48645] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-7 line-clamp-3 mb-5">
                      {post.excerpt || post.content}
                    </p>

                    {post.post_type === "event" && post.event_location && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-5">
                        <MapPin
                          size={14}
                          className="text-[#c69a55]"
                        />
                        <span>{post.event_location}</span>
                      </div>
                    )}

                    <span className="inline-flex items-center gap-3 text-[#10283f] font-bold text-sm group-hover:text-[#b48645] transition-colors">
                      Read More
                      <ArrowRight
                        size={17}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* BOTTOM LINK */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/news"
              className="inline-flex items-center gap-4 bg-[#10283f] text-white px-8 py-4 text-sm font-bold hover:bg-[#183f5c] transition-colors"
            >
              Explore All News & Events
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
