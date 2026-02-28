"use client";
import React from "react";
import {
  Award,
  Clock,
  Shield,
  CheckCircle,
  Users,
  Heart,
} from "lucide-react";

const WhyChooseUs = () => {
  const keyFeatures = [
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      text: "40+ Years of Medical Excellence",
      description:
        "Four decades of trusted healthcare service in Hisar and surrounding areas",
      color: "bg-emerald-50",
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      text: "24/7 Emergency Services",
      description:
        "Round-the-clock diagnostic and emergency care availability",
      color: "bg-cyan-50",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      text: "Advanced Diagnostic Technology",
      description:
        "Latest generation X-ray, ultrasound, and imaging equipment",
      color: "bg-green-50",
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      text: "Expert Medical Team",
      description:
        "Experienced radiologists, pathologists, and healthcare professionals",
      color: "bg-purple-50",
    },
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      text: "Patient-Centric Approach",
      description:
        "Personalized care and compassionate service for every patient",
      color: "bg-pink-50",
    },
  ];

  return (
    <section className="relative py-12 md:py-4 overflow-hidden bg-white">
      
      {/* Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white pointer-events-none"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:mb-20">
          <h1 className="text-wrap sm:text-4xl md:text-4xl font-semibold text-blue-950 mb-4 leading-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-950">
              Hisar Medical Diagnostic?
            </span>
          </h1>

          <p className="text-wrap sm:text-xl text-blue-950 max-w-3xl mx-auto leading-relaxed">
            We combine advanced technology, experienced professionals, and compassionate
            care to provide the most accurate and reliable diagnostic services in the region.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-4 md:p-8 rounded-2xl border border-gray-200 
                hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 
                hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold font-sans text-blue-950 mb-2">
                      {feature.text}
                    </h3>
                    <p className="text-blue-950">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
