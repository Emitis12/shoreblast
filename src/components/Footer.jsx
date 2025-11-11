import React from "react";
import { FaTelegramPlane, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 pt-10">
    {/* Top social bar */}
    <div className="max-w-7xl mx-auto px-6 flex justify-center space-x-6 mb-8">
      <a href="https://www.facebook.com/share/1CDKhq9bMD/" aria-label="Telegram" className="hover:text-white"><FaTelegramPlane size={24} /></a>
      <a href="https://wa.link/0hyqwp" aria-label="WhatsApp" className="hover:text-white"><FaWhatsapp size={24} /></a>
      <a href="https://www.instagram.com/shoreblast2015?igsh=bzBza2sxdTNhdHhz" aria-label="Instagram" className="hover:text-white"><FaInstagram size={24} /></a>
    </div>

    {/* Links section */}
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
      <div>
        <h4 className="font-semibold mb-4">CORPORATE</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/about" className="hover:text-white">About Us</a></li>
          <li><a href="/human-resources" className="hover:text-white">Human Resources</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">SERVICES</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/services/power-plant" className="hover:text-white">Power Plant</a></li>
          <li><a href="/services/refinery" className="hover:text-white">Refinery</a></li>
          <li><a href="/services/tank-farm" className="hover:text-white">Tank & Tank Farm</a></li>
          <li><a href="/services/piping" className="hover:text-white">Piping</a></li>
          <li><a href="/services/steel-structure" className="hover:text-white">Steel Structure</a></li>
          <li><a href="/services" className="hover:text-white">Show all</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">COMPLETED PROJECT</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#projects" className="hover:text-white">View Projects</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">E-CATALOGUE</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/catalogue" className="hover:text-white">View Catalogue</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">HEAD OFFICE</h4>
        <ul className="space-y-1 text-gray-400">
          <li><a href="tel:+2347063314134" className="hover:text-white">+234 706 331 4134</a></li>
          <li><a href="mailto:info@shoreblastenergy.com" className="hover:text-white">info@shoreblastenergy.com</a></li>
          <li>
            3 Nkwa Close, Off Basin Authority<br />
            8 Miles, Calabar, Cross River State, Nigeria
          </li>
        </ul>
        <br />
        <h4 className="font-semibold mb-4">PROJECT SITE OFFICE</h4>
        <ul className="space-y-1 text-gray-400">
          <li>
            Port Harcourt Refinery Complex<br />
            Alesa Eleme, Rivers State, Nigeria
          </li>
        </ul>
      </div>
    </div>


    {/* Bottom bar */}
    <div className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>Copyright Shore Blast © 2025. All Rights Reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/sitemap" className="hover:text-white">Sitemap</a>
         
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
