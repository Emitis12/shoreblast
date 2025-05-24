import React, { useEffect, useState } from "react";

const Hero = () => {
  const images = [
    "/images/sandblasting.jpg",
    "/images/sandblasting1.jpg",
    "/images/sandblasting2.jpg",
  ];
 
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval); // clear interval on unmount
  }, []);

  return (
    <section
      className="min-h-[100vh] flex flex-col justify-center items-center text-center px-4 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <h1 className="pt-30 text-4xl md:text-6xl font-bold text-white mb-4">
        ShoreBlast Energy
      </h1>
      <p className="text-lg md:text-xl text-white mb-6 max-w-xl">
        Discover our services and offerings tailored just for you. We’re here to help you succeed.
      </p>
      <button className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500">
        Get A Free Quotation
      </button>
    </section>
  );
};

export default Hero;
