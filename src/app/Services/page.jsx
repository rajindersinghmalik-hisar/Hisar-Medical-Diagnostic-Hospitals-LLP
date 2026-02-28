"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scan,
  Baby,
  Target,
  Venus,
  Activity,
  Brain,
  Calendar,
  ArrowRight,
  X,
  Clock,
  User,
  CheckCircle,
  Stethoscope,
  Eye,
  Heart,
} from "lucide-react";

export default function TopServices() {
  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  // Services data with complete information
  const services = [
    {
      id: 1,
      icon: <Scan className="w-8 h-8" />,
      title: "Digital X-Ray",
      shortDescription: "Complete head to foot imaging with advanced digital radiography for accurate diagnosis. Fast results with minimal radiation exposure.",
      fullDescription: "Our Digital X-Ray service provides complete imaging from head to foot using advanced digital radiography systems. Patients are registered easily with digital payment facilities and guided through a smooth examination process. High-quality images are processed digitally and printed on durable films for accurate evaluation. Every scan is carefully reviewed by experienced consultant radiologists who provide detailed medical opinions. When required, additional investigations such as blood tests, ultrasound, CT scan, or MRI are recommended for confirmation. This service helps in early detection of injuries, infections, and internal diseases, ensuring timely and effective medical treatment.",
      image: "/s1.png",
      gradient: "from-amber-500 to-orange-600",
      benefits: [
        "Low radiation exposure with digital technology",
        "Instant image processing and digital delivery",
        "Comprehensive head to foot imaging",
        "Expert review by consultant radiologists",
        "Emergency X-ray services available 24/7"
      ],
      timings: "Monday - Saturday: 8:00 AM - 8:00 PM",
      department: "Department of Radiology",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      icon: <Baby className="w-8 h-8" />,
      title: "Ultrasound Scanning",
      shortDescription: "Safe, non-invasive and radiation-free imaging for abdominal, pelvic, and pregnancy monitoring with precise results.",
      fullDescription: "Our Ultrasound Scanning service offers safe, non-invasive, and radiation-free imaging for various medical conditions. We perform scans of abdomen, pelvis, thyroid, glands, blood vessels, and small body parts. Specialized pregnancy ultrasounds are conducted to monitor fetal growth and wellbeing. We also provide fertility-related scans, including ovulation studies and support for IVF treatments. Using modern ultrasound technology, our skilled professionals deliver clear and accurate reports. This service plays a vital role in diagnosing internal disorders, monitoring treatment progress, and supporting reproductive health.",
      image: "/s2.png",
      gradient: "from-blue-500 to-cyan-600",
      benefits: [
        "Radiation-free and completely safe",
        "Real-time imaging with Doppler technology",
        "Pregnancy and fetal growth monitoring",
        "Fertility & IVF treatment support",
        "Detailed color flow mapping"
      ],
      timings: "Monday - Saturday: 9:00 AM - 7:00 PM",
      department: "Ultrasound & Imaging Center",
      doctor: "Dr. Michael Roberts",
    },
    {
      id: 3,
      icon: <Target className="w-8 h-8" />,
      title: "Cancer Screening",
      shortDescription: "Early detection services using digital mammography and advanced imaging to prevent and manage life-threatening diseases.",
      fullDescription: "Our Cancer Screening services focus on early detection and prevention of life-threatening diseases. We use advanced imaging techniques such as digital mammography and ultrasound to screen for breast, cervical, ovarian, and other internal cancers. Early diagnosis greatly improves treatment success and reduces the risk of complications. When abnormal findings are detected, further investigations and biopsy support are arranged for confirmation. Regular screening helps reduce treatment costs and improves long-term survival rates. Through awareness programs and modern diagnostic tools, we are committed to promoting preventive healthcare in the community.",
      image: "/s3.png",
      gradient: "from-purple-500 to-pink-600",
      benefits: [
        "Digital mammography for breast cancer",
        "Cervical and ovarian cancer screening",
        "Early detection improves survival rates",
        "Biopsy support for confirmation",
        "Regular screening programs and awareness"
      ],
      timings: "Monday - Saturday: 9:00 AM - 5:00 PM",
      department: "Oncology & Cancer Care",
      doctor: "Dr. Emily Chen",
    },
    {
      id: 4,
      icon: <Venus className="w-8 h-8" />,
      title: "Women's Health",
      shortDescription: "Comprehensive diagnostic care including pregnancy scans, pelvic ultrasounds, and breast cancer screening for women.",
      fullDescription: "Our Women's Health services provide comprehensive diagnostic care for female patients at every stage of life. We offer pregnancy scans for fetal monitoring, pelvic ultrasounds for reproductive health, and digital mammography for breast cancer screening. Our services also help in detecting gynecological conditions such as uterine and ovarian disorders at an early stage. With modern equipment and experienced specialists, we ensure accurate reporting and personalized care. Regular health screenings empower women to maintain their wellbeing, prevent serious illnesses, and lead healthier, more confident lives.",
      image: "/s4.png",
      gradient: "from-rose-500 to-pink-600",
      benefits: [
        "Comprehensive pregnancy monitoring",
        "Pelvic and reproductive health scans",
        "Gynecological disorder detection",
        "Breast cancer screening programs",
        "Personalized women's healthcare"
      ],
      timings: "Monday - Saturday: 10:00 AM - 6:00 PM",
      department: "Women's Health Center",
      doctor: "Dr. Lisa Anderson",
    },
   
  ];

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Handle view service - shows modal with full details
  const handleViewService = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
    document.body.style.overflow = "hidden";
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showServiceModal) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showServiceModal]);

  // Handle outside click
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && showServiceModal) {
        handleCloseModal();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showServiceModal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-xl backdrop-blur-sm animate-slideIn ${
          notification.type === "success" 
            ? "bg-green-50/95 border border-green-200 text-green-800" 
            : "bg-red-50/95 border border-red-200 text-red-800"
        }`}>
          <div className="rounded-full bg-white p-1.5 shadow-sm">
            {notification.type === "success" ? (
              <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <span className="font-medium text-blue-950">{notification.message}</span>
          <button
            onClick={() => setNotification({ show: false })}
            className="ml-2 rounded-full p-1 hover:bg-white/50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Classic White with Blue-950 */}
        <div className="text-center mb-12 md:mb-16">
        
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-blue-950 mb-4">
            Top <span className="text-blue-950">Services</span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most trusted diagnostic services, combining advanced technology with expert care for accurate results.
          </p>
        </div>

        {/* Services Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl border border-gray-200 hover:border-blue-950/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
             
                
                {/* Service Title on Image with hover effect */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500">
                  <h3 className="text-xl font-sans font-bold text-white group-hover:text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Short Description - Exactly 2 lines with line-clamp-2 */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                  {service.shortDescription}
                </p>

                {/* View Details Button - White bg, Blue-950 border and text with enhanced hover */}
                <button
                  onClick={() => handleViewService(service)}
                  className="w-full py-2.5 px-4 bg-white border-2 border-blue-950 rounded-lg font-sans font-semibold text-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal - Classic White with Blue-950 */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div 
            ref={modalRef}
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-scaleIn rounded-xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white">
              <div>
                <h3 className="text-xl font-sans font-semibold text-blue-950">Service Details</h3>
                <p className="text-sm text-gray-600">Complete information about {selectedService.title}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="bg-white rounded-lg p-2 hover:bg-gray-50 hover:border-blue-950 transition-all duration-300 hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-700 hover:text-blue-950 transition-colors" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Image Display */}
                <div className="flex flex-col">
                  <div className="rounded-lg  bg-gray-50 p-4 transition-colors duration-300">
                    <div className="relative h-[250px] w-full rounded-lg overflow-hidden">
                      <Image
                        src={selectedService.image}
                        alt={selectedService.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Service Details */}
                <div className="space-y-5">
                  <div>
                    <div className="space-y-4 rounded-lg  bg-gray-50 p-5 hover:border-blue-950/30 transition-colors duration-300">
                      {/* Service Name */}
                      <div>
                        <p className="text-xs font-sans font-medium text-blue-950 uppercase tracking-wider">Service Name</p>
                        <p className="text-gray-900 font-semibold text-lg mt-1">{selectedService.title}</p>
                      </div>
                      
                      {/* Full Description */}
                      <div>
                        <p className="text-xs font-sans font-medium text-blue-950 uppercase tracking-wider">Description</p>
                        <p className="text-gray-700 text-sm leading-relaxed mt-1">{selectedService.fullDescription}</p>
                      </div>
                          



                          
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                {/* Book Appointment Button - Blue-950 with hover effect */}
                <Link
                  href="/Contact"
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-6 py-3 font-sans font-medium text-white shadow-md hover:bg-white hover:text-blue-950 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  Book Appointment
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                
                {/* Close Button - White with Border */}
              
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}