import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Check,
  Clock,
  Cloud,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { BookingForm } from '@/components/booking-form';
import { BrandLogo } from '@/components/brand-logo';

export default function Home() {
  return (
    <main className="site-shell">
      <header className="glass-nav">
        <a className="brand-mark" href="#top" aria-label="FHP Studios home">
          <BrandLogo />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#spaces">Spaces</a>
          <a href="#moments">Moments</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="pill-button nav-cta" href="#book">Book a space</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <MapPin size={17} aria-hidden="true" />
          Ogba, Lagos
        </div>

        <div className="cloud cloud-one" aria-hidden="true"><Cloud /></div>
        <div className="cloud cloud-two" aria-hidden="true"><Cloud /></div>
        <div className="cloud cloud-three" aria-hidden="true"><Cloud /></div>

        <h1>
          <span>Where ideas</span>
          <span className="hero-line-two">come alive<span className="dot">.</span></span>
        </h1>

        <div className="hero-bottom">
          <p>A bookable creative studio, workspace and intimate event venue for people building beautiful things.</p>
          <a className="round-link" href="#spaces" aria-label="Explore our spaces">
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="preview-strip" id="spaces" aria-label="Spaces at FHP Studios">
        <article className="preview-card preview-work">
          <span>01 / Work</span>
          <strong>Hot desks for focused days.</strong>
        </article>
        <article className="preview-card preview-shoot">
          <span>02 / Shoot</span>
          <strong>A blank canvas for your next frame.</strong>
        </article>
        <article className="preview-card preview-host">
          <span>03 / Host</span>
          <strong>Small events. Big energy.</strong>
        </article>
      </section>

      <section className="spaces-detail content-section">
        <div className="section-heading">
          <p className="eyebrow">Choose your setup</p>
          <h2>One space.<br />So many possibilities.</h2>
          <p>Come for an hour, a workday, a shoot, or a room full of your favourite people. We’ll help you shape the setup around the idea.</p>
        </div>

        <div className="offer-list">
          <article className="offer-row">
            <span className="offer-number">01</span>
            <BriefcaseBusiness aria-hidden="true" />
            <div><h3>Hot Desk</h3><p>Plug in, focus and get the work done—solo or with your small team.</p></div>
            <ul><li><Check /> Solo workdays</li><li><Check /> Small-team sessions</li><li><Check /> Ask about inclusions</li></ul>
            <a href="#book">Book this space <ArrowUpRight /></a>
          </article>
          <article className="offer-row">
            <span className="offer-number">02</span>
            <Camera aria-hidden="true" />
            <div><h3>Studio Setup</h3><p>A flexible canvas for portraits, campaigns, content days and interviews.</p></div>
            <ul><li><Check /> Portraits & content</li><li><Check /> Interviews</li><li><Check /> Confirm equipment with us</li></ul>
            <a href="#book">Book this space <ArrowUpRight /></a>
          </article>
          <article className="offer-row">
            <span className="offer-number">03</span>
            <Users aria-hidden="true" />
            <div><h3>Meetings & Events</h3><p>For intimate gatherings, workshops, talks, launches and celebrations.</p></div>
            <ul><li><Check /> Workshops & talks</li><li><Check /> Intimate gatherings</li><li><Check /> Confirm capacity with us</li></ul>
            <a href="#book">Book this space <ArrowUpRight /></a>
          </article>
        </div>
      </section>

      <section className="manifesto">
        <Cloud className="manifesto-cloud" aria-hidden="true" />
        <p>Come with an idea.</p>
        <h2>Leave with something real.</h2>
        <div className="marquee" aria-hidden="true">
          <span>CREATE ✦ WORK ✦ HOST ✦ SHOOT ✦ </span>
          <span>CREATE ✦ WORK ✦ HOST ✦ SHOOT ✦ </span>
        </div>
      </section>

      <section className="moments content-section" id="moments">
        <div className="section-heading compact">
          <p className="eyebrow">Imagine the possibilities</p>
          <h2>Good people.<br />Beautiful moments.</h2>
        </div>
        <div className="moments-grid">
          <article className="moment-card moment-large">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=85" alt="Creative community sharing a happy moment" />
            <div><span>Community</span><h3>The room feels different when everyone brings something.</h3></div>
          </article>
          <article className="moment-card">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85" alt="A collaborative workshop around a table" />
            <div><span>Workshops</span><h3>Ideas shared out loud.</h3></div>
          </article>
          <article className="moment-card">
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85" alt="A focused creative team meeting" />
            <div><span>Meetings</span><h3>Make room for the next move.</h3></div>
          </article>
        </div>
        <p className="image-disclosure">Illustrative photography throughout this preview is not a record of FHP’s rooms or past events. See Instagram for real FHP moments.</p>
        <a className="text-link" href="https://instagram.com/thefhpstudios" target="_blank" rel="noreferrer">
          <Camera /> See real FHP moments on Instagram <ArrowUpRight />
        </a>
      </section>

      <section className="about-grid" id="about">
        <div className="about-copy">
          <p className="eyebrow">Why FHP</p>
          <h2>A warm creative clubhouse in the heart of Ogba.</h2>
          <p>FHP Studios exists for the in-between stage—the moment an idea needs a table, a backdrop, a room, a little energy and the right people around it.</p>
          <p>We built a space that can shift with you: quiet enough to work, flexible enough to shoot, and welcoming enough to gather.</p>
          <a className="pill-button dark-button" href="#book">Bring your idea</a>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85" alt="A welcoming creative team collaborating in a bright studio" />
          <span className="image-sticker"><Sparkles /> built for possibility</span>
        </div>
      </section>

      <section className="booking-section" id="book">
        <div className="booking-intro">
          <p className="eyebrow">Book FHP</p>
          <h2>Let’s make room for your idea.</h2>
          <p>Tell us what you’re planning. We’ll confirm availability, share the current rate and help you choose the right setup.</p>
          <div className="contact-stack">
            <a href="mailto:thefhpstudios@gmail.com"><Mail /> thefhpstudios@gmail.com</a>
            <span><Clock /> Open daily, 9am–7pm</span>
            <a href="https://www.google.com/maps/search/?api=1&query=Plot+32+Oba+Ogunji+Road+Ogba+Lagos" target="_blank" rel="noreferrer"><MapPin /> Plot 32, Oba Ogunji Road, Ogba</a>
          </div>
          <iframe className="location-map" title="FHP Studios location in Ogba, Lagos" src="https://maps.google.com/maps?q=Plot%2032%20Oba%20Ogunji%20Road%20Ogba%20Lagos&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <BookingForm />
      </section>

      <section className="faq content-section">
        <div className="section-heading compact">
          <p className="eyebrow">Quick answers</p>
          <h2>Before you ask…</h2>
        </div>
        <div className="faq-list">
          <details><summary>Can I customise or decorate the space?</summary><p>Yes—as long as the setup does not damage the studio or equipment. Share your idea with us before your booking.</p></details>
          <details><summary>Do you provide photographers or videographers?</summary><p>We can connect you with trusted creatives from our network when you need an extra pair of hands.</p></details>
          <details><summary>How do I get the current price?</summary><p>Send your date, space type, duration and headcount through the booking form. We’ll reply with availability and the right rate.</p></details>
          <details><summary>Can I visit before booking?</summary><p>Absolutely. Ask for a studio tour and we’ll arrange a convenient time.</p></details>
        </div>
      </section>

      <footer id="contact">
        <a className="footer-brand" href="#top" aria-label="FHP Studios home"><BrandLogo /></a>
        <div className="footer-clouds" aria-hidden="true"><Cloud /><Cloud /><Cloud /></div>
        <p className="eyebrow">FHP Studios · Ogba, Lagos</p>
        <h2>Book a space.<br />Build your thing.</h2>
        <div className="footer-links">
          <a href="#book">Book now</a>
          <a href="https://instagram.com/thefhpstudios" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:thefhpstudios@gmail.com">Email</a>
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© 2026 FHP Studios. Where ideas come alive.</small>
      </footer>

      <a className="whatsapp-float" href="#book" aria-label="Enquire about a booking">
        <MessageCircle aria-hidden="true" /> <span>Let’s book</span>
      </a>
    </main>
  );
}
