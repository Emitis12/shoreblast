import React from "react";
import logovi from "../images/logovi.gif"

const InfoCard = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 rounded-2xl gap-4 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <img
          src={logovi}
          alt="Sample"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 md:pl-8 text-center md:text-left bg-white shadow-2xl p-6">
  <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">ABOUT SHOREBLAST</h2>
  <p className="text-gray-600 mb-4">
    <span className="font-bold">SHORE BLAST & COATING AND TECHNICAL SERVICES LTD</span> is a Nigerian-based company offering a wide range of technical and engineering solutions. We specialize in sandblasting, industrial painting, scaffolding, hydrostatic testing, pipeline maintenance, logistics, equipment leasing, and manpower outsourcing, primarily serving the oil and gas sector.
    With a focus on innovation and sustainability, we are evolving toward becoming SHORE BLAST GROUP — a leading EPCI company and full-spectrum energy provider, with future interests in oil exploration, petroleum refining, LNG, and agriculture. Our mission is to drive industrial growth and contribute to Nigeria’s economic development.
  </p>
  <a href="tel:+1234567890" className="flex justify-center">
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
      Find Out More
    </button>
  </a>
</div>

    </div>
  );
};

export default InfoCard;