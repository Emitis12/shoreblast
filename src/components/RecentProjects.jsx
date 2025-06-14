import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import card1 from "../images/card1.jpg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card4 from "../images/card4.jpg";
import card5 from "../images/card5.png";
import card6 from "../images/card6.jpg";
import card7 from "../images/card7.jpg";
import card8 from "../images/card8.jpg";
import card9 from "../images/card9.jpg";

const allCards = [
  { id: 1, image: card1, label: "Alkanes Petroleum Limited - Sandblasting of product and fire hydrant tanks", link: "#", linkText: "View More" },
  { id: 2, image: card2, label: "Montego Upstream Services Limited - Grit-Blasting and Painting of Product and Hydrant Pipelines", link: "#", linkText: "View More" },
  { id: 3, image: card3, label: "FyneField Petroleum - Sand-Blasting and Painting of Product Tanks and Pipelines", link: "#", linkText: "View More" },
  { id: 4, image: card4, label: "ECM Terminals Limited - Integrity Test (NDT, Radiography and Cathodic Installation)", link: "#", linkText: "View More" },
  { id: 5, image: card5, label: "Dormanlong Engineering Ltd - SandBlasting and Painting of Crude Oil Tanks", link: "#", linkText: "View More" },
  { id: 6, image: card6, label: "Dormanlong Engineering Ltd - Maintenance of Product Pipelines", link: "#", linkText: "View More" },
  { id: 7, image: card7, label: "Puma Bitumen Resources Ltd - Repainting of Loading Gantry Station, Thermal Storage Facility and Weigh Bridge", link: "#", linkText: "View More" },
  { id: 8, image: card8, label: "Orient Petroleum Refinery - Grit-Blasting and Painting of Crude Oil Tanks", link: "#", linkText: "View More" },
  { id: 9, image: card9, label: "Unicem Plant, Mfamosing - Industrial Tank Cleansing and Sludge Evacuation", link: "#", linkText: "View More" }
];

function RecentProjects() {
  const [index, setIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const intervalRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth < 640 ? 1 : 3);
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const slideCount = Math.ceil(allCards.length / cardsPerSlide);

  useEffect(() => {
    const startAutoplay = () => {
      if (!isHoveredRef.current) {
        intervalRef.current = setInterval(() => {
          setIndex((prev) => (prev + 1) % slideCount);
        }, 4000);
      }
    };
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, [index, slideCount]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, 4000);
  };

  const goToSlide = (i) => setIndex(i);

  // Swipe handlers
  const handleTouchStart = (e) => setTouchStartX(e.changedTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.changedTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const threshold = 50;
    if (distance > threshold && index < slideCount - 1) setIndex(index + 1);
    else if (distance < -threshold && index > 0) setIndex(index - 1);
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const visibleCards = allCards.slice(index * cardsPerSlide, (index + 1) * cardsPerSlide);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-serif inline-block relative">
          Recent Projects
          <span className="absolute left-1/2 -bottom-2 w-[120px] h-3 -translate-x-1/2 bg-[url('data:image/svg+xml;utf8,<svg width=120 height=6 xmlns=http://www.w3.org/2000/svg><path d=\'M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3 T 120 3\' stroke=\'%23a855f7\' stroke-width=\'2\' fill=\'none\' /></svg>')] bg-no-repeat bg-center" />
        </h2>
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out">
            {visibleCards.map((card) => (
              <div key={card.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 flex-shrink-0">
                <div className="relative flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl">
                  {/* Image Section */}
                  <div className="h-100 overflow-hidden relative group">
                    <div className="absolute bottom-2 right-2 sm:top-[87%] sm:left-50 sm:bottom-auto sm:right-auto sm:-translate-y-1/2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-l-md z-10 shadow-md max-w-[90%] break-words transition-opacity duration-300 group-hover:opacity-0">
                      {card.label}
                    </div>
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Action Section */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-5 flex justify-end items-center min-h-[100px]">
                    <a
                      href={card.link}
                      className="group flex flex-col items-end text-white space-y-2 transition"
                    >
                      <div className="group-hover:translate-x-1 group-hover:bg-blue-500 w-10 h-10 bg-blue-600 bg-opacity-20 rounded-full flex items-center justify-center shadow transform transition-all duration-300">
                        <ArrowRight className="text-white w-5 h-5 transition duration-300" />
                      </div>
                      <p className="text-sm font-semibold group-hover:text-white transition-colors duration-300">
                        {card.linkText}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300"} transition-all duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentProjects;
