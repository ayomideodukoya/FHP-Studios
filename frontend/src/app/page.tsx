import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutSpace } from "@/components/sections/AboutSpace";
import { EventsCalendar } from "@/components/sections/EventsCalendar";
import { ContactForm } from "@/components/sections/ContactForm";
import { SpaceSpecs } from "@/components/sections/SpaceSpecs";
import { FAQ } from "@/components/sections/FAQ";
import { Gallery } from "@/components/sections/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SpaceSpecs />
      <AboutSpace />
      <Gallery />
      <EventsCalendar />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
