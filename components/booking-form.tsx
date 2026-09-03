'use client';

import { type FormEvent, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hi FHP Studios, I would like to book a space.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Space: ${data.get('space')}`,
      `Date: ${data.get('date')}`,
      `Time: ${data.get('time')}`,
      `Headcount: ${data.get('headcount')}`,
      `Notes: ${data.get('notes') || 'None'}`,
    ].join('\n');
    setSubmitted(true);
    window.location.href = `mailto:thefhpstudios@gmail.com?subject=${encodeURIComponent('FHP booking enquiry')}&body=${encodeURIComponent(message)}`;
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="field field-wide"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="What should we call you?" /></div>
      <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" required placeholder="080…" /></div>
      <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@email.com" /></div>
      <div className="field field-wide"><label htmlFor="space">What do you need?</label><select id="space" name="space" required defaultValue=""><option value="" disabled>Choose a space</option><option>Hot Desk</option><option>Studio Setup</option><option>Meetings & Events</option><option>Studio Tour</option></select></div>
      <div className="field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" required /></div>
      <div className="field"><label htmlFor="time">Start time</label><input id="time" name="time" type="time" required /></div>
      <div className="field field-wide"><label htmlFor="headcount">How many people?</label><input id="headcount" name="headcount" type="number" min="1" required placeholder="e.g. 12" /></div>
      <div className="field field-wide"><label htmlFor="notes">Tell us about the idea</label><textarea id="notes" name="notes" rows={4} placeholder="Shoot, workshop, birthday meeting… give us the picture." /></div>
      <button type="submit">Prepare email enquiry <ArrowUpRight /></button>
      <p className="form-note">Opens your email app. Send the draft to request availability; your booking is not confirmed yet.</p>
      {submitted && <p className="form-note" role="status">Email draft requested. If your email app did not open, contact thefhpstudios@gmail.com directly.</p>}
    </form>
  );
}
