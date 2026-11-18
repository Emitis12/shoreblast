
import React from "react";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const linkStyle =
    "text-gray-400 hover:text-[#c69a55] transition-colors duration-300 inline-flex items-center gap-1 group";

  const headingStyle =
    "text-white font-bold text-sm tracking-wider mb-5 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-9 after:h-[2px] after:bg-[#c69a55]";

  return (
    <footer className="bg-[#091b2b] text-gray-200 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#183f5c]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c69a55]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">

        {/* Top Social Bar */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-5">

            <div className="text-center sm:text-left">
              <p className="text-[#c69a55] text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Stay Connected
              </p>
              <p className="text-white text-lg font-semibold">
                Connect with Shore Blast
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1CDKhq9bMD/"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#091b2b] hover:bg-[#c69a55] hover:border-[#c69a55] transition-all duration-300"
              >
                <FaTelegramPlane size={19} />
              </a>

              <a
                href="https://wa.link/0hyqwp"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#091b2b] hover:bg-[#c69a55] hover:border-[#c69a55] transition-all duration-300"
              >
                <FaWhatsapp size={19} />
              </a>

              <a
                href="https://www.instagram.com/shoreblast2015?igsh=bzBza2sxdTNhdHhz"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-gray-300 hover:text-[#091b2b] hover:bg-[#c69a55] hover:border-[#c69a55] transition-all duration-300"
              >
                <FaInstagram size={19} />
              </a>
            </div>

          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* Corporate */}
            <div>
              <h4 className={headingStyle}>CORPORATE</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/about" className={linkStyle}>
                    About Us <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/human-resources" className={linkStyle}>
                    Human Resources <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className={headingStyle}>SERVICES</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/services/power-plant" className={linkStyle}>
                    Power Plant <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/services/refinery" className={linkStyle}>
                    Refinery <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/services/tank-farm" className={linkStyle}>
                    Tank & Tank Farm <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/services/piping" className={linkStyle}>
                    Piping <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/services/steel-structure" className={linkStyle}>
                    Steel Structure <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-[#c69a55] hover:text-white transition-colors inline-flex items-center gap-1 font-semibold">
                    Show all <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className={headingStyle}>COMPLETED PROJECT</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#projects" className={linkStyle}>
                    View Projects <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Catalogue */}
            <div>
              <h4 className={headingStyle}>E-CATALOGUE</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/catalogue" className={linkStyle}>
                    View Catalogue <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className={headingStyle}>HEAD OFFICE</h4>

              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-[#c69a55] shrink-0 mt-1" />
                  <a href="tel:+2347063314134" className="hover:text-[#c69a55] transition-colors">
                    +234 706 331 4134
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-[#c69a55] shrink-0 mt-1" />
                  <a href="mailto:info@shoreblastenergy.com" className="hover:text-[#c69a55] transition-colors break-all">
                    info@shoreblastenergy.com
                  </a>
                </li>

                <li className="flex items-start gap-3 leading-relaxed">
                  <MapPin size={17} className="text-[#c69a55] shrink-0 mt-1" />
                  <span>
                    3 Nkwa Close, Off Basin Authority
                    <br />
                    8 Miles, Calabar, Cross River State, Nigeria
                  </span>
                </li>
              </ul>

              <div className="mt-8">
                <h4 className={headingStyle}>PROJECT SITE OFFICE</h4>

                <div className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                  <MapPin size={17} className="text-[#c69a55] shrink-0 mt-1" />
                  <span>
                    Port Harcourt Refinery Complex
                    <br />
                    Alesa Eleme, Rivers State, Nigeria
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#061421] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">

            <p className="text-center md:text-left">
              Copyright Shore Blast © 2026. All Rights Reserved.
            </p>

            <div>
              <a
                href="/sitemap"
                className="hover:text-[#c69a55] transition-colors"
              >
                Sitemap
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
