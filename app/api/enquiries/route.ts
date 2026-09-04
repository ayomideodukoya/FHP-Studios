import { createHmac } from 'node:crypto';
import { validateBooking } from '@/lib/booking-validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const reply = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  const { BOOKING_ENABLED, SITE_URL, SUPABASE_URL, SUPABASE_SECRET_KEY, BOOKING_RATE_SECRET } = process.env;
  if (BOOKING_ENABLED !== 'true' || !SITE_URL || !SUPABASE_URL || !SUPABASE_SECRET_KEY || !BOOKING_RATE_SECRET) return reply({ error: 'Online enquiries are not available yet. Please email thefhpstudios@gmail.com.' }, 503);
  if (request.headers.get('origin') !== new URL(SITE_URL).origin) return reply({ error: 'Please submit from the FHP website.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply({ error: 'Invalid submission format.' }, 415);
  // Bound streamed requests too; Content-Length is not always present or trustworthy.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: 'Empty submission.' }, 400);
  let raw = '';
  let size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) { await reader.cancel(); return reply({ error: 'Submission is too long.' }, 413); }
    raw += decoder.decode(value, { stream: true });
  }
  raw += decoder.decode();
  let booking;
  try { booking = validateBooking(JSON.parse(raw)); }
  catch (error) { return reply({ error: error instanceof SyntaxError ? 'Invalid submission.' : (error as Error).message }, 400); }
  // Vercel overwrites this header; never use an arbitrary client-provided IP header.
  const ip = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() : 'local';
  if (!ip) return reply({ error: 'Unable to verify the request. Please try again.' }, 503);
  const digest = (value: string) => createHmac('sha256', BOOKING_RATE_SECRET).update(value).digest('hex');
  try {
    const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/submit_enquiry`, {
      method: 'POST',
      headers: { apikey: SUPABASE_SECRET_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_booking: booking, p_ip_hash: digest(ip), p_email_hash: digest(booking.email) }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      // Log only status, never contact details or provider response bodies.
      console.error('Enquiry storage failed', response.status);
      return reply({ error: 'We could not save your enquiry. Please retry or email us.' }, 503);
    }
    const parsed: unknown = await response.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid storage response');
    const result = parsed as Record<string, unknown>;
    if (result.error === 'rate_limit') return reply({ error: 'Too many enquiries. Please wait an hour or contact us by email.' }, 429);
    if (result.error === 'conflict') return reply({ error: 'This enquiry changed after submission. Please reload to start a new enquiry.' }, 409);
    if (result.id !== booking.id) throw new Error('Invalid storage confirmation');
    return reply({ id: result.id }, 201);
  } catch {
    return reply({ error: 'We could not confirm your enquiry was saved. Retry with this form to avoid duplicates.' }, 503);
  }
}
