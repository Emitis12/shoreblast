
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SocialMediaIcons = ({ hiddenOnMobile }) => {
  const socialButton =
    "w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#10283f] border border-[#c69a55]/40 shadow-lg shadow-black/20 hover:bg-[#c69a55] hover:text-[#091b2b] hover:scale-110 hover:-translate-y-1 transition-all duration-300";

  return (
    <div
      className={`fixed bottom-24 right-4 z-50 flex flex-col items-center gap-3 transition-all duration-500 ${
        hiddenOnMobile
          ? "opacity-0 pointer-events-none translate-y-5"
          : "opacity-100 translate-y-0"
      }`}
    >
      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1CDKhq9bMD/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        title="Facebook"
        className={socialButton}
      >
        <FaFacebookF size={19} />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/shoreblast2015?igsh=bzBza2sxdTNhdHhz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        title="Instagram"
        className={socialButton}
      >
        <FaInstagram size={20} />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.link/0hyqwp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className={socialButton}
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Email */}
      <a
        href="mailto:info.shoreblastenergy@gmail.com"
        aria-label="Email"
        title="Email"
        className={socialButton}
      >
        <MdEmail size={22} />
      </a>

      {/* Phone */}
      <a
        href="tel:+2347063314134"
        aria-label="Call Shore Blast"
        title="Call Us"
        className={socialButton}
      >
        <FaPhone size={18} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
