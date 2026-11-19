
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

// Local fallback images
import client1 from "../images/Client1.png";
import client2 from "../images/Client2.png";
import client3 from "../images/Client3.png";
import client4 from "../images/Client4.png";
import client5 from "../images/Client5.jpg";
import client6 from "../images/Client6.jpg";
import client7 from "../images/Client7.jpg";
import client8 from "../images/Client8.jpg";
import client9 from "../images/Client9.jpg";

const STORAGE_BUCKET = "client-logos";

const fallbackClients = [
  { id: "fallback-1", name: "Client 1", logo: client1 },
  { id: "fallback-2", name: "Client 2", logo: client2 },
  { id: "fallback-3", name: "Client 3", logo: client3 },
  { id: "fallback-4", name: "Client 4", logo: client4 },
  { id: "fallback-5", name: "Client 5", logo: client5 },
  { id: "fallback-6", name: "Client 6", logo: client6 },
  { id: "fallback-7", name: "Client 7", logo: client7 },
  { id: "fallback-8", name: "Client 8", logo: client8 },
  { id: "fallback-9", name: "Client 9", logo: client9 },
];

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

const Clientele = () => {
  const [clients, setClients] = useState(fallbackClients);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [itemsPerSlide, setItemsPerSlide] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1
  );

  const [loading, setLoading] = useState(true);

  // Fetch published clients from Supabase
  useEffect(() => {
    let mounted = true;

    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("id, name, logo_path, website_url, display_order")
          .eq("is_published", true)
          .order("display_order", { ascending: true });

        if (error) throw error;

        if (!mounted) return;

        // Convert database records into the component's client format
        const databaseClients = (data || []).map((client) => ({
          id: client.id,
          name: client.name,
          logo: getLogoUrl(client.logo_path),
          website_url: client.website_url,
          display_order: client.display_order,
        }));

        // Keep original clients and append new database clients.
        // Avoid duplicates by comparing normalized company names.
        const existingNames = new Set(
          fallbackClients.map((client) =>
            client.name.toLowerCase().trim()
          )
        );

        const uniqueDatabaseClients = databaseClients.filter((client) => {
          const normalizedName = client.name.toLowerCase().trim();

          if (!normalizedName || existingNames.has(normalizedName)) {
            return false;
          }

          existingNames.add(normalizedName);
          return true;
        });

        const mergedClients = [
          ...fallbackClients,
          ...uniqueDatabaseClients,
        ];

        setClients(mergedClients);
      } catch (error) {
        console.error("Unable to load clientele:", error);

        if (mounted) {
          setClients(fallbackClients);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchClients();

    return () => {
      mounted = false;
    };
  }, []);

  // Update items per slide on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalSlides = Math.max(
    1,
    Math.ceil(clients.length / itemsPerSlide)
  );

  // Keep slide index valid when screen size or data changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide, clients.length]);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const startIndex = currentSlide * itemsPerSlide;

  const visibleClients = clients.slice(
    startIndex,
    startIndex + itemsPerSlide
  );

  return (
    <section className="relative overflow-hidden bg-[#f5f7f9] py-20 md:py-24">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-amber-500" />

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Our Network
            </span>

            <span className="w-10 h-[2px] bg-amber-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#10283f]">
            Clientele
          </h2>

          <div className="w-16 h-1 bg-amber-500 mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Client logos */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm px-5 md:px-12 py-10 md:py-14">
          {loading && (
            <div className="text-center text-sm text-gray-400 mb-5">
              Loading our clients...
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${itemsPerSlide}-${clients.length}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center"
            >
              {visibleClients.map((client) => (
                <div
                  key={client.id}
                  className="group flex justify-center items-center min-h-[180px] md:min-h-[220px] p-5 rounded-xl transition-all duration-300 hover:bg-gray-50"
                >
                  {client.logo ? (
                    client.website_url ? (
                      <a
                        href={client.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${client.name} website`}
                        className="flex justify-center items-center w-full"
                      >
                        <img
                          src={client.logo}
                          alt={client.name}
                          loading="lazy"
                          className="w-full max-w-[250px] h-[150px] md:h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </a>
                    ) : (
                      <img
                        src={client.logo}
                        alt={client.name}
                        loading="lazy"
                        className="w-full max-w-[250px] h-[150px] md:h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    )
                  ) : (
                    <div className="text-center text-sm font-semibold text-gray-500">
                      {client.name}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to client slide ${index + 1}`}
                  aria-current={
                    currentSlide === index ? "true" : undefined
                  }
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-amber-500"
                      : "w-2.5 bg-gray-300 hover:bg-[#10283f]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Clientele;
