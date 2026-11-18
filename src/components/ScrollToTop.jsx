
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#10283f] text-[#c69a55] border border-[#c69a55]/50 shadow-xl shadow-black/20 hover:bg-[#c69a55] hover:text-[#091b2b] hover:-translate-y-1 hover:scale-105 transition-all duration-300"
        >
          <FaArrowUp size={19} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
