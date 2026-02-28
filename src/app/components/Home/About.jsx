"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Award, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-3xl font-sans font-semibold text-blue-950 leading-tight">
              Serving Hisar & Surrounding Villages with{" "}
              <span className="text-blue-950">Advanced Diagnostics</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-blue-950 leading-relaxed">
              <span className="text-blue-950 font-semibold">HISAR MEDICAL DIAGNOSTIC & HOSPITALS LLP</span> 
              serving hisar and surrounding villages around since 1983 with advanced diagnostic facilities. 
              Our focus is early detection of cancers and other serious diseases through state-of-the-art X-ray 
              and ultrasound technology.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {[
                {
                  icon: Award,
                  value: "40+",
                  label: "Years Experience",
                  iconColor: "text-white",
                  bgColor: "bg-blue-950",
                },
                {
                  icon: Users,
                  value: "50k+",
                  label: "Patients Served",
                  iconColor: "text-white",
                  bgColor: "bg-blue-950",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Icon Box */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl ${stat.bgColor} flex-shrink-0`}>
                      <stat.icon className={stat.iconColor} size={20} />
                    </div>
                    {/* Text */}
                    <div>
                      <div className="text-lg md:text-xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-base text-blue-950">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/Services"
                className="group bg-blue-950 hover:bg-white hover:text-blue-950 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-sans font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2 text-sm md:text-base border-2 border-transparent hover:border-blue-950"
              >
                Read More About Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/Contact"
                className="group bg-blue-950 text-white hover:bg-white hover:text-blue-950 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2 text-sm md:text-base border-2 border-transparent hover:border-blue-950"
              >
                Book Appointment
                <Calendar className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hospital Building Image */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
            <Image
              src="/lobby.png"
              alt="Hisar Medical Diagnostic & Hospitals LLP Building"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            
            {/* Location Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-600/20 backdrop-blur-sm rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-white text-base md:text-xl">
                    Hisar Medical Diagnostic & Hospitals LLP
                  </h3>
                  <p className="text-white/90 text-sm mt-1">
                    Serving hisar and surrounding villages around since 1983
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;