import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const DownArrowIcon = ({ rotate = false }) => (
  <svg
    className={`w-3 h-3 transition-transform duration-300 ${rotate ? "rotate-180" : "rotate-0"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      label: "Career",
      submenu: [
        { path: "/human-resource", label: "Human Resource" },
        { path: "/message", label: "Message From the CEO" },
      ],
    },
    { path: "#services", label: "Services" },
    {
      label: "Projects",
      submenu: [
        { path: "#projects", label: "Recent Projects" },
        { path: "/track-records", label: "Track Records" },
      ],
    },
    { path: "/catelogue", label: "Catalogue" },
    {
      label: "About",
      submenu: [
        { path: "/About", label: "About Us" },
        { path: "/investment", label: "Investment Opportunity" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to element by ID
  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Main link handler
  const handleLinkClick = (path) => {
    setIsOpen(false);

    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + path); // Push route, then scroll after short delay
        setTimeout(() => scrollToHash(path), 200);
      } else {
        scrollToHash(path);
      }
    } else {
      navigate(path);
    }
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const dividerColor = scrolled ? "border-black" : "border-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
      scrolled
        ? "bg-gradient-to-r from-gray-100 via-gray-100 to-red-600 shadow-md border-black"
        : "bg-transparent border-white"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`border-r ${dividerColor} pr-4`}>
              <Link to="/">
                <img src={logo} alt="Logo" className="w-20 object-contain" />
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex flex-grow justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {links.map((link, index) =>
              link.submenu ? (
                <div className="relative group mx-3" key={index}>
                  <span
                    className={`text-base font-medium cursor-pointer ${
                      scrolled ? "text-gray-800" : "text-white"
                    } hover:text-blue-600 flex items-center gap-1`}
                  >
                    <span className="pb-1 border-b-2 flex items-center gap-1 border-transparent group-hover:border-blue-600 transition-all">
                      {link.label}
                      <DownArrowIcon />
                    </span>
                  </span>
                  <div className="absolute top-full mt-2 left-0 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 transform scale-95 group-hover:scale-100 z-10">
                    {link.submenu.map((sublink) => (
                      <button
                        key={sublink.path}
                        className="block px-4 py-2 whitespace-nowrap text-sm text-gray-800 hover:bg-blue-100 text-left w-full"
                        onClick={() => handleLinkClick(sublink.path)}
                      >
                        {sublink.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative text-base font-medium mx-3 cursor-pointer ${
                    scrolled ? "text-gray-800" : "text-white"
                  } hover:text-blue-600 transition`}
                >
                  <span className="pb-1 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200">
                    {link.label}
                  </span>
                </button>
              )
            )}
          </motion.div>

          {/* Call Section */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+2347063314134"
              className={`border-l ${dividerColor} pl-1 flex items-center gap-3 transition duration-300 h-full ${
                scrolled ? "text-white hover:text-gray-300" : "text-white"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-.586 1.414L7.414 9.414a16.001 16.001 0 007.172 7.172l1.586-1.586A2 2 0 0117 14h2a2 2 0 012 2v2a2 2 0 01-2 2h-.5C9.94 20 4 14.06 4 6.5V6a1 1 0 00-1-1H3z" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">Have any questions?</span>
                <span className="text-2xl text-black">+234 706 331 4134</span>
              </div>
            </a>
          </div>

          {/* Mobile menu toggle */}
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

      {/* Mobile Dropdown */}
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
              {links.map((link, index) =>
                link.submenu ? (
                  <div key={index} className="flex flex-col items-center text-center">
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600 flex items-center gap-1"
                    >
                      {link.label}
                      <DownArrowIcon rotate={openSubmenus[link.label]} />
                    </button>
                    {openSubmenus[link.label] && (
                      <div className="mt-2 flex flex-col items-center">
                        {link.submenu.map((sublink) => (
                          <button
                            key={sublink.path}
                            onClick={() => handleLinkClick(sublink.path)}
                            className="text-sm text-gray-700 hover:text-blue-600 mt-1"
                          >
                            {sublink.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
