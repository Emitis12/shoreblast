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

const clients = [client1, client2, client3, client4, client5, client6, client7, client8, client9];

const Clientele = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / itemsPerSlide));
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsPerSlide]);

  // Update items per slide on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = currentSlide * itemsPerSlide;
  const visibleClients = clients.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="py-16 bg-white">
     <h2 className="max-w-sm mx-auto mt-8 text-center text-4xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 rounded-tl-lg rounded-br-lg shadow-md">
  Clientele
</h2>


      <div className="overflow-hidden px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-8"
          >
            {visibleClients.map((client, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={client}
                  alt={`Client ${index}`}
                  className="w-80 h-80 object-contain"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Clientele;
