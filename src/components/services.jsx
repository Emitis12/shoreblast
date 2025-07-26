import React, { useState } from "react";
import { Card, Modal } from "antd";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

import shiphaulage from "../images/shiphaulage.jpg";
import haulage from "../images/haulage.png";
import downstream from "../images/downstream.jpeg";
import exportIcon from "../images/exporticon.jpg";
import roadIcon from "../images/roadicon.jpg";
import downrig from "../images/downrig.jpg";
import midstream from "../images/midstream.jpg";
import offshore from "../images/offshore.jpg";
import contracting from "../images/contracting.jpg";
import ropeaccess from "../images/ropeaccess.jpg";

const cards = [
  {
    title: "General Supplies, Imports & Export",
    description:
      "We provide reliable sourcing and distribution of goods, handling both local and international trade. Our services ensure timely delivery and quality products across various industries, supporting operational efficiency and global connectivity.",
    image: shiphaulage,
    detailsImage: exportIcon,
    items: [
      { label: "Provision of Essential Materials and Equipments", link: "/Cargo Handling" },
      { label: "Facilitating Imports and Exports", link: "/service-b" },
    ],
  },
  {
    title: "Road Transportation Services",
    description:
      "Reliable and efficient movement of goods and equipment across various locations, ensuring timely delivery and operational support for diverse industries.",
    image: haulage,
    detailsImage: roadIcon,
    items: [{ label: "Logistics and Haulage Solutions", link: "/feature-x" }],
  },
  {
    title: "Downstream Oil and Gas Services",
    description:
      "Specialized solutions in hydro blasting, industrial painting, vacuum testing, scaffolding, and petroleum product marketing to enhance oil and gas operations.",
    image: downstream,
    detailsImage: downrig,
    items: [
      { label: "Blasting", link: "/option-1" },
      { label: "Hydro Blasting", link: "/option-2" },
      { label: "Logistics/Haulage", link: "/option-3" },
      { label: "Scaffolding", link: "/option-3" },
      { label: "Vacuum Testing", link: "/option-3" },
      { label: "Industrial Painting", link: "/option-3" },
      { label: "Pressure Testing", link: "/option-3" },
      { label: "Hydrostatic Testing", link: "/option-3" },
      { label: "Cathodic Protection", link: "/option-3" },
      { label: "Manpower Outsourcing", link: "/option-3" },
    ],
  },
  {
    title: "MidStream Oil and Gas Service",
    description:
      "We manage storage, transportation, and distribution of petroleum products between upstream and downstream sectors.",
    image: midstream,
    detailsImage: midstream,
    items: [
      { label: "Pipeline Transport", link: "/midstream-pipeline" },
      { label: "Tank Farm Operations", link: "/tank-farm" },
    ],
  },
  {
    title: "Offshore Oil and Gas Services",
    description:
      "We deliver critical support for offshore platforms, ensuring safe and efficient operations in deepwater environments.",
    image: offshore,
    detailsImage: offshore,
    items: [
      { label: "Rig Support", link: "/rig-support" },
      { label: "Subsea Operations", link: "/subsea" },
    ],
  },
  {
    title: "General Contracting Services",
    description:
      "Execution of turnkey construction and infrastructure projects with full lifecycle management and quality control.",
    image: contracting,
    detailsImage: contracting,
    items: [
      { label: "Civil Construction", link: "/civil" },
      { label: "Project Management", link: "/management" },
    ],
  },
  {
    title: "Rope Access Techniques",
    description:
      "We use rope-based systems for safe, efficient access to elevated or difficult-to-reach structures without scaffolding.",
    image: ropeaccess,
    detailsImage: ropeaccess,
    items: [
      { label: "Structural Inspections", link: "/inspection" },
      { label: "Maintenance & Repairs", link: "/maintenance" },
    ],
  },
];

const Services = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [nestedModalItem, setNestedModalItem] = useState(null);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-900 via-red-600 to-red-600 bg-clip-text text-transparent inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[5px] after:bg-[url('/images/zigzag.svg')] after:bg-repeat-x after:bg-center after:animate-pulse">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            <Card
              className="rounded-2xl shadow-xl overflow-hidden h-[450px] flex flex-col !m-0 !border-none"
              bordered={false}
              bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div className="h-[65%] relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <FaArrowCircleRight className="absolute bottom-2 right-2 text-white text-2xl bg-blue-900 rounded-full" />
              </div>
              <div className="h-[35%] bg-gradient-to-r from-blue-900 via-red-600 to-red-600 text-white px-4 py-6 text-center flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm line-clamp-3 mb-0">{card.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Primary Modal */}
      <Modal
        open={!!selectedCard}
        onCancel={() => setSelectedCard(null)}
        footer={null}
        centered
        width={600}
      >
        {selectedCard && (
          <div className="text-left">
            <img
              src={selectedCard.detailsImage}
              alt={selectedCard.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-2 text-blue-700">
              {selectedCard.title}
            </h3>
            <p className="mb-4 text-gray-700">{selectedCard.description}</p>
            <ul className="space-y-2">
              {selectedCard.items.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setNestedModalItem(item)}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  › {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      {/* Nested Modal */}
      <Modal
        open={!!nestedModalItem}
        onCancel={() => setNestedModalItem(null)}
        footer={null}
        centered
        width={500}
      >
        {nestedModalItem && (
          <div>
            <h4 className="text-xl font-bold mb-2">{nestedModalItem.label}</h4>
            <p className="text-gray-600">
              You clicked on: <strong>{nestedModalItem.label}</strong>. You may link this to a
              service detail page or more info.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Services;
