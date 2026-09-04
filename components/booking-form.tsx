'use client';

import { type FormEvent, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const busy = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || submitted) return;
    const data = new FormData(event.currentTarget);
    {
      busy.current = true;
      setPending(true);
      setError('');
      const values = Object.fromEntries(data.entries());
      const payload = JSON.stringify(values);
      if (!submission.current || submission.current.payload !== payload) submission.current = { id: crypto.randomUUID(), payload };
      try {
        const response = await fetch('/api/enquiries', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, id: submission.current.id }),
          signal: AbortSignal.timeout(20000),
        });
        const parsed: unknown = await response.json();
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Unexpected response. Please try again.');
        const result = parsed as Record<string, unknown>;
        if (!response.ok || result.id !== submission.current.id) throw new Error(typeof result.error === 'string' ? result.error : 'Please try again or email us.');
        setSubmitted(true);
      } catch (failure) {
        setError(failure instanceof Error && failure.name !== 'TimeoutError' ? failure.message : 'We could not confirm submission. Please retry without changing the form.');
      } finally { setPending(false); busy.current = false; }
      return;
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} aria-busy={pending}>
      <div style={{ position: 'absolute', left: '-10000px' }} aria-hidden="true"><label htmlFor="website">Leave empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="field field-wide"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="What should we call you?" /></div>
      <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" required placeholder="080…" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@email.com" /></div>
      <div className="field field-wide"><label htmlFor="space">What do you need?</label><select id="space" name="space" required defaultValue=""><option value="" disabled>Choose a space</option><option>Hot Desk</option><option>Studio Setup</option><option>Meetings & Events</option><option>Studio Tour</option></select></div>
      <div className="field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" required /></div>
      <div className="field"><label htmlFor="time">Start time</label><input id="time" name="time" type="time" required /></div>
      <div className="field field-wide"><label htmlFor="headcount">How many people?</label><input id="headcount" name="headcount" type="number" min="1" required placeholder="e.g. 12" /></div>
      <div className="field field-wide"><label htmlFor="notes">Tell us about the idea</label><textarea id="notes" name="notes" rows={4} placeholder="Shoot, workshop, birthday meeting… give us the picture." /></div>
      <button type="submit" disabled={pending || submitted}>{pending ? 'Submitting…' : submitted ? 'Enquiry received' : 'Submit enquiry'} <ArrowUpRight /></button>
      <p className="form-note">We use your contact details to respond to this enquiry. Times are in Lagos local time. Submitting does not confirm a booking.</p>
      {error && <p className="form-note" role="alert">{error} You can also email <a href="mailto:thefhpstudios@gmail.com">thefhpstudios@gmail.com</a>.</p>}
      {submitted && <p className="form-note" role="status">Your enquiry has been saved. The FHP team will contact you to discuss availability.</p>}
    </form>
  );
}
