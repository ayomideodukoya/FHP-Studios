import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutSpace } from "@/components/sections/AboutSpace";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSpace />
      <EventsCalendar />
      <ContactForm />
      <Footer />
    </main>
  );
}
