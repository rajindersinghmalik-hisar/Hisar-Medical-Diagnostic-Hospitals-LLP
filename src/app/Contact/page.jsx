"use client";

import { useState } from "react";
import { Mail, Phone, User, MessageSquare, Send, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <main className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between rounded-2xl p-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-sans font-semibold text-blue-950">Contact Us</h1>
            <p className="mt-3 font-sans text-lg text-blue-950/80">
              Get in touch with Hisar Medical Diagnostic & Hospitals
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-sans text-xl font-semibold text-blue-950">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-950/10 to-blue-900/10">
                    <Phone className="h-5 w-5 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-blue-950">Phone Number</h3>
                    <p className="font-sans text-sm text-gray-600">+91 9812166286</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-950/10 to-blue-900/10">
                    <Mail className="h-5 w-5 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-blue-950">Email Address</h3>
                    <p className="font-sans text-sm text-gray-600">rajindersinghmalik@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-950/10 to-blue-900/10">
                    <MapPin className="h-5 w-5 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-blue-950">Hospital Address</h3>
                    <p className="font-sans text-sm text-gray-600">
                      Hisar Medical Diagnostic & Hospitals LLP<br />
                      SCF 79 Red Square Market Hisar-125001<br />
                      Haryana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-950/10 to-blue-900/10">
                    <Clock className="h-5 w-5 text-blue-950" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-blue-950">Working Hours</h3>
                    <p className="font-sans text-sm text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p className="font-sans text-sm text-gray-600">Saturday - Sunday: 9:00 AM - 6:00 PM</p>
                    <p className="font-sans text-sm text-gray-600">Emergency: 24/7</p>
                  </div>
                </div>
              </div>

              {/* Emergency Section */}
              <div className="mt-8 rounded-xl bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-red-700">Emergency Contact</h3>
                    <p className="font-sans text-lg font-bold text-red-600">1066 / 112</p>
                    <p className="font-sans text-xs text-red-600">24/7 Emergency Helpline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="font-sans text-xl font-semibold text-blue-950">Send us a Message</h2>
                <p className="mt-2 font-sans text-sm text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 animate-slideIn rounded-xl bg-green-50 border border-green-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-green-700">
                        Thank you for your message!
                      </p>
                      <p className="font-sans text-xs text-green-600">
                        We've sent a confirmation to your email and will contact you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 animate-slideIn rounded-xl bg-red-50 border border-red-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                      <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-red-700">
                        Something went wrong!
                      </p>
                      <p className="font-sans text-xs text-red-600">
                        {error}. Please try again or call us directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-blue-950/60" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="font-sans w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-blue-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-blue-950/60" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="font-sans w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-blue-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="h-5 w-5 text-blue-950/60" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="font-sans w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-blue-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                      Subject *
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MessageSquare className="h-5 w-5 text-blue-950/60" />
                      </div>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="font-sans w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-blue-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book an Appointment</option>
                        <option value="emergency">Emergency Service</option>
                        <option value="diagnostic">Diagnostic Services</option>
                        <option value="billing">Billing & Insurance</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="mt-6">
                  <label className="mb-2 block font-sans text-sm font-medium text-blue-950">
                    Your Message *
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-3">
                      <MessageSquare className="h-5 w-5 text-blue-950/60" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="font-sans w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-blue-950 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`font-sans w-full rounded-xl
                    bg-blue-950 text-white
                    border-2 border-transparent
                    py-3.5 font-medium shadow-lg
                    transition-all duration-300
                    ${
                      loading
                        ? "cursor-not-allowed opacity-70"
                        : "hover:bg-white hover:text-blue-950 hover:border-blue-950 hover:scale-[1.02] hover:shadow-xl"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>

                {/* Privacy Note */}
                <div className="mt-6 text-center">
                  <p className="font-sans text-xs text-gray-500">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                  <p className="mt-1 font-sans text-xs text-gray-400">
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Hisar Medical Diagnostic & Hospitals LLP
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Advanced healthcare services for the community
          </p>
        </footer>
      </main>

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
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

