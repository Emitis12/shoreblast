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
    At <span className="font-bold">SHORE BLAST & COATING AND TECHNICAL SERVICES LTD</span> we deliver specialized technical and industrial solutions across the Downstream, Midstream and Upstream sectors of Nigeria’s oil and gas industry. Our focus is on asset integrity, corrosion protection, structural reliability and operational efficiency with integrated support in equipment procurement and supply.
Headquartered in Calabar, Nigeria, and actively operating across the Niger Delta and offshore fields, we provide services that protect assets, reduce downtime, and enhance operational performance for major players in Nigeria’s oil and gas value chain.
Our operational excellence is built on over a decade of field experience, robust safety culture, skilled workforce and a strategic understanding of Nigeria’s industrial terrain.

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