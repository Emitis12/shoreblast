
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

import card1 from "../images/card1.jpeg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card4 from "../images/card4.jpg";
import card5 from "../images/card5.png";
import card6 from "../images/card6.jpg";
import card7 from "../images/card7.jpg";
import card8 from "../images/card8.jpeg";
import card9 from "../images/card9.jpg";

// Original website projects - retained as fallback content
const fallbackCards = [
  {
    id: 1,
    image: card1,
    label:
      "Alkanes Petroleum Limited - Sandblasting of product and fire hydrant tanks",
    link: "#",
    linkText: "View More",
  },
  {
    id: 2,
    image: card2,
    label:
      "Montego Upstream Services Limited - Grit-Blasting and Painting of Product and Hydrant Pipelines",
    link: "#",
    linkText: "View More",
  },
  {
    id: 3,
    image: card3,
    label:
      "Fynefield Petroleum - Rehabilitation/Repainting of Fynefield Depot Facility.",
    link: "#",
    linkText: "View More",
  },
  {
    id: 4,
    image: card4,
    label:
      "ECM Terminals Limited - Integrity Test (NDT, Radiography and Cathodic Installation)",
    link: "#",
    linkText: "View More",
  },
  {
    id: 5,
    image: card5,
    label:
      "Dormanlong Engineering Ltd - SandBlasting and Painting of Crude Oil Tanks",
    link: "#",
    linkText: "View More",
  },
  {
    id: 6,
    image: card6,
    label:
      "Dormanlong Engineering Ltd - Maintenance of Product Pipelines",
    link: "#",
    linkText: "View More",
  },
  {
    id: 7,
    image: card7,
    label:
      "Puma Bitumen Resources Ltd - Repainting of Loading Gantry Station, Thermal Storage Facility and Weigh Bridge",
    link: "#",
    linkText: "View More",
  },
  {
    id: 8,
    image: card8,
    label:
      "Orient Petroleum Refinery - Grit Blasting and Painting Of Crude Oil Tanks, Anambra State.",
    link: "#",
    linkText: "View More",
  },
  {
    id: 9,
    image: card9,
    label:
      "Unicem Plant, Mfamosing - Industrial Tank Cleansing and Sludge Evacuation",
    link: "#",
    linkText: "View More",
  },
];

const STORAGE_BUCKET = "project-images";

function RecentProjects() {
  const [cards, setCards] = useState(fallbackCards);
  const [index, setIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const intervalRef = useRef(null);

  const slideCount = Math.ceil(cards.length / cardsPerSlide);

  // Fetch published projects from Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          id,
          title,
          client_name,
          description,
          category,
          image_path,
          display_order
        `)
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      if (!isMounted || !data) return;

      const databaseCards = data.map((project) => {
        let imageUrl = "";

        if (project.image_path) {
          if (/^https?:\/\//i.test(project.image_path)) {
            imageUrl = project.image_path;
          } else {
            const { data: imageData } = supabase.storage
              .from(STORAGE_BUCKET)
              .getPublicUrl(project.image_path);

            imageUrl = imageData?.publicUrl || "";
          }
        }

        return {
          id: project.id,
          image: imageUrl,
          label: project.client_name
            ? `${project.client_name} - ${project.title}`
            : project.title,
          description: project.description || "",
          category: project.category,
          link: "#",
          linkText: "View More",
          display_order: project.display_order ?? 100,
          isDatabaseRecord: true,
        };
      });

      // Preserve the original nine website projects.
      const existingCards = fallbackCards.map((card, position) => ({
        ...card,
        display_order: position + 1,
        isDatabaseRecord: false,
      }));

      // Add database projects and sort everything by display order.
      const mergedCards = [
        ...existingCards,
        ...databaseCards,
      ].sort((a, b) => {
        return a.display_order - b.display_order;
      });

      if (isMounted) {
        setCards(mergedCards);
        setIndex(0);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive cards per slide
  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth < 640 ? 1 : 3);
    };

    updateCardsPerSlide();

    window.addEventListener("resize", updateCardsPerSlide);

    return () => {
      window.removeEventListener("resize", updateCardsPerSlide);
    };
  }, []);

  // Reset to the first slide when the layout changes
  useEffect(() => {
    setIndex(0);
  }, [cardsPerSlide]);

  // Keep carousel index valid when project count changes
  useEffect(() => {
    setIndex((previous) =>
      Math.min(previous, Math.max(0, slideCount - 1))
    );
  }, [slideCount]);

  // Automatic carousel
  useEffect(() => {
    if (isHovered || slideCount <= 1) return;

    intervalRef.current = setInterval(() => {
      setIndex((previous) => (previous + 1) % slideCount);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [isHovered, slideCount]);

  // Pause carousel on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const goToSlide = (i) => {
    setIndex(i);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    const threshold = 50;

    if (distance > threshold && index < slideCount - 1) {
      setIndex((previous) => previous + 1);
    } else if (distance < -threshold && index > 0) {
      setIndex((previous) => previous - 1);
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#f5f7f9] py-20 md:py-28"
    >
      {/* Decorative background */}
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-amber-500" />

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
              Our Portfolio
            </span>

            <span className="w-10 h-[2px] bg-amber-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#10283f]">
            Recent Projects
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7">
            A showcase of our industrial projects and technical services
            delivered across Nigeria's oil and gas industry.
          </p>

          <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Projects carousel */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${(cards.length * 100) / cardsPerSlide}%`,
                transform: `translateX(-${index * (100 / slideCount)}%)`,
              }}
            >
              {cards.map((card, cardIndex) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{
                    width: `${100 / cards.length}%`,
                  }}
                >
                  <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500">
                    {/* Project image */}
                    <div className="relative h-[300px] sm:h-[330px] lg:h-[350px] overflow-hidden bg-gray-200">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.label}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                          Project image unavailable
                        </div>
                      )}

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091b2b]/90 via-[#091b2b]/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Project number */}
                      <div className="absolute top-5 left-5 flex items-center justify-center w-11 h-11 rounded-full bg-amber-500 text-[#10283f] font-extrabold shadow-lg">
                        {String(cardIndex + 1).padStart(2, "0")}
                      </div>

                      {/* Project description */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <div className="w-10 h-1 bg-amber-500 mb-3 rounded-full transition-all duration-300 group-hover:w-16" />

                        <p className="text-white text-sm md:text-base font-semibold leading-6 line-clamp-3">
                          {card.label}
                        </p>
                      </div>
                    </div>

                    {/* Project action */}
                    <div className="flex items-center justify-between gap-3 px-5 md:px-6 py-5 bg-white min-h-[85px]">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Project {String(cardIndex + 1).padStart(2, "0")}
                      </span>

                      <a
                        href={card.link}
                        className="inline-flex items-center gap-2 text-[#10283f] font-bold text-sm hover:text-amber-600 transition-colors duration-300 group/link"
                      >
                        {card.linkText}

                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#10283f] text-white group-hover/link:bg-amber-500 group-hover/link:text-[#10283f] transition-all duration-300">
                          <ArrowRight
                            size={17}
                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to project slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-9 bg-amber-500"
                    : "w-2.5 bg-gray-300 hover:bg-[#10283f]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentProjects;
