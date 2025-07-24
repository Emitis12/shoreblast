import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/career", label: "Career" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Completed Projects" },
    { path: "/catelogue", label: "Catalogue" },
    { path: "/about", label: "About Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dividerColor = scrolled ? "border-black" : "border-white";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-white shadow-md border-black" : "bg-transparent border-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex w-full items-center justify-between">
          {/* Logo with close border-right */}
          <div className="flex items-center">
            <div className={`border-r ${dividerColor} pr-4`}>
              <Link to="/">
                <img src={logo} alt="Logo" className="w-28 object-contain" />
              </Link>
            </div>
          </div>

          {/* Nav Links */}
          <motion.div
            className="hidden md:flex flex-grow justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-base font-medium mx-3 ${
                  scrolled ? "text-gray-800" : "text-white"
                } hover:text-blue-600 transition`}
              >
                <span
                  className={`pb-1 border-b-2 transition-all duration-200 ${
                    location.pathname === link.path
                      ? "border-blue-600"
                      : "border-transparent hover:border-blue-600"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </motion.div>

          {/* Contact Us on Desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+2348012345678"
              className={`border-l ${dividerColor} pl-1 flex items-center gap-3 transition duration-300 h-full ${
                scrolled ? "text-blue-500 hover:text-blue-800" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-35 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-.586 1.414L7.414 9.414a16.001 16.001 0 007.172 7.172l1.586-1.586A2 2 0 0117 14h2a2 2 0 012 2v2a2 2 0 01-2 2h-.5C9.94 20 4 14.06 4 6.5V6a1 1 0 00-1-1H3z"
                />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">Have any questions?</span>
                <span className="text-2xl text-black">+234 801 234 5678</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-3xl ${scrolled ? "text-black" : "text-white"}`}
            >
              {isOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Fullscreen Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full bg-gray-200 z-50 px-6 py-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <img src={logo} alt="Logo" className="w-20" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-3xl text-gray-800"
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow gap-6">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
