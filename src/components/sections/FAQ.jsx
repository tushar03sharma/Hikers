import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { faqs, faqCategories } from '../../data/faqs';

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border border-dark-100 rounded-2xl overflow-hidden bg-white hover:border-primary-200 transition-colors duration-200">
    <button
      id={`faq-btn-${faq.id}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={`faq-content-${faq.id}`}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                 hover:bg-primary-50/50 transition-colors duration-200"
    >
      <div className="flex items-start gap-3 flex-1">
        <span className="text-primary-400 mt-0.5 flex-shrink-0">
          <HelpCircle className="w-4 h-4" />
        </span>
        <span className="text-dark-800 font-semibold text-sm leading-snug">{faq.question}</span>
      </div>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200 ${
          isOpen ? 'bg-primary-600 text-white' : 'bg-dark-100 text-dark-500'
        }`}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`faq-content-${faq.id}`}
          role="region"
          aria-labelledby={`faq-btn-${faq.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 pt-1 ml-7">
            <div className="h-px bg-dark-100 mb-4" />
            <p className="text-dark-600 text-sm leading-relaxed">{faq.answer}</p>
            <span className="inline-flex items-center mt-3 px-2.5 py-1 rounded-full text-2xs font-semibold bg-primary-50 text-primary-600">
              {faq.category}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="section-py bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Header + Categories */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <SectionHeader
              label="FAQ"
              title="Got"
              titleHighlight="Questions?"
              subtitle="Everything you need to know before your first Himalayan adventure."
              align="left"
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-surface text-dark-600 hover:bg-primary-50 hover:text-primary-700 border border-dark-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Help CTA */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-6 border border-primary-100">
              <h4 className="font-bold text-dark-800 mb-2">Still have questions?</h4>
              <p className="text-sm text-dark-500 mb-4 leading-relaxed">
                Our trek experts are available Mon–Sun, 7 AM–10 PM to answer anything.
              </p>
              <a
                href="tel:+918279888470"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold
                           hover:bg-primary-700 transition-colors duration-200"
              >
                📞 Call Us Free
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3"
              >
                {filtered.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
