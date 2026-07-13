import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page numbers: always show first, last, current ±1, and ellipsis
  const pages = [];
  const delta = 1;
  const range = [];
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }
  if (currentPage - delta > 2) range.unshift('...');
  if (currentPage + delta < totalPages - 1) range.push('...');
  pages.push(1, ...range);
  if (totalPages > 1) pages.push(totalPages);

  const PageBtn = ({ page, active, disabled, children, onClick }) => (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
        active
          ? 'bg-primary-600 text-white shadow-md scale-105'
          : disabled
          ? 'text-dark-300 cursor-not-allowed'
          : 'bg-white text-dark-600 hover:bg-primary-50 hover:text-primary-600 border border-dark-100 hover:border-primary-200 hover:scale-105'
      )}
    >
      {children ?? page}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-10"
      aria-label="Pagination"
      role="navigation"
    >
      {/* Prev */}
      <PageBtn
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </PageBtn>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-10 text-center text-dark-400 text-sm">
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            page={p}
            active={p === currentPage}
            onClick={() => onPageChange(p)}
          />
        )
      )}

      {/* Next */}
      <PageBtn
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </PageBtn>
    </motion.div>
  );
}
