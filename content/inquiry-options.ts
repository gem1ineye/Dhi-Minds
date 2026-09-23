/** PRD §8.14 — configurable select options for the inquiry form, shared by client and server validation. */

export const serviceOptions = [
  "Website",
  "SaaS Product",
  "Web Application",
  "SEO",
  "Social Media Marketing",
  "Branding",
  "Media/Creative",
  "Digital Strategy",
  "Other",
] as const;

export const timelineOptions = ["ASAP", "1 month", "1-3 months", "3+ months", "Exploring"] as const;

const currency = process.env.NEXT_PUBLIC_CURRENCY || "INR";
const symbol = currency === "INR" ? "₹" : currency + " ";

export const budgetBands = [
  { value: "under-1l", label: `Under ${symbol}1,00,000` },
  { value: "1l-3l", label: `${symbol}1,00,000 – ${symbol}3,00,000` },
  { value: "3l-10l", label: `${symbol}3,00,000 – ${symbol}10,00,000` },
  { value: "10l-plus", label: `${symbol}10,00,000+` },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const budgetValues = budgetBands.map((b) => b.value) as [string, ...string[]];
