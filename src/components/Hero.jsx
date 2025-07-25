import React, { useEffect, useState } from "react";
import sandblasting from "../images/sandblasting.jpg";
import sandblasting1 from "../images/sandblasting1.jpg";
import sandblasting2 from "../images/sandblasting2.jpg";

const Hero = () => {
  const slides = [
    {
      image: sandblasting,
      title: "ShoreBlast Energy",
      description:
        "Expert engineering solutions—ranging from Sandblasting and Industrial painting to pipeline maintenance, logistics, and manpower services—primarily for the oil and gas sector.",
      buttonText: "Get A Free Quotation",
      buttonLink: "#proposal", // <-- your link here
    },
    {
      image: sandblasting1,
      title: "Industrial Sandblasting",
      description:
        "We offer high-performance surface treatment services for structural steel, tanks, and pipes—ensuring corrosion protection and lasting durability.",
      buttonText: "Explore Our Services",
      buttonLink: "#proposal", // <-- your link here
    },
    {
      image: sandblasting2,
      title: "Precision Painting & Coating",
      description:
        "From marine to offshore facilities, our industrial painting solutions are tailored to withstand extreme environments and extend asset life.",
      buttonText: "Request a Consultation",
      buttonLink: "#proposal", // <-- your link here
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex justify-center items-center text-center px-4">
      {/* Background images */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`slide-${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100 z-0" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay content */}
      <div className="relative z-10 bg-opacity-50 p-6 rounded-md">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 pt-30">
          {slides[currentImage].title}
        </h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-xl">
          {slides[currentImage].description}
        </p>
        <a
          href={slides[currentImage].buttonLink}
          className="inline-block bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition"
        >
          {slides[currentImage].buttonText}
        </a>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-blue-500 scale-125" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
