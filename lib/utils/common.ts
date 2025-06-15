import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Logging function that only logs in development mode
 * @param args Arguments to log
 */
export const devLog = (...args: unknown[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

/**
 * Format a number as currency with Indonesian Rupiah format
 * @param value Number to format
 * @param options Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  options?: { withSymbol?: boolean }
): string {
  const withSymbol = options?.withSymbol ?? true;
  const formatter = new Intl.NumberFormat('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

/**
 * Show error toast with better formatting
 * @param error The error object or message
 */
export function handleError(error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  toast.error(errorMessage || 'Terjadi kesalahan');
  console.error(error);
}
