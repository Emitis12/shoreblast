
import React, { useEffect, useState } from "react";
import { Card, Modal } from "antd";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";
import { ArrowUpRight, X, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

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

// Original services retained as a fallback.
const fallbackCards = [
  {
    title: "General Supplies, Imports & Export",
    description:
      "We provide reliable sourcing and distribution of goods, handling both local and international trade. Our services ensure timely delivery and quality products across various industries, supporting operational efficiency and global connectivity.",
    image: shiphaulage,
    detailsImage: exportIcon,
    items: [
      {
        label: "Provision of Essential Materials and Equipments",
        link: "/Cargo Handling",
      },
      {
        label: "Facilitating Imports and Exports",
        link: "/service-b",
      },
    ],
  },
  {
    title: "Road Transportation Services",
    description:
      "Reliable and efficient movement of goods and equipment across various locations, ensuring timely delivery and operational support for diverse industries.",
    image: haulage,
    detailsImage: roadIcon,
    items: [
      {
        label: "Logistics and Haulage Solutions",
        link: "/feature-x",
      },
    ],
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

// Supabase Storage bucket
const STORAGE_BUCKET = "services-images";

// Convert a stored image path into a public URL.
const getImageUrl = (path, fallback = "") => {
  if (!path) return fallback;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return data?.publicUrl || fallback;
};

const Services = () => {
  const [cards, setCards] = useState(fallbackCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [nestedModalItem, setNestedModalItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select(
          "id, title, summary, description, image_path, details, display_order"
        )
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Unable to load published services:", error);
        return;
      }

      // Keep the original cards if no published database records exist.
      if (!data || data.length === 0) {
        setCards(fallbackCards);
        return;
      }

      const databaseCards = data.map((service) => {
  const details = service.details || {};

  const fallback = fallbackCards.find(
    (card) => card.title === service.title
  );

  return {
    id: service.id,
    title: service.title,
    description:
      service.description ||
      service.summary ||
      fallback?.description ||
      "",
    image: getImageUrl(
      service.image_path,
      fallback?.image || ""
    ),
    detailsImage: getImageUrl(
      details.details_image_path,
      fallback?.detailsImage ||
        getImageUrl(service.image_path)
    ),
    items:
      Array.isArray(details.items) && details.items.length > 0
        ? details.items
        : fallback?.items || [],
    display_order: service.display_order ?? 0,
    isDatabaseRecord: true,
  };
});

const mergedCards = fallbackCards.map((card, index) => ({
  ...card,
  display_order: index + 1,
  isDatabaseRecord: false,
}));

// Replace matching original services with their database versions.
databaseCards.forEach((databaseCard) => {
  const existingIndex = mergedCards.findIndex(
    (card) => card.title === databaseCard.title
  );

  if (existingIndex !== -1) {
    mergedCards.splice(existingIndex, 1);
  }

  mergedCards.push(databaseCard);
});

// Sort all services by display order.
mergedCards.sort(
  (a, b) => a.display_order - b.display_order
);

setCards(mergedCards);
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative py-20 md:py-28 px-5 md:px-8 overflow-hidden bg-[#f6f7f8]">

      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c69a55]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10283f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* SECTION HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-10 h-[2px] bg-[#c69a55]" />
            <span className="text-[#a47b40] text-xs font-bold tracking-[3px] uppercase">
              What We Do
            </span>
            <span className="w-10 h-[2px] bg-[#c69a55]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#10283f] tracking-tight mb-5"
          >
            Our Services
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 65 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-[3px] bg-[#c69a55] mx-auto mb-6"
          />

        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">

          {cards.map((card, index) => (
            <motion.div
              key={card.id || index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: (index % 3) * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCard(card)}
            >

              <Card
                bordered={false}
                className="!rounded-2xl !overflow-hidden !border !border-gray-200/80 !shadow-[0_8px_30px_rgba(16,40,63,0.05)] hover:!shadow-[0_20px_50px_rgba(16,40,63,0.13)] transition-all duration-500 !m-0"
                bodyStyle={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                {/* IMAGE */}
                <div className="relative h-[250px] md:h-[270px] overflow-hidden">

                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/85 via-[#071827]/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  {/* GOLD TOP ACCENT */}
                  <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#c69a55] group-hover:w-full transition-all duration-500" />

                  {/* CARD NUMBER */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/80 text-xs font-semibold tracking-[2px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* ACTION ICON */}
                  <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-[#c69a55] flex items-center justify-center text-[#10283f] shadow-lg group-hover:rotate-[-35deg] transition-transform duration-300">
                    <FaArrowCircleRight className="text-xl" />
                  </div>

                </div>

                {/* CARD CONTENT */}
                <div className="relative bg-white px-6 py-7 min-h-[205px] flex flex-col justify-between">

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#10283f] mb-3 leading-snug group-hover:text-[#a47b40] transition-colors duration-300">
                      {card.title}
                    </h3>

                    <p className="text-sm text-[#74808c] leading-[1.8] line-clamp-3">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                    <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#a47b40]">
                      Explore Service
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="text-[#10283f] group-hover:text-[#c69a55] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />

                  </div>

                </div>
              </Card>

            </motion.div>
          ))}

        </div>
      </div>

      {/* PRIMARY SERVICE MODAL */}
      <Modal
        open={!!selectedCard}
        onCancel={() => setSelectedCard(null)}
        footer={null}
        centered
        width={650}
        closeIcon={<X size={20} />}
        styles={{
          content: {
            padding: 0,
            borderRadius: 18,
            overflow: "hidden",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {selectedCard && (
          <div className="bg-white">

            {/* MODAL IMAGE */}
            <div className="relative h-52 md:h-64 overflow-hidden">

              <img
                src={selectedCard.detailsImage || selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 to-transparent" />

              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-[#e3c28d] text-[10px] tracking-[2px] uppercase font-bold">
                  ShoreBlast Energy
                </span>

                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {selectedCard.title}
                </h3>
              </div>

            </div>

            {/* MODAL BODY */}
            <div className="p-6 md:p-8">

              <p className="text-[#687784] leading-[1.9] text-sm md:text-base mb-7">
                {selectedCard.description}
              </p>

              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-[2px] bg-[#c69a55]" />
                <h4 className="text-sm font-bold text-[#10283f] uppercase tracking-[1.5px]">
                  Service Offerings
                </h4>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {selectedCard.items.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => setNestedModalItem(item)}
                    className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 bg-[#f8f9fa] hover:bg-[#10283f] hover:border-[#10283f] cursor-pointer transition-all duration-300"
                  >
                    <span className="text-sm text-[#344657] group-hover:text-white font-medium transition-colors">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={17}
                      className="shrink-0 text-[#c69a55] group-hover:translate-x-1 transition-transform"
                    />
                  </li>
                ))}

              </ul>

            </div>
          </div>
        )}
      </Modal>

      {/* NESTED MODAL */}
      <Modal
        open={!!nestedModalItem}
        onCancel={() => setNestedModalItem(null)}
        footer={null}
        centered
        width={480}
        closeIcon={<X size={20} />}
        styles={{
          content: {
            padding: 0,
            borderRadius: 16,
            overflow: "hidden",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {nestedModalItem && (
          <div className="p-7 md:p-9 bg-white">

            <div className="w-12 h-1 bg-[#c69a55] mb-6" />

            <span className="text-xs font-bold uppercase tracking-[2px] text-[#a47b40]">
              ShoreBlast Energy
            </span>

            <h4 className="text-2xl font-bold text-[#10283f] mt-3 mb-4">
              {nestedModalItem.label}
            </h4>

            <p className="text-sm leading-relaxed text-gray-600">
              You clicked on:{" "}
              <strong>{nestedModalItem.label}</strong>. You may link this to a
              service detail page or more info.
            </p>

          </div>
        )}
      </Modal>

    </section>
  );
};

export default Services;
