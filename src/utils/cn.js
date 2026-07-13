import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility: merge Tailwind classes intelligently
 * Handles conflicting classes and conditional class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in INR
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate text to a max character count
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Slugify a string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format duration label
 */
export function formatDuration(days) {
  return `${days}N/${days + 1}D`;
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty) {
  const map = {
    Easy: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    'Moderate-Hard': 'bg-orange-100 text-orange-700',
    Hard: 'bg-red-100 text-red-700',
    Challenging: 'bg-red-100 text-red-700',
  };
  return map[difficulty] ?? 'bg-dark-100 text-dark-600';
}
