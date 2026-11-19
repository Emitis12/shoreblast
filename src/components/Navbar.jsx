
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUpRight } from "lucide-react";
import logo from "../images/logo.png";

const DownArrowIcon = ({ rotate = false }) => (
  <svg
    className={`w-3.5 h-3.5 transition-transform duration-300 ${
      rotate ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M19 9l-7 7-7-7"
    />
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
    { path: "/news", label: "News & Events" },
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

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to element by ID
  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Main link handler
  const handleLinkClick = (path) => {
    setIsOpen(false);

    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + path);
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gray-100"
          : "bg-[#091b2b]/25 backdrop-blur-sm border-b border-white/15"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="flex items-center justify-between gap-6">

          {/* LOGO */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Shoreblast Energy"
                className={`w-[82px] md:w-[95px] object-contain transition-all duration-500 ${
                  scrolled ? "scale-95" : "scale-100"
                }`}
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <motion.div
            className="hidden lg:flex flex-1 items-center justify-center gap-1"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {links.map((link, index) =>
              link.submenu ? (
                <div className="relative group px-2" key={index}>
                  <button
                    type="button"
                    className={`relative flex items-center gap-2 py-3 text-[13px] xl:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      scrolled
                        ? "text-[#183047] hover:text-[#b58a49]"
                        : "text-white hover:text-[#e5c58c]"
                    }`}
                  >
                    {link.label}

                    <DownArrowIcon />

                    <span
                      className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                        scrolled ? "bg-[#b58a49]" : "bg-[#e5c58c]"
                      }`}
                    />
                  </button>

                  {/* DROPDOWN */}
                  <div className="absolute top-full left-0 pt-3 min-w-[235px] opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                    <div className="bg-white rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.13)] border border-gray-100 p-2 overflow-hidden">
                      {link.submenu.map((sublink) => (
                        <button
                          key={sublink.path}
                          type="button"
                          onClick={() => handleLinkClick(sublink.path)}
                          className="w-full flex items-center justify-between gap-3 text-left px-4 py-3 rounded-lg text-[13px] font-medium text-[#263b4d] hover:bg-[#f4f6f8] hover:text-[#b58a49] transition-all duration-200"
                        >
                          {sublink.label}

                          <ArrowUpRight
                            size={15}
                            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative mx-2 py-3 text-[13px] xl:text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    scrolled
                      ? "text-[#183047] hover:text-[#b58a49]"
                      : "text-white hover:text-[#e5c58c]"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-1 left-0 w-0 h-[2px] transition-all duration-300 hover:w-full ${
                      scrolled ? "bg-[#b58a49]" : "bg-[#e5c58c]"
                    }`}
                  />
                </button>
              )
            )}
          </motion.div>

          {/* CONTACT SECTION */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="tel:+2347063314134"
              className={`flex items-center gap-3 pl-5 border-l transition-colors duration-300 ${
                scrolled
                  ? "border-gray-200 text-[#183047]"
                  : "border-white/30 text-white"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  scrolled
                    ? "bg-[#f2f4f6] text-[#183047]"
                    : "bg-white/10 text-white"
                }`}
              >
                <Phone size={17} strokeWidth={1.8} />
              </div>

              <div className="flex flex-col leading-tight">
                <span
                  className={`text-[10px] uppercase tracking-[1.5px] font-semibold mb-1 ${
                    scrolled ? "text-gray-500" : "text-white/70"
                  }`}
                >
                  Have any questions?
                </span>

                <span className="text-sm xl:text-base font-bold tracking-wide">
                  +234 706 331 4134
                </span>
              </div>
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 ${
                scrolled
                  ? "text-[#183047] bg-gray-100"
                  : "text-white bg-white/10"
              }`}
            >
              {isOpen ? (
                <CloseOutlined className="text-xl" />
              ) : (
                <MenuOutlined className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-[#091b2b] min-h-screen flex flex-col px-7 py-6 overflow-y-auto"
          >
            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img
                  src={logo}
                  alt="Shoreblast Energy"
                  className="w-[90px] object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <CloseOutlined className="text-xl" />
              </button>
            </div>

            {/* MOBILE LINKS */}
            <div className="flex flex-col justify-center flex-1 py-10 gap-5">
              {links.map((link, index) =>
                link.submenu ? (
                  <div
                    key={index}
                    className="border-b border-white/10 pb-4"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(link.label)}
                      className="w-full flex items-center justify-between text-lg font-semibold text-white hover:text-[#e5c58c] transition-colors"
                    >
                      {link.label}

                      <DownArrowIcon rotate={openSubmenus[link.label]} />
                    </button>

                    <AnimatePresence>
                      {openSubmenus[link.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pt-5 pl-4">
                            {link.submenu.map((sublink) => (
                              <button
                                key={sublink.path}
                                type="button"
                                onClick={() => handleLinkClick(sublink.path)}
                                className="text-left text-sm text-white/65 hover:text-[#e5c58c] transition-colors"
                              >
                                {sublink.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => handleLinkClick(link.path)}
                    className="text-left text-lg font-semibold text-white hover:text-[#e5c58c] transition-colors border-b border-white/10 pb-4"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            {/* MOBILE CONTACT */}
            <div className="border-t border-white/10 pt-7 pb-5">
              <span className="text-[10px] uppercase tracking-[2px] text-white/45 font-semibold">
                Have any questions?
              </span>

              <a
                href="tel:+2347063314134"
                className="flex items-center gap-3 mt-3 text-white text-lg font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={17} />
                </div>

                +234 706 331 4134
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
