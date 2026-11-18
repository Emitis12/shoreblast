
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Local images
import client1 from "../images/Client1.png";
import client2 from "../images/Client2.png";
import client3 from "../images/Client3.png";
import client4 from "../images/Client4.png";
import client5 from "../images/Client5.jpg";
import client6 from "../images/Client6.jpg";
import client7 from "../images/Client7.jpg";
import client8 from "../images/Client8.jpg";
import client9 from "../images/Client9.jpg";

const clients = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client9,
];

const Clientele = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  const totalSlides = Math.ceil(clients.length / itemsPerSlide);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Update items per slide on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep slide index valid when screen size changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide]);

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

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${itemsPerSlide}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center"
            >
              {visibleClients.map((client, index) => (
                <div
                  key={startIndex + index}
                  className="group flex justify-center items-center min-h-[180px] md:min-h-[220px] p-5 rounded-xl transition-all duration-300 hover:bg-gray-50"
                >
                  <img
                    src={client}
                    alt={`Client ${startIndex + index + 1}`}
                    loading="lazy"
                    className="w-full max-w-[250px] h-[150px] md:h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to client slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-amber-500"
                    : "w-2.5 bg-gray-300 hover:bg-[#10283f]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clientele;
