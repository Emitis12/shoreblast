import React from "react";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    image: "https://source.unsplash.com/random/300x200?tech",
    label: "New",
    link: "#",
    linkText: "View More"
  },
  {
    id: 2,
    image: "https://source.unsplash.com/random/300x200?code",
    label: "Hot",
    link: "#",
    linkText: "Explore"
  },
  {
    id: 3,
    image: "https://source.unsplash.com/random/300x200?design",
    label: "Featured",
    link: "#",
    linkText: "Check Out"
  }
];

const RecentProjects = () => {
  return (
    <div className="p-6">
      {/* Stylish Centered Gradient Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-serif inline-block relative">
          Recent Projects
          <span
            className="absolute left-1/2 -bottom-2 w-[120px] h-3 -translate-x-1/2 bg-[url('data:image/svg+xml;utf8,<svg width=120 height=6 xmlns=http://www.w3.org/2000/svg><path d=\'M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3 T 120 3\' stroke=\'%23a855f7\' stroke-width=\'2\' fill=\'none\' /></svg>')] bg-no-repeat bg-center"
          ></span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl"
          >
            {/* Image Section */}
            <div className="h-100 overflow-hidden group relative">
              {/* Responsive Floating Label */}
              <div
                className="
                  absolute
                  bottom-2 right-2
                  sm:top-[46%] sm:left-4 sm:bottom-auto sm:right-auto sm:-translate-y-1/2
                  bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full z-10 shadow-md
                "
              >
                {card.label}
              </div>

              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Action Section with Hover Effect */}
            <div className="bg-blue-100 px-6 py-5 flex justify-end items-center relative min-h-[100px]">
              <a
                href={card.link}
                className="group flex flex-col items-end text-blue-700 space-y-2 transition"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow transform transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-blue-600">
                  <ArrowRight className="text-white w-5 h-5" />
                </div>
                <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-blue-900">
                  {card.linkText}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
