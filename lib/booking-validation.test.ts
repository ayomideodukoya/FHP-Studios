import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBooking } from './booking-validation.ts';

const valid = { id: '51b26083-4907-4bbb-8363-e5c6b499d079', name: 'Test Guest', phone: '+2348012345678', email: 'GUEST@example.com', space: 'Studio Tour', date: '2026-09-20', time: '10:00', headcount: '2', notes: '', website: '' };
test('normalizes email and headcount', () => { const result = validateBooking(valid, '2026-09-03'); assert.equal(result.email, 'guest@example.com'); assert.equal(result.headcount, 2); });
for (const patch of [{ email: 'invalid' }, { date: '2026-02-30' }, { date: '2026-09-01' }, { time: '25:00' }, { headcount: '1.5' }, { space: 'Unlisted' }, { website: 'bot' }, { notes: 'a'.repeat(3001) }, { id: 'bad' }, { name: '' }]) {
  test(`rejects ${Object.keys(patch)[0]} ${JSON.stringify(patch).slice(0, 50)}`, () => assert.throws(() => validateBooking({ ...valid, ...patch }, '2026-09-03')));
}
