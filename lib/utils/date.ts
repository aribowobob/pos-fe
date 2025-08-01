import { format as formatDate, Locale } from 'date-fns';
import { id } from 'date-fns/locale';

// Indonesian locale for date-fns
export const indonesianLocale: Locale = id;

/**
 * Format date with Indonesian locale
 * @param date Date to format
 * @param formatString Format string (e.g., 'dd MMMM yyyy', 'yyyy-MM-dd')
 * @returns Formatted date string in Indonesian
 */
export function formatDateIndonesian(
  date: string | Date,
  formatString: string = 'd MMM yyyy'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDate(dateObj, formatString, { locale: indonesianLocale });
}

/**
 * Format date for display (human readable)
 * @param date Date to format
 * @returns Formatted date string like "20 Juli 2025"
 */
export function formatDisplayDate(date?: string | Date): string {
  if (!date) return '';
  return formatDateIndonesian(date, 'd MMM yyyy');
}

/**
 * Format date for forms/API (ISO format)
 * @param date Date to format
 * @returns Formatted date string like "2025-07-20"
 */
export function formatApiDate(date: Date): string {
  return formatDate(date, 'yyyy-MM-dd');
}
