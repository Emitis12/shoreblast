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
import SocialMediaIcons from "./components/SocialMediaIcons";
import TwoVideosSection from "./components/TwoVideosSection";
import ProposalFormSection from "./components/ProposalFormSection";
import CoffeeCall from "./components/CoffeeCall";
import Footer from "./components/Footer";
import bgImage from "./images/coffeeimg.png";

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

      <div data-aos="fade-up">
        <TwoVideosSection />
        </div>

      <div className="bg-gray-100 p-10" data-aos="fade-up">
        <Services />
      </div>

      <div data-aos="fade-up">
        <InfoCard />
      </div>
      
      <div className="bg-gray-100 p-10" data-aos="fade-up">
        <RecentProjects />
      </div>
      
      <div className="bg-gradient-to-r from-blue-900 via-red-600 to-red-600">
    <ProposalFormSection />
    </div>

    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <CoffeeCall />
    </div>

      <div>
        <Clientele />
      </div>

      <div>
        <CookieConsent />
      </div>

      <div>
        <SocialMediaIcons />
        </div>

        <div className="bg-gradient-to-r from-red-600 via-blue-900 to-blue-900">
    <Footer />
    </div>
    </>
  );
};

export default App;
