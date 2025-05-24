import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/services";
import NotFound from "./pages/NotFound";
import InfoCard from "./components/InfoCard";
import CookieConsent from "./components/CookieConsent";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <div  className="bg-gray-100 p-10">
        <Services />
      </div>
      <div>
        <InfoCard />
      </div>
       <div>
      {/* Your homepage content */}
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to Shoreblast Energy</h1>

      {/* Cookie Consent Component */}
      <CookieConsent />
    </div>
    </>
    
  );
};

export default App;