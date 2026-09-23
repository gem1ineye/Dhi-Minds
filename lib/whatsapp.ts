/** Builds a wa.me deep link with a prefilled message. `number` must be E.164 digits, no leading "+". */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
