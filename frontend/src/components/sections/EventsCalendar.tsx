"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  description: string;
  date_time: string;
  location: string;
  image_url: string;
}

export function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/events/`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError("Could not load events. Check if backend is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-24 bg-fhp-blue text-white relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-fhp-blue-dark/50 transform -skew-x-12 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-fhp-yellow uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-px bg-fhp-yellow inline-block"></span>
              Join The Tribe
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white font-display leading-tight">
              Upcoming <br className="hidden md:block" />
              <span className="text-fhp-yellow">Gatherings</span>
            </h3>
          </div>
          <p className="hidden md:block text-fhp-blue-light text-lg max-w-sm font-light">
            Don't miss our next live storytelling, spoken word, or creative community event at FHP Studios.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-fhp-blue-light border-t-fhp-yellow rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-red-100 p-4 rounded-lg text-center border border-red-500/50">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-fhp-blue-light py-20 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No upcoming events right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-fhp-blue-dark rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-xl border border-white/5"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={event.image_url || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 bg-fhp-yellow text-fhp-blue-dark font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                    {format(parseISO(event.date_time), "MMM d")}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-3 font-display group-hover:text-fhp-yellow transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-fhp-blue-light text-sm mb-2 gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{format(parseISO(event.date_time), "h:mm a")}</span>
                  </div>
                  <div className="flex items-start text-fhp-blue-light text-sm mb-6 gap-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center text-fhp-yellow font-semibold text-sm group-hover:gap-3 transition-all">
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-black/10 text-white hover:bg-black/30 rounded-full z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 w-full">
                <Image
                  src={selectedEvent.image_url || "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fhp-blue-dark to-transparent opacity-80" />
                <h2 className="absolute bottom-6 left-8 right-8 text-3xl md:text-4xl font-black text-white font-display leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center text-fhp-blue-dark font-medium gap-2 bg-fhp-blue/5 px-4 py-2 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-fhp-blue" />
                    <span>{format(parseISO(selectedEvent.date_time), "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center text-fhp-blue-dark font-medium gap-2 bg-fhp-blue/5 px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5 text-fhp-blue" />
                    <span>{format(parseISO(selectedEvent.date_time), "h:mm a")}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">About The Event</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedEvent.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">Location</h3>
                  <div className="flex items-start text-gray-700 gap-3">
                    <MapPin className="w-5 h-5 text-fhp-blue shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                  <a
                    href="#contact"
                    onClick={() => setSelectedEvent(null)}
                    className="px-8 py-4 bg-fhp-blue text-white rounded-xl font-bold hover:bg-fhp-blue-dark transition-colors shadow-lg shadow-fhp-blue/30"
                  >
                    Contact Us To RSVP
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
