"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open Monday through Friday from 8:00 AM to 8:00 PM. Weekend bookings are available upon request and subject to availability.",
    },
    {
      question: "Do you provide equipment for rent?",
      answer: "Yes, we offer a range of professional lighting, cameras, and audio equipment. You can select the 'Full Space + Equipment' option when booking or request specific items during the booking process.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we have dedicated parking spaces available for our clients right outside the studio building.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Bookings can be canceled up to 48 hours in advance for a full refund. Cancellations made within 48 hours of the booking time are non-refundable.",
    },
    {
      question: "Can I host an event with more than 50 people?",
      answer: "Our standard full space accommodates up to 50 people comfortably. For larger events, please contact us directly to discuss your specific needs and our capacity limits.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-blue uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
            Frequently Asked Questions
            <span className="w-12 h-px bg-fhp-blue inline-block"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 font-display">
            Got Questions? <br />
            <span className="text-fhp-blue">We've Got Answers</span>
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-lg text-gray-900 pr-8">{faq.question}</span>
                <span className="flex-shrink-0 text-fhp-blue">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
