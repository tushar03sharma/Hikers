import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Reusable section header with animated pill label, headline, and subtitle
 */
export default function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  dark = false,
  className,
}) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <div className={cn('flex flex-col gap-3', alignClass, className)}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit',
            dark
              ? 'bg-white/10 text-white/80'
              : 'bg-primary-50 text-primary-600 border border-primary-100'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {label}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight',
          dark ? 'text-white' : 'text-dark-900'
        )}
      >
        {title}{' '}
        {titleHighlight && (
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className={cn(
            'text-base md:text-lg max-w-2xl leading-relaxed',
            dark ? 'text-white/65' : 'text-dark-500',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
