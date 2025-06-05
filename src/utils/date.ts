/**
 * Converts a timestamp (number) to a year in Vietnam timezone (UTC+7).
 * @param {number} timestamp - Timestamp in milliseconds.
 * @returns {number} The corresponding year.
 */
export function getYearFromTimestamp(timestamp: number): number {
  if (!timestamp) return NaN;
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' }).format(
    date
  ) as unknown as number;
}

/**
 * Converts a timestamp to a formatted date string in Vietnam timezone.
 * @param {number} timestamp - Timestamp in milliseconds.
 * @returns {string} Date string in the format dd/mm/yyyy.
 */
export function formatDate(timestamp: number): string {
  if (!timestamp) return 'Invalid Date';
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(date);
}
