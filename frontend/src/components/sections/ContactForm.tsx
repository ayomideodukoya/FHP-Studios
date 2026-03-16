"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    event_type: "",
    expected_guests: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          expected_guests: parseInt(formData.expected_guests),
          preferred_date: new Date(formData.preferred_date).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit booking");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferred_date: "",
        event_type: "",
        expected_guests: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Booking error:", error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue-light uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-px bg-fhp-blue-light inline-block"></span>
              Book FHP Studios
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-fhp-blue-dark mb-6 font-display leading-tight">
              Ready To Create? <br />
              <span className="text-fhp-yellow-dark">Let's Talk Space.</span>
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light max-w-lg">
              Whether you're hosting an intimate live storytelling session, a high-energy spoken word night, or a relaxed community panel, we have the perfect environment for you. Fill out the form, and our team will get back to you to finalize details.
            </p>

            <div className="space-y-6 mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 text-fhp-blue-dark">
                 <div className="w-12 h-12 bg-fhp-yellow/20 rounded-full flex items-center justify-center text-fhp-yellow-dark">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900">Location</h4>
                    <p className="text-gray-600 text-sm">Plot 32 Oba Ogunji Road, Ogba, Lagos</p>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-fhp-blue/5 border border-gray-100 relative"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h4>
                <p className="text-gray-600 mb-8">We've received your request and will contact you shortly to confirm availability.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-fhp-blue text-white rounded-full font-semibold hover:bg-fhp-blue-dark transition-colors"
                >
                  Book Another Event
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none"
                      placeholder="+234 XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="preferred_date" className="text-sm font-semibold text-gray-700">Preferred Date & Time</label>
                    <input
                      type="datetime-local"
                      id="preferred_date"
                      name="preferred_date"
                      required
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="event_type" className="text-sm font-semibold text-gray-700">Event Type</label>
                    <select
                      id="event_type"
                      name="event_type"
                      required
                      value={formData.event_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700"
                    >
                      <option value="" disabled>Select event type</option>
                      <option value="Storytelling">Live Storytelling</option>
                      <option value="Spoken Word">Spoken Word</option>
                      <option value="Panel">Entrepreneurial Panel</option>
                      <option value="Movie">Movie Marathon</option>
                      <option value="Workshop">Creative Workshop</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="expected_guests" className="text-sm font-semibold text-gray-700">Expected Guests</label>
                    <input
                      type="number"
                      id="expected_guests"
                      name="expected_guests"
                      min="1"
                      max="500"
                      required
                      value={formData.expected_guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none"
                      placeholder="e.g., 50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-700">Additional Details (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none resize-none"
                    placeholder="Tell us more about your event needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-fhp-blue text-white rounded-xl font-bold text-lg hover:bg-fhp-blue-dark hover:shadow-lg hover:shadow-fhp-blue/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {status === "submitting" ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Request
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
