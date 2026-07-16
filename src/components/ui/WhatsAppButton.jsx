import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [expanded, setExpanded] = useState(false);

  const waLink =
    'https://wa.me/8076533785?text=Hi%20SummitSeek!%20I%27d%20like%20to%20know%20more%20about%20your%20trek%20packages.';

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="bg-white rounded-3xl shadow-card-hover border border-dark-100 p-5 w-72"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-dark-900 text-sm leading-none">SummitSeek Support</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-600 text-xs font-medium">Online now</span>
                </div>
              </div>
            </div>

            <p className="text-dark-600 text-sm leading-relaxed mb-4">
              👋 Hey! Ready to plan your Himalayan adventure? Chat with our trek experts instantly.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-500 text-white
                           font-bold text-sm hover:bg-green-600 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+918076533785"
                className="flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-dark-200
                           text-dark-700 font-semibold text-sm hover:bg-dark-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us Free
              </a>
            </div>

            <p className="text-center text-dark-400 text-xs mt-3">
              Typical reply time: &lt;5 minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setExpanded(!expanded)}
        className="relative w-14 h-14 rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600
                   flex items-center justify-center transition-colors duration-200"
        aria-label={expanded ? 'Close chat' : 'Chat on WhatsApp'}
      >
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!expanded && (
          <span className="absolute inset-0 rounded-2xl bg-green-500 animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}
