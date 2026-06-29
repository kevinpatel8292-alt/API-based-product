/**
 * Currency utility for Indian Rupees (INR)
 * Conversion rate: 1 USD ≈ ₹84
 */

const USD_TO_INR = 84;

/**
 * Convert USD price to INR
 * @param {number} usdPrice
 * @returns {number}
 */
export function toINR(usdPrice) {
  return Math.round(usdPrice * USD_TO_INR);
}

/**
 * Format a number as Indian Rupees with ₹ symbol and Indian number system
 * e.g., 84000 → "₹84,000"  |  250000 → "₹2,50,000"
 * @param {number} usdPrice
 * @returns {string}
 */
export function formatINR(usdPrice) {
  const inr = toINR(usdPrice);
  return '₹' + inr.toLocaleString('en-IN');
}
