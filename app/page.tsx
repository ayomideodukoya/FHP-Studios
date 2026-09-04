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
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { businessSchema } from '@/lib/site-seo';

export default function Home() {
  const whatsappUrl = getWhatsAppUrl(process.env.FHP_WHATSAPP_NUMBER);
  return (
    <main className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, '\\u003c') }} />
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
          <span>Create. Work. Host.</span>
          <span className="hero-line-two">In Ogba, Lagos<span className="dot">.</span></span>
        </h1>

        <div className="hero-bottom">
          <p>FHP Studios is your creative studio, hot desk workspace and intimate event venue in Ogba, Lagos. Bring your next shoot, workday or gathering to life.</p>
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
          <h2>Studio hire.<br />Workspace. Events.</h2>
          <p>Choose a setup for your next photo shoot, focused workday or intimate event. Tell us your date, duration and group size; we’ll confirm availability and the current rate.</p>
        </div>

        <div className="offer-list">
          <article className="offer-row" id="hot-desks">
            <span className="offer-number">01</span>
            <BriefcaseBusiness aria-hidden="true" />
            <div><h3>Hot desks in Ogba</h3><p>A workspace for freelancers, founders and small teams. Make room for focused work, planning and your next idea.</p></div>
            <ul><li><Check /> Solo workdays</li><li><Check /> Small-team sessions</li><li><Check /> Ask about inclusions</li></ul>
            <a href="#book">Enquire about a hot desk <ArrowUpRight /></a>
          </article>
          <article className="offer-row" id="studio-hire">
            <span className="offer-number">02</span>
            <Camera aria-hidden="true" />
            <div><h3>Creative studio hire</h3><p>Plan portraits, brand photo shoots, content days or interviews at our Lagos studio. Share your brief so we can discuss the setup and equipment you need.</p></div>
            <ul><li><Check /> Portraits & content</li><li><Check /> Interviews</li><li><Check /> Confirm equipment with us</li></ul>
            <a href="#book">Check studio availability <ArrowUpRight /></a>
          </article>
          <article className="offer-row" id="event-space">
            <span className="offer-number">03</span>
            <Users aria-hidden="true" />
            <div><h3>Meeting & event space</h3><p>Host a workshop, talk, launch or intimate gathering in Ogba. We’ll discuss your guest count, layout and plans before confirming the booking.</p></div>
            <ul><li><Check /> Workshops & talks</li><li><Check /> Intimate gatherings</li><li><Check /> Confirm capacity with us</li></ul>
            <a href="#book">Plan your event <ArrowUpRight /></a>
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
          <p className="eyebrow">Inside FHP Studios</p>
          <h2>Good people.<br />Beautiful moments.</h2>
        </div>
        <div className="moments-grid">
          <article className="moment-card moment-large">
            <img src="/images/fhp-ogba-community.webp" width={1600} height={1200} loading="lazy" decoding="async" alt="A group gathered for a photo in front of the FHP Studios logo wall in Ogba" />
            <div><span>Community</span><h3>The room feels different when everyone brings something.</h3></div>
          </article>
          <article className="moment-card">
            <img src="/images/fhp-ogba-gathering.webp" width={1200} height={1600} loading="lazy" decoding="async" alt="Guests seated on the blue sofa, chairs and tiered seating at FHP Studios" />
            <div><span>Gatherings</span><h3>Good company. A space to connect.</h3></div>
          </article>
          <article className="moment-card">
            <img src="/images/fhp-ogba-studio-setup.webp" width={1200} height={1600} loading="lazy" decoding="async" alt="Green photography backdrop, tripod and chair in the FHP creative studio" />
            <div><span>Studio</span><h3>Make room for your next idea.</h3></div>
          </article>
        </div>
        <p className="image-disclosure">Real spaces and gatherings at FHP Studios, Ogba.</p>
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
          <img src="/images/fhp-ogba-event-space.webp" width={1200} height={1600} loading="lazy" decoding="async" alt="FHP Studios interior with a blue sofa, green armchair and tiered seating beneath the cloud logo" />
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
          <h2>Your booking<br />questions, answered.</h2>
        </div>
        <div className="faq-list">
          <details><summary>Where is FHP Studios in Lagos?</summary><p>Find us at Plot 32, Oba Ogunji Road, Ogba, Lagos. We’re open daily from 9am to 7pm. <a href="#book">View the map and request a visit.</a></p></details>
          <details><summary>What can I book at FHP Studios?</summary><p>You can enquire about a hot desk, a creative studio setup for shoots and content creation, or space for meetings and intimate events. You can also request a studio tour.</p></details>
          <details><summary>Does submitting the form confirm my booking?</summary><p>No. The form sends an enquiry. Our team will discuss availability, pricing and your requirements before confirming a booking.</p></details>
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
          {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© 2026 FHP Studios. Where ideas come alive.</small>
      </footer>

      <a className="whatsapp-float" href={whatsappUrl || '#book'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined} aria-label={whatsappUrl ? 'Chat with FHP on WhatsApp (opens in a new tab)' : 'Enquire about a booking'}>
        <MessageCircle aria-hidden="true" /> <span>{whatsappUrl ? 'Chat on WhatsApp' : 'Let’s book'}</span>
      </a>
    </main>
  );
}
