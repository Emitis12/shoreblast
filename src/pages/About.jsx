import React from "react";
import downstreamImage from "../images/downstream.jpeg";
import midstreamImage from "../images/midstream.jpg";
import offshoreImage from "../images/offshore.jpg";
import procurementImage from "../images/haulage.png";

const About = () => {
  return (
    <div className="space-y-0">
      {/* About Us */}
      <section className="bg-gray-400 w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="pt-50 text-3xl font-bold mb-4">About Us</h2>
          <p>
            At SHORE BLAST & COATING AND TECHNICAL SERVICES LTD, we deliver specialized technical and industrial solutions across the Downstream, Midstream and Upstream sectors of Nigeria’s oil and gas industry. Our focus is on asset integrity, corrosion protection, structural reliability and operational efficiency with integrated support in equipment procurement and supply.
            Headquartered in Calabar, Nigeria, and actively operating across the Niger Delta and offshore fields, we provide services that protect assets, reduce downtime, and enhance operational performance for major players in Nigeria’s oil and gas value chain.
            Our operational excellence is built on over a decade of field experience, robust safety culture, skilled workforce and a strategic understanding of Nigeria’s industrial terrain.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-50 w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p>
            Our mission is to deliver superior technical and engineering services that drive Nigeria's industrial growth and economic diversification. We are dedicated to providing comprehensive solutions in oil and gas, energy, and infrastructure through excellence in Blasting and Coating, Integrity test, logistics, scaffolding, and various other services.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="bg-gray-400 w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p>
            Our vision is to become a leading conglomerate in Nigeria and beyond, renowned for excellence in technical and engineering services across diverse sectors. We aim to pioneer advancements in the oil and gas industry, transforming into a top-tier Engineering, Procurement, Construction, and Installation (EPCI) company. Our vision includes becoming a key player in energy supply, contributing to sustainable energy solutions, and diversifying into agriculture to support economic growth and development. Through innovation, quality, and integrity, we aspire to drive industrial growth, enhance infrastructure, and foster a prosperous future for our clients, our community, and our country.
          </p>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="bg-gray-50 w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
          <ul className="space-y-4 list-disc pl-5">
            <li><strong>1. EXCELLENCE:</strong> We strive for the highest quality and precision in all our services, ensuring that we exceed client expectations and industry standards.</li>
            <li><strong>2. INTEGRITY:</strong> Our business practices are rooted in honesty, transparency, and ethical conduct. We are committed to building trust with our clients, partners, and communities.</li>
            <li><strong>3. INNOVATION:</strong> We embrace creativity and technological advancements, continuously seeking new ways to improve our services and stay ahead in the industry.</li>
            <li><strong>4. SUSTAINABILITY:</strong> We are dedicated to responsible and sustainable business practices, aiming to minimize our environmental impact and support the long-term well-being of the communities we serve.</li>
            <li><strong>5. SAFETY:</strong> The safety of our employees, clients, and stakeholders is paramount. We maintain rigorous safety protocols and foster a culture of safety in all our operations.</li>
            <li><strong>6. CUSTOMER FOCUS:</strong> We place our clients at the heart of everything we do, tailoring our services to meet their specific needs and delivering exceptional customer satisfaction.</li>
            <li><strong>7. TEAMWORK:</strong> We believe in the power of collaboration and respect within our team, encouraging diversity of thought and fostering a supportive and inclusive work environment.</li>
            <li><strong>8. ACCOUNTABILITY:</strong> We take responsibility for our actions and outcomes, maintaining transparency and accountability in all our business dealings and project deliveries.</li>
            <li><strong>9. COMMUNITY ENGAGEMENT:</strong> We are committed to giving back to the communities where we operate, supporting social initiatives, and contributing to economic and social development.</li>
            <li><strong>10. CONTINUOUS IMPROVEMENT:</strong> We are dedicated to ongoing learning and improvement, continually enhancing our skills, processes, and services to better serve our clients and achieve our mission.</li>
          </ul>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-gray-100 w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>

          {/* Service Container 1 */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 items-center">
            <img src={downstreamImage} alt="Downstream" className="w-full rounded-xl shadow-md" />
            <div className="bg-gradient-to-r from-blue-900 to-red-600 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-2">Downstream Operations</h3>
              <p className="mb-2">Supporting refineries, terminals, and tank farms with critical services in:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Abrasive Blasting & Surface Preparation</li>
                <li>Protective Coating Application (Epoxy, PU, Bitumen, etc.)</li>
                <li>Storage tank and Pipeline Rehabilitation & Wrapping</li>
                <li>Shutdown Maintenance Support & Weld-Cut Prep</li>
                <li>Fabrication & Welding (Tanks, Skids, Platforms)</li>
                <li>Procurement & Supply of Industrial Materials, Coatings and Mechanical Tools</li>
              </ul>
            </div>
          </div>

          {/* Service Container 2 */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 items-center">
            <img src={midstreamImage} alt="Midstream" className="w-full rounded-xl shadow-md md:order-2" />
            <div className="bg-gradient-to-r from-blue-900 to-red-600 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-2">Midstream Operations</h3>
              <p className="mb-2">Ensuring continuity in pipeline and midstream infrastructure through:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>ROW Pipeline Coating & Joint Protection</li>
                <li>Tank Fabrication, Surface Prep, and Coating</li>
                <li>Welding & Structural Repairs for Pump Stations and Skids</li>
                <li>Equipment Leasing: Compressors, Generators, Scaffolds, PPE</li>
                <li>Procurement & Supply of Materials for Midstream Projects</li>
              </ul>
            </div>
          </div>

          {/* Service Container 3 */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 items-center">
            <img src={offshoreImage} alt="Offshore" className="w-full rounded-xl shadow-md" />
            <div className="bg-gradient-to-r from-blue-900 to-red-600 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-2">Offshore Operations</h3>
              <p className="mb-2">Licensed for offshore operations, delivering on platforms, rigs and FPSOs:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Offshore Blasting, Coating & Rope Access Work</li>
                <li>Tank & Vessel Internal Lining (Ballast, Potable Water, Cargo)</li>
                <li>Offshore Welding (Carbon Steel, Duplex, Stainless)</li>
                <li>Structural Fabrication of Handrails, Modules, Skids</li>
                <li>Manpower Supply & NUPRC-Compliant Operations</li>
                <li>Procurement & Delivery of Offshore-Spec Equipment and Materials</li>
              </ul>
            </div>
          </div>

          {/* Service Container 4 */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 items-center">
            <img src={procurementImage} alt="Procurement" className="w-full rounded-xl shadow-md md:order-2" />
            <div className="bg-gradient-to-r from-blue-900 to-red-600 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-2">Procurement & Supply Chain Services</h3>
              <p className="mb-2">We procure and supply a broad range of oil & gas materials, equipment and mechanical tools to operators, contractors and EPC firms. This includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Industrial paints & coatings (Jotun, International, Hempel, etc.)</li>
                <li>Abrasives: Garnet, Aluminum Oxide, Steel Grit, Slag</li>
                <li>Blasting and Coating Equipment</li>
                <li>PPE, HSE Gear, Welding Machines, Spray Systems.</li>
                <li>Heavy-Duty Equipment (Compressors, Generators, Forklifts)</li>
                <li>Pipeline Accessories, Valves, Fittings & Structural Materials</li>
              </ul>
              <p className="mt-2">With strong OEM relationships and a reliable global supply chain, we ensure fast delivery, competitive pricing and full compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Documentation */}
      <section className="bg-white w-full py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Legal & Documentation</h2>
          <p className="mb-2">
            We operate with full legal compliance under Nigerian corporate and oil & gas regulations.
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Corporate Affairs Commission (CAC)</li>
            <li>Offshore Contractor License</li>
            <li>NUPRC | NMDPRA License</li>
            <li>Tax Identification Number (TIN)</li>
            <li>HSE Policy & Safety Statement</li>
            <li>TDS, MSDS, and Coating Specs – Available per project</li>
            <li>Employees Insurance Policy etc.</li>
          </ul>
          <p>
            Documentation available upon request or for due diligence purposes. Our company’s profile is attached and downloadable here (attached file).
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
