import React, { useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ship-haulage from "./images/ship-haulage.jpg"
import haulage from "./images/haulage.png"
import downstream from "./images/downstream.jpg"

const cards = [
  {
    title: "General Supplies, Imports & Export",
    description: "We provide reliable sourcing and distribution of goods, handling both local and international trade. Our services ensure timely delivery and quality products across various industries, supporting operational efficiency and global connectivity.",
    image: {ship-haulage}
    detailsImage: "/src/images/exporticon.jpg",
    items: [
      { label: "Service A", link: "/service-a" },
      { label: "Service B", link: "/service-b" },
      { label: "Service C", link: "/service-c" },
    ],
  },
  {
    title: "Road Transportation Services",
    description: "Reliable and efficient movement of goods and equipment across various locations, ensuring timely delivery and operational support for diverse industries.",
    image: {haulage}
    detailsImage: "/src/images/roadicon.jpg",
    items: [
      { label: "Feature X", link: "/feature-x" },
      { label: "Feature Y", link: "/feature-y" },
      { label: "Feature Z", link: "/feature-z" },
    ],
  },
  {
    title: "Downstream Oil and Gas Services",
    description: "Specialized solutions in hydro blasting, blasting, industrial painting, vacuum testing, pressure testing, scaffolding, hydrostatic testing, cathodic protection and marketing of petroleum products, supporting efficient operations and end-user delivery in the oil and gas value chain.",
    image: {downstream}
    detailsImage: "/src/images/downrig.jpg",
    items: [
      { label: "Option 1", link: "/option-1" },
      { label: "Option 2", link: "/option-2" },
      { label: "Option 3", link: "/option-3" },
    ],
  },
];

const Services = () => {
  const [openCards, setOpenCards] = useState([]);

  const toggleCard = (index) => {
    setOpenCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <Card
  key={index}
  className="border border-gray-200 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
  bordered={false}
  onClick={() => toggleCard(index)}
>
  {/* Only show image when not expanded */}
  {!openCards.includes(index) && (
    <img
      alt={card.title}
      src={card.image}
      className="rounded-t-xl h-48 w-full object-cover mb-2"
    />
  )}

  <div className="text-center">
    <h3 className="text-xl font-semibold mb-2 text-blue-700">{card.title}</h3>

    {/* Show description only if not expanded */}
    {!openCards.includes(index) && (
      <p className="text-gray-600">{card.description}</p>
    )}

    {/* Arrow icon with blue color on expanded */}
    <div
      className={`mt-2 text-xl transition-transform duration-300 ${
        openCards.includes(index) ? "rotate-180 text-blue-600" : "text-gray-500"
      }`}
    >
      ↓
    </div>
  </div>

  <AnimatePresence>
    {openCards.includes(index) && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden mt-4 text-left"
      >
        <img
          src={card.detailsImage}
          alt="Details"
          className="rounded-lg w-40 h-32 mx-auto mb-4 object-cover"
        />
        <ul className="pl-2 space-y-2 text-blue-600">
          {card.items.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-lg">›</span>
              <a href={item.link} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    )}
  </AnimatePresence>
</Card>

        ))}
      </div>
    </div>
  );
};

export default Services;