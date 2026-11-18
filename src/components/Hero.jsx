
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import sandblasting from "../images/sandblasting.jpeg";
import sandblasting1 from "../images/sandblasting1.jpeg";
import sandblasting2 from "../images/sandblasting2.jpeg";
import sandblasting3 from "../images/sandblasting3.jpeg";

const Hero = () => {
  const slides = [
    {
      image: sandblasting,
      title: "ShoreBlast Energy",
      description:
        "Expert engineering solutions—ranging from Sandblasting and Industrial painting to pipeline maintenance, logistics, and manpower services—primarily for the oil and gas sector.",
      buttonText: "Get A Free Quotation",
      buttonLink: "#proposal",
    },
    {
      image: sandblasting1,
      title: "Industrial Sandblasting",
      description:
        "We offer high-performance surface treatment services for structural steel, tanks, and pipes—ensuring corrosion protection and lasting durability.",
      buttonText: "Explore Our Services",
      buttonLink: "#proposal",
    },
    {
      image: sandblasting2,
      title: "Precision Painting & Coating",
      description:
        "From marine to offshore facilities, our industrial painting solutions are tailored to withstand extreme environments and extend asset life.",
      buttonText: "Request a Consultation",
      buttonLink: "#proposal",
    },
    {
      image: sandblasting3,
      title: "Pipeline & Asset Maintenance",
      description:
        "Comprehensive maintenance services to ensure the integrity, reliability, and performance of pipelines and vital oil & gas assets.",
      buttonText: "Learn More",
      buttonLink: "#proposal",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === slides.length - 1 ? 0 : prevImage + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const activeSlide = slides[currentImage];

  return (
    <section className="relative min-h-[100svh] pt-20 w-full overflow-hidden flex items-center bg-[#091b2b]">

      {/* BACKGROUND SLIDES */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Shoreblast industrial engineering - ${index + 1}`}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1400ms] ease-in-out ${
              index === currentImage
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      {/* CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/95 via-[#0a2033]/75 to-[#091b2b]/25" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/70 via-transparent to-[#071827]/20" />

      {/* SUBTLE DECORATIVE ELEMENT */}
      <div className="absolute top-0 right-[10%] h-full w-px bg-white/10 hidden lg:block" />

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 pt-32 pb-32">

        <div className="max-w-4xl text-left">

          {/* TOP LABEL */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${currentImage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-4 mb-7"
            >
              <span className="w-12 h-[2px] bg-[#c69a55]" />

              <span className="text-[#e3c28d] text-[11px] md:text-xs font-semibold tracking-[3px] uppercase">
                ShoreBlast Energy
              </span>
            </motion.div>
          </AnimatePresence>

          {/* HEADLINE */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentImage}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.08] font-bold tracking-[-2px] text-white mb-7 max-w-4xl"
            >
              {activeSlide.title}
            </motion.h1>
          </AnimatePresence>

          {/* DESCRIPTION */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`description-${currentImage}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-white/80 text-base md:text-lg lg:text-xl leading-[1.9] max-w-2xl mb-10 font-light"
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA BUTTON */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`button-${currentImage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href={activeSlide.buttonLink}
                className="group inline-flex items-center gap-5 bg-[#c69a55] hover:bg-[#d6ae70] text-[#10283f] px-7 md:px-9 py-4 md:py-5 text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.2)]"
              >
                {activeSlide.buttonText}

                <span className="w-8 h-8 rounded-full bg-[#10283f]/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight size={17} />
                </span>
              </a>
            </motion.div>
          </AnimatePresence>

          {/* SLIDE PAGINATION */}
          <div className="flex items-center gap-5 mt-16">

            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentImage ? "true" : undefined}
                  className={`relative h-[3px] transition-all duration-500 ${
                    index === currentImage
                      ? "w-12 bg-[#c69a55]"
                      : "w-5 bg-white/35 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <span className="text-white/60 text-xs tracking-[2px] font-medium">
              0{currentImage + 1} <span className="mx-1">/</span> 0{slides.length}
            </span>

          </div>
        </div>
      </div>

      {/* BOTTOM DECORATIVE LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10">
        <motion.div
          key={currentImage}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-[#c69a55]"
        />
      </div>

    </section>
  );
};

export default Hero;
