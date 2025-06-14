import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/services";
import NotFound from "./pages/NotFound";
import InfoCard from "./components/InfoCard";
import CookieConsent from "./components/CookieConsent";
import Clientele from "./components/Clientele";
import RecentProjects from "./components/RecentProjects";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <div className="bg-gray-100 p-10" data-aos="fade-up">
        <Services />
      </div>

      <div data-aos="fade-up">
        <InfoCard />
      </div>
      
      <div className="bg-gray-100 p-10" data-aos="fade-up">
        <RecentProjects />
      </div>

      <div>
        <Clientele />
      </div>

 <div className="flex justify-center my-12" data-aos="zoom-in">
        <div className="w-3/4 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-md" />
      </div>
      
      <div>
        <CookieConsent />
      </div>
    </>
  );
};

export default App;
