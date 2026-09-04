import test from 'node:test';
import assert from 'node:assert/strict';
import { getWhatsAppUrl } from './whatsapp.ts';

test('builds a WhatsApp link from an international number', () => {
  assert.equal(new URL(getWhatsAppUrl('+15551234567')!).pathname, '/15551234567');
  assert.equal(getWhatsAppUrl('15551234567'), getWhatsAppUrl('+15551234567'));
});
test('omits WhatsApp when configuration is missing or invalid', () => {
  for (const value of [undefined, '', '0123456789', 'https://example.com', '+12', '15551234567?x=y']) assert.equal(getWhatsAppUrl(value), null);
});
