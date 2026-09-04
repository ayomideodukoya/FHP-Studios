export const spaces = ['Hot Desk', 'Studio Setup', 'Meetings & Events', 'Studio Tour'];

export function validateBooking(value: unknown, today = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' })) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid submission.');
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number, required = true) => {
    if (typeof input[key] !== 'string') throw new Error(`Please check ${key}.`);
    const result = (input[key] as string).trim();
    if ((required && !result) || result.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(result)) throw new Error(`Please check ${key}.`);
    return result;
  };
  const id = text('id', 36);
  const name = text('name', 120);
  const phone = text('phone', 30);
  const email = text('email', 254).toLowerCase();
  const space = text('space', 40);
  const date = text('date', 10);
  const time = text('time', 5);
  const notes = text('notes', 3000, false);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new Error('Please reload the form.');
  if (!/^[+\d\s().-]{7,30}$/.test(phone) || phone.replace(/\D/g, '').length < 7) throw new Error('Please enter a valid phone number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email address.');
  if (!spaces.includes(space)) throw new Error('Please choose a listed space.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || date < today) throw new Error('Please choose a valid date today or later.');
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Please choose a valid start time.');
  if (typeof input.headcount !== 'string' && typeof input.headcount !== 'number') throw new Error('Please check the number of people.');
  const headcount = Number(input.headcount);
  if (!Number.isInteger(headcount) || headcount < 1 || headcount > 10000) throw new Error('Please check the number of people.');
  if (input.website) throw new Error('Submission rejected.');
  return { id, name, phone, email, space, date, time, headcount, notes };
}
