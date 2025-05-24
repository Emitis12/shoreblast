import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import logo from "./images/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/career", label: "Career" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Completed Projects" },
    { path: "/catelogue", label: "Catelogue" },
    { path: "/about", label: "About Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 px-6 py-4 flex items-center justify-between shadow-md h-20 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
     
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Brand Logo"
            className="w-18 h-18 object-contain"
          />
        </Link>
      </div>

      
      {/* Centered Nav Links with Border */}
      <div className="hidden md:flex flex-1 justify-center">
  <div
    className={`flex gap-12 rounded-2xl px-6 py-2 font-semibold backdrop-blur-sm transition-all duration-300 ${
      scrolled
        ? "border border-gray-300 text-gray-800 bg-white shadow-sm"
        : "border border-white text-white"
    }`}
  >

    {links.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`hover:text-blue-600 pb-1 ${
          location.pathname === link.path
            ? "border-b-2 border-blue-600 text-blue-600"
            : ""
        }`}
      >
        {link.label}
      </Link>
    ))}
  </div>
</div>


      {/* Right AntD Button */}
      <div className="hidden md:flex items-center">
        <Button type="primary" className="bg-blue-600 hover:bg-blue-400 border-none">
          Contact Us
        </Button>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="border border-blue-600 absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col gap-4 md:hidden px-6 z-20">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-orange-500 ${
                location.pathname === link.path ? "font-bold underline" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button type="primary" className="w-56 bg-blue-blue hover:bg-blue-400 border-none">
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
