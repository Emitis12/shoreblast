import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import About from "./pages/About";
import TrackRecords from "./pages/TrackRecords";
import Investment from "./pages/Investment";
import MessageFromCEO from "./pages/Message";
import HumanResource from "./pages/HumanResource";
import ScrollToTop from "./components/ScrollToTop";

// PageContent wrapper for conditional shared sections
const PageContent = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isTrackRecords = location.pathname.startsWith("/track-records");
  const isInvestment = location.pathname.startsWith("/investment");
  const isMessageFromCEO = location.pathname.startsWith("/message");
  const isHumanResource = location.pathname.startsWith("/human-resource");

  return (
    <>
      {/* Only for Home Page */}
      {isHome && (
        <>
          <Hero />
          <div data-aos="fade-up">
            <TwoVideosSection />
          </div>
          <div id="services" className="bg-gray-100 p-10" data-aos="fade-up">
            <Services />
          </div>
          <div id="about" data-aos="fade-up">
            <InfoCard />
          </div>
          <div id="projects" className="bg-gray-100 p-10" data-aos="fade-up">
            <RecentProjects />
          </div>
          <div>
            <ScrollToTop />
          </div>
          <Clientele />
          <CookieConsent />
          <SocialMediaIcons />
        </>
      )}

      {/* Shared Sections */}
      {(isHome || isAbout || isTrackRecords || isInvestment || isMessageFromCEO || isHumanResource) && (
        <>
          <div id="proposal" className="bg-gradient-to-r from-blue-900 via-red-600 to-red-600">
            <ProposalFormSection />
          </div>
          <div
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <CoffeeCall />
          </div>
          <div className="bg-gradient-to-r from-red-600 via-blue-900 to-blue-900">
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Scroll to hash section on initial load
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageContent />} />
        <Route path="/about" element={<><About /><PageContent /></>} />
        <Route path="/investment" element={<><Investment /><PageContent /></>} />
        <Route path="/message" element={<><MessageFromCEO /><PageContent /></>} />
        <Route path="/human-resource" element={<><HumanResource /><PageContent /></>} />
        <Route path="/track-records/*" element={<><TrackRecords /><PageContent /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
