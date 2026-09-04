export function getWhatsAppUrl(number: string | undefined): string | null {
  const value = number?.trim();
  if (!value || !/^\+?[1-9]\d{7,14}$/.test(value)) return null;
  const digits = value.replace(/^\+/, '');
  const message = 'Hi FHP Studios, I’d like to enquire about a space.';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
