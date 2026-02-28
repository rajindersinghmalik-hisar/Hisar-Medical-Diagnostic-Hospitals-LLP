import React from 'react';
import { Star, Quote, UserCheck, Shield, Heart } from 'lucide-react';
import Image from 'next/image';

const ClientTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Sharma",
      role: "Patient",
      rating: 5,
      content: "Excellent service and accurate reports. The staff is very cooperative and the doctors are highly experienced. Got my MRI done and the report was delivered within 24 hours.",
      date: "2 weeks ago",
      image: "/r1.png"   },
    {
      id: 2,
      name: "Priya Verma",
      role: "Regular Patient",
      rating: 5,
      content: "My family has been visiting Hisar Medical Diagnostic for years. The cleanliness, professionalism, and accuracy of tests are commendable. Emergency services are truly 24/7.",
      date: "1 month ago",
      image: "/r2.png"
    },
    {
      id: 3,
      name: "Dr. Anil Gupta",
      role: "Referring Doctor",
      rating: 4,
      content: "As a practicing physician, I refer my patients here with confidence. The diagnostic accuracy and timely reports help in proper treatment planning. Highly recommended.",
      date: "3 weeks ago",
      image: "/r3.png"
    },
    
  ];

  const stats = [
    { icon: UserCheck, value: "10,000+", label: "Happy Patients" },
    { icon: Shield, value: "99.8%", label: "Accuracy Rate" },
    { icon: Heart, value: "24/7", label: "Emergency Care" },
    { icon: Star, value: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:py-20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
     <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-blue-950 mb-4 leading-tight">
  What Our{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-blue-950">
    Patients Say
  </span>
</h1>

<p className="text-wrap sm:text-xl text-blue-950 max-w-3xl mx-auto leading-relaxed">
  Real experiences from people who trusted Hisar Medical Diagnostic 
  for their healthcare needs.
</p>

        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-blue-950" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-blue-950 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">{testimonial.date}</span>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-700 italic relative">
                  <span className="pl-0">{testimonial.content}</span>
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt="/m.png"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-950 font-medium">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        
        {/* Trust Indicators */}
       

      </div>
    </div>
  );
};

export default ClientTestimonials;