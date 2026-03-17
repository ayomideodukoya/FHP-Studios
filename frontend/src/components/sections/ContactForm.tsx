"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const SPACE_USAGE_OPTIONS = [
  "Content Creation/Shoot",
  "Podcast/Audio",
  "Corporate/Panel",
  "Private Event/Party",
  "Intimate Setup/Proposal",
  "Live Performance",
  "Other"
];

const GUEST_SIZE_OPTIONS = ["Under 5", "10 - 20", "20 - 50", "50+"];
const DURATION_OPTIONS = ["1-2 Hours", "Half-Day", "Full-Day", "Multiple Days"];
const ATTRIBUTION_OPTIONS = ["Instagram", "Google Search", "Word of Mouth", "Attended a previous event", "Other"];

const ADDON_OPTIONS = [
  "PA System & Microphones",
  "Projector & Screen",
  "Lighting Gear (Ring lights, Softboxes)",
  "Event Decoration / Ambient Setup",
  "None (Bringing my own gear)"
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    brand_name: "",
    email: "",
    phone: "",
    space_usage: "",
    guest_size: "",
    preferred_date: "",
    start_time: "",
    duration: "",
    addons: [] as string[],
    external_vendors: false,
    vision_notes: "",
    attribution: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "addons") {
      const isChecked = (e.target as HTMLInputElement).checked;

      // If "None" is checked, clear other addons
      if (value === "None (Bringing my own gear)" && isChecked) {
        setFormData({ ...formData, addons: [value] });
        return;
      }

      let updatedAddons = [...formData.addons];
      if (isChecked) {
        // Remove "None" if it was selected and another option is now checked
        updatedAddons = updatedAddons.filter(item => item !== "None (Bringing my own gear)");
        updatedAddons.push(value);
      } else {
        updatedAddons = updatedAddons.filter((item) => item !== value);
      }
      setFormData({ ...formData, addons: updatedAddons });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.space_usage !== "" &&
      formData.guest_size !== "" &&
      formData.preferred_date !== "" &&
      formData.start_time !== "" &&
      formData.duration !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Combine date and time for backend
      const combinedDateTime = new Date(`${formData.preferred_date}T${formData.start_time}`).toISOString();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          brand_name: formData.brand_name || null,
          email: formData.email,
          phone: formData.phone,
          space_usage: formData.space_usage,
          guest_size: formData.guest_size,
          preferred_date: combinedDateTime,
          duration: formData.duration,
          addons: formData.addons,
          external_vendors: formData.external_vendors,
          vision_notes: formData.vision_notes || null,
          attribution: formData.attribution || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit booking");
      }

      setStatus("success");
      setFormData({
        name: "", brand_name: "", email: "", phone: "", space_usage: "", guest_size: "",
        preferred_date: "", start_time: "", duration: "", addons: [], external_vendors: false,
        vision_notes: "", attribution: "",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue-light uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-px bg-fhp-blue-light inline-block"></span>
              Book FHP Studios
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-fhp-blue-dark mb-6 font-display leading-tight">
              Ready To Create? <br />
              <span className="text-fhp-yellow-dark">Let's Talk Space.</span>
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
              From intimate proposals to high-energy panels, our versatile space adapts to your vision. Tell us what you're building, and we'll help set the stage.
            </p>

            <div className="space-y-6 mt-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
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
            className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-fhp-blue/5 border border-gray-100"
          >
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h4>
                <p className="text-gray-600 mb-8">We've received your request and will contact you shortly to confirm availability and logistics.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-fhp-blue text-white rounded-full font-semibold hover:bg-fhp-blue-dark transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* 1. The Basics */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold font-display text-fhp-blue border-b pb-2 border-gray-100">1. The Basics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name *</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="brand_name" className="text-sm font-semibold text-gray-700">Brand / Organization Name</label>
                      <input type="text" id="brand_name" name="brand_name" value={formData.brand_name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none" placeholder="Optional" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-gray-700">WhatsApp / Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none" placeholder="+234 XXX XXXX" />
                    </div>
                  </div>
                </div>

                {/* 2. The Vision */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold font-display text-fhp-blue border-b pb-2 border-gray-100">2. The Vision</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="space_usage" className="text-sm font-semibold text-gray-700">Space Usage *</label>
                      <select id="space_usage" name="space_usage" required value={formData.space_usage} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700">
                        <option value="" disabled>Select usage type</option>
                        {SPACE_USAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="guest_size" className="text-sm font-semibold text-gray-700">Guest / Crew Size *</label>
                      <select id="guest_size" name="guest_size" required value={formData.guest_size} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700">
                        <option value="" disabled>Select expected size</option>
                        {GUEST_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="preferred_date" className="text-sm font-semibold text-gray-700">Preferred Date *</label>
                      <input type="date" id="preferred_date" name="preferred_date" required value={formData.preferred_date} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="start_time" className="text-sm font-semibold text-gray-700">Start Time *</label>
                      <input type="time" id="start_time" name="start_time" required value={formData.start_time} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-sm font-semibold text-gray-700">Estimated Duration *</label>
                      <select id="duration" name="duration" required value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700">
                        <option value="" disabled>Select duration</option>
                        {DURATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Equipment & Logistics */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold font-display text-fhp-blue border-b pb-2 border-gray-100">3. Logistics & Add-ons</h4>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 block">Add-on Services/Gear</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ADDON_OPTIONS.map(addon => (
                        <label key={addon} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" name="addons" value={addon} checked={formData.addons.includes(addon)} onChange={handleChange} className="w-4 h-4 text-fhp-blue rounded focus:ring-fhp-blue/20" />
                          <span className="text-sm text-gray-700">{addon}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <label className="text-sm font-semibold text-gray-700 block">Will you be bringing external food/drinks or a vendor?</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="external_vendors" value="yes" checked={formData.external_vendors === true} onChange={() => setFormData({ ...formData, external_vendors: true })} className="text-fhp-blue focus:ring-fhp-blue/20" />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="external_vendors" value="no" checked={formData.external_vendors === false} onChange={() => setFormData({ ...formData, external_vendors: false })} className="text-fhp-blue focus:ring-fhp-blue/20" />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 4. Final Details */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold font-display text-fhp-blue border-b pb-2 border-gray-100">4. Final Details</h4>
                  <div className="space-y-2">
                    <label htmlFor="vision_notes" className="text-sm font-semibold text-gray-700">Tell us more about your vision (Optional)</label>
                    <textarea id="vision_notes" name="vision_notes" rows={3} value={formData.vision_notes} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none resize-none" placeholder="Specific setup requests, mood, etc..." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="attribution" className="text-sm font-semibold text-gray-700">How did you hear about us? (Optional)</label>
                    <select id="attribution" name="attribution" value={formData.attribution} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fhp-blue/20 focus:border-fhp-blue transition-all outline-none text-gray-700">
                      <option value="">Select option</option>
                      {ATTRIBUTION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting" || !isFormValid()}
                  className="w-full py-4 bg-fhp-blue text-white rounded-xl font-bold text-lg hover:bg-fhp-blue-dark hover:shadow-lg hover:shadow-fhp-blue/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
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
