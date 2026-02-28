"use client";
import React from "react";
import Image from "next/image";
import { Target, Hospital, Heart, Zap, Shield, Thermometer, Activity, Eye, Brain, Stethoscope } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  const services = [
    {
      name: "Full Body X-ray",
      description: "Comprehensive X-ray imaging for accurate diagnosis of bone and joint conditions",
      image: "/xrayroom.png",
      icon: <Eye className="w-4 h-4 text-blue-600" />
    },
    {
      name: "Digital Mammography",
      description: "Advanced breast cancer screening with high-resolution imaging",
      image: "/m.png",
      icon: <Heart className="w-4 h-4 text-pink-600" />
    },
    {
      name: "Ultrasound Scan",
      description: "Non-invasive imaging for abdominal, pelvic, and obstetric examinations",
      image: "/m.png",
      icon: <Activity className="w-4 h-4 text-emerald-600" />
    },
    // {
    //   name: "ECG & Pathology",
    //   description: "Complete cardiac monitoring and comprehensive blood testing services",
    //   image:"/m.png",
    //   icon: <Activity className="w-4 h-4 text-red-600" />
    // },
    {
      name: "Cancer Screening",
      description: "Early detection and screening for various types of cancers",
      image: "/m.png",
      icon: <Shield className="w-4 h-4 text-purple-600" />
    },
    // {
    //   name: "CT Scan Services",
    //   description: "Detailed cross-sectional imaging for complex diagnostic needs",
    //   image: "/machine.png",
    //   icon: <Brain className="w-4 h-4 text-cyan-600" />
    // }
  ];

  return (
    <section className="py-12  md:py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:mb-10">
        
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-900/10 border border-emerald-700/20 px-4 sm:px-6 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Stethoscope className="text-emerald-600" size={16} />
            <span className="text-emerald-700 font-semibold text-sm sm:text-base">
              OUR FACILITIES & SERVICES
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-blue-950 mb-4 leading-tight">
            Advanced Diagnostic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-blue-950">
              Services & Facilities
            </span>
          </h1>
          
          <p className="text-wrap sm:text-xl text-blue-950 max-w-3xl mx-auto leading-relaxed">
            State-of-the-art diagnostic technology combined with modern facilities 
            for accurate and comfortable healthcare experience.
          </p>
        </div>

        {/* Two Column Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column: Diagnostic Services */}
         <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500">
  <div className="flex items-center gap-3 mb-6 md:mb-8">
    <div className="p-3 bg-emerald-50 rounded-xl">
      <Target className="text-emerald-600 w-6 h-6 md:w-7 md:h-7" />
    </div>
    <div>
      <h3 className="text-xl md:text-xl font-sans font-semibold text-blue-950">
        Our Diagnostic Services
      </h3>
      <p className="text-blue-950 text-sm md:text-base mt-1">
        Comprehensive range of advanced medical tests
      </p>
    </div>
  </div>

  {/* Services List */}
  <div className="grid gap-4 md:gap-6 mb-8">
    {services.map((service, index) => (
      <div
        key={index}
        className="group relative flex items-start gap-3 md:gap-4 
        p-4 md:p-5 rounded-xl border border-gray-100
        backdrop-blur-sm
        bg-blue-50 shadow-lg
        transition-all duration-300"
      >
        {/* Left Accent Line */}
        <span
          className="absolute left-0 top-0 h-full w-1 bg-green-500
          scale-y-100 origin-top
          transition-transform duration-300 rounded-r"
        />

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
            {service.name}
          </h4>

          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-2">
            {service.description}
          </p>

          {/* Learn More */}
       
<Link href="/Services">
  <span
    className="text-xs text-blue-950 font-medium
    opacity-100
    transition-opacity duration-300 cursor-pointer"
  >
    Learn More →
  </span>
</Link>

        </div>
      </div>
    ))}
  </div>

  {/* View Services Button */}
 
<div className="flex justify-center">
  <Link href="/Services">
    <button
      className="px-6 py-3 text-sm md:text-base font-semibold 
      text-white bg-blue-950 rounded-full
      hover:bg-blue-950 hover:shadow-lg
      transition-all duration-300 cursor-pointer"
    >
      View Services
    </button>
  </Link>
</div>
</div>

          {/* Right Column: Modern Facility */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Hospital className="text-green-600 w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-wrap md:text-xl font-sans font-semibold text-blue-950">
                  Our Modern Facility
                </h3>
                <p className="text-blue-950 text-sm md:text-base mt-1">
                  State-of-the-art infrastructure for patient comfort
                </p>
              </div>
            </div>

            {/* Image Gallery Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="relative h-40 md:h-56 rounded-xl overflow-hidden group">
                <Image
                  src="/xrayroom.png"
                  alt="X-ray Room Interior"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    X-ray Room
                  </span>
                </div>
              </div>

              <div className="relative h-40 md:h-56 rounded-xl overflow-hidden group">
                <Image
                  src="/ultrasoundroom.png"
                  alt="Ultrasound Room"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    Ultrasound Room
                  </span>
                </div>
              </div>

              <div className="relative h-40 md:h-56 rounded-xl overflow-hidden group bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                <Image
                  src="/machine.png"
                  alt="Advanced Diagnostic Machine"
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs font-semibold bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
                    Latest Equipment
                  </span>
                </div>
              </div>

              <div className="relative h-40 md:h-56 rounded-xl overflow-hidden group">
                <Image
                  src="/lobby.png"
                  alt="Reception Area"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    Reception Area
                  </span>
                </div>
              </div>
            </div>

            {/* Facility Description */}
            <div className="mb-6 md:mb-8">
              <p className="text-blue-950 font-sans text-base md:text-wrap leading-relaxed mb-4">
                Our state-of-the-art facility is equipped with the latest diagnostic technology and designed for maximum patient comfort and privacy. We maintain the highest standards of hygiene and safety protocols, ensuring accurate results, trusted care, professional staff support, and a seamless healthcare experience for every patient.
              </p>
              
            
            </div>

           
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default ServicesPage;