# FHP production launch

## Current state

Vercel builds use `npm run build:vercel`. Existing Sites builds continue to use `npm run build`; no Sites deployment or access change is required for this migration.

The booking endpoint and database migration are prepared, not live-tested. `BOOKING_ENABLED` defaults off. The form always submits to the server and never opens an email draft. Until enabled, the server returns an on-page unavailable message; it does not save an enquiry or report success. No real enquiries have been migrated or submitted by this implementation workflow.

Local checks on 2026-09-04: compilation, TypeScript and 11 input-validation tests passed. Vercel builds use the supported Webpack compiler because Turbopack's local compiler subprocess failed with a port permission error. Database integration, email delivery, anonymous-access checks and production deployment remain unverified. The saved GitHub login was invalid; reconnect before attempting repository publication. The dependency audit still reports advisories in the retained Sites dependency tree and react-server-dom-webpack; remediate and rerun the audit before production launch.

## Accounts and configuration

1. Use FHP-owned Vercel, GitHub and Supabase accounts. Import this repository as a Vercel Next.js project. Confirm plan eligibility for a commercial business before purchasing a plan.
2. Create a Supabase project in an appropriate region and apply `supabase/migrations/202609030001_enquiries.sql` in its SQL editor. The migration creates new tables and must be run only once in a fresh database. Use separate development and production projects.
3. Set the variables from `.env.example` in Vercel's environment settings. Use the Supabase **secret** API key, never a public key or a NEXT_PUBLIC_ variable. Generate a long random `BOOKING_RATE_SECRET` in a password manager. Do not paste secrets into chat or commit them.
4. Set `SITE_URL` to the exact final origin. Keep `BOOKING_ENABLED=false` until the checks below pass in a staging deployment. Enabling requires a rebuild because the homepage may be prerendered.
5. Add a verified sending domain and an email provider before implementing/enabling the notification worker. The migration creates a durable pending-notifications table, but delivery is NOT implemented yet. The worker must claim jobs safely, use stable provider idempotency keys, retry failures, record completion, and alert on exhausted retries. Do not rely on a request that continues after returning the form response.
6. Set backup retention, test restore, configure monitoring and agree enquiry/contact-data retention with FHP. Keep the public unable to read or update any enquiry. Staff can initially use the Supabase dashboard; a staff login/dashboard and Google Sheets sync are not implemented.

## Required verification before launch

- Run `npm run build:vercel` and the booking validation tests.
- Apply the migration to staging and submit a clearly labelled test enquiry. Verify exactly one enquiry and one pending notification.
- Retry the same ID and payload: still exactly one row. Change the payload under the same ID: receive a conflict.
- Check invalid dates, malformed values, oversized requests, honeypot and cross-origin requests are rejected.
- Verify both rate limits across concurrent requests; only five new enquiries per hour per IP or email should succeed.
- Prove anonymous and ordinary authenticated Supabase clients cannot read/write tables or execute `submit_enquiry`.
- Simulate database failure and network timeout: no false success; retry the unchanged form without duplication.
- Test the notification worker and monitoring once implemented, including failed delivery and retries.
- Configure a privacy notice, business retention policy, and additional bot protection if traffic warrants it.
- Confirm the domain and Vercel project audience before production publishing; do not change the existing Sites URL or domain DNS until approved.

## Data flow

Browser → same-origin server endpoint → server-only Supabase RPC → enquiry + notification job in one transaction.

Database rows are the source of truth. Optional Sheets synchronization should be one-way and keyed by enquiry ID; a Sheets or email outage must not prevent storage. The database's `status` is operational follow-up only; submitting does not reserve a space or verify availability.
