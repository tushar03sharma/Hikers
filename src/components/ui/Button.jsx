import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-glow-primary active:scale-95',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 shadow-md active:scale-95',
  accent:
    'bg-accent text-dark-900 hover:bg-accent-600 shadow-md hover:shadow-glow-accent active:scale-95',
  outline:
    'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white active:scale-95',
  'outline-white':
    'border-2 border-white text-white hover:bg-white hover:text-primary-700 active:scale-95',
  ghost:
    'text-primary-600 hover:bg-primary-50 active:scale-95',
  'ghost-white':
    'text-white hover:bg-white/10 active:scale-95',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:scale-95',
};

const sizes = {
  xs: 'px-3 py-1.5 text-xs rounded-lg',
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
};

/**
 * Reusable Button component with Framer Motion ripple and variants
 */
const Button = React.forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon,
    iconRight,
    loading = false,
    disabled = false,
    fullWidth = false,
    as: Component = 'button',
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="flex-shrink-0">{iconRight}</span>
      )}
    </motion.button>
  );
});

export default Button;
