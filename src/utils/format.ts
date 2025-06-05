/**
 * Formats a number as a price in Vietnamese currency format.
 * @param {number} price - The price to format.
 * @param {string} currency - Currency code (default is 'VND').
 * @returns {string} The formatted price with thousand separators.
 */
export function formatPrice(price: number, currency: string = 'VND'): string {
  if (isNaN(price)) return 'Invalid Price';

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}
