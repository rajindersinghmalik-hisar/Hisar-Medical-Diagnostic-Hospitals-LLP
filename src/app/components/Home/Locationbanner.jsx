import React from 'react';
import { MapPin, Clock, Phone, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HorizontalLocationBanner = () => {
  return (
    <div className="bg-gradient-to-br  from-blue-950 to-blue-900 rounded-lg p-4 md:p-10 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left: Image - 50% */}
<div className="relative h-56 md:h-auto w-full md:w-1/2 rounded-lg overflow-hidden group">

  {/* Google Map */}
  <iframe
    src="https://www.google.com/maps?q=Hisar%20Medical%20Diagnostic%20Center&output=embed"
    width="100%"
    height="100%"
    className="absolute inset-0 border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

  {/* Dark Overlay */}
  {/* Map Button */}
  <a
    href="https://www.google.com/maps/search/?api=1&query=Hisar+Medical+Diagnostic+Center"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute top-2 left-1 
    bg-white text-blue-950 font-semibold text-sm
    px-4 py-2 rounded-full shadow-lg
    flex items-center gap-2
    hover:bg-blue-950 hover:text-white
    transition-all duration-300"
  >
<img
    src="/gogglemaps.png"
    alt="Google Maps"
    className="w-3 h-4"
  />

  View on Map
  </a>

</div>



        {/* Right: Content - 50% */}
        <div className="w-full md:w-1/2">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold text-white">
              Hisar Medical Diagnostic Center
            </h3>
          </div>

          {/* Info Section */}
          <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
            {/* Address */}
            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Address
                  </p>
                  <p className="text-blue-100 text-sm md:text-base">
                    Hisar Medical Diagnostic & Hospitals LLP
                  </p>
                  <p className="text-blue-200 text-sm">
                    SCF 79 Red Square Market Hisar-125001
                  </p>
                  <p className="text-blue-300 text-xs md:text-sm">
                    Serving Hisar and surrounding villages around since 1983
                  </p>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Timings
                  </p>
                  <p className="text-blue-100 text-sm md:text-base">
                    Monday - Sunday: 8:00 AM - 7:00 PM
                  </p>
                  <p className="text-blue-200 text-xs md:text-sm">
                    Emergency services: 24/7 available
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-1">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">
                    Contact
                  </p>
                  <p className="text-blue-100 text-sm md:text-base">
                    +91 98121 66286
                  </p>
                  <p className="text-blue-200 text-xs md:text-sm">
                    For appointments & inquiries
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <Link
              href="/Contact"
              className="bg-white hover:bg-blue-50 text-blue-950 px-4 md:px-5 py-3 rounded-lg font-semibold text-center transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              Book Appointment
            </Link>
            <Link
              href="/Services"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 md:px-5 py-3 rounded-lg font-semibold text-center transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
              View Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalLocationBanner;