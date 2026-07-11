import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 rounded-4xl p-10 md:p-14 overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          {/* Floating icons */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 right-16 text-white/10 text-7xl select-none pointer-events-none hidden lg:block"
          >
            🏔️
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-8 right-40 text-white/10 text-5xl select-none pointer-events-none hidden lg:block"
          >
            ❄️
          </motion.div>

          <div className="relative max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Newsletter</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              Get Trek Updates &<br />
              <span className="text-accent">Exclusive Offers</span>
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Join 10,000+ adventure lovers. Get early access to new treks, seasonal discounts, and Himalayan travel tips — straight to your inbox.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 glass rounded-2xl px-6 py-4 w-fit"
              >
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-white font-bold">You're on the list!</p>
                  <p className="text-white/65 text-sm">Check your inbox for a welcome email.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-dark-800 text-sm font-medium
                               placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-accent
                               shadow-inner-lg"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-accent text-dark-900
                             font-bold text-sm hover:bg-accent-600 transition-all duration-200
                             hover:scale-105 active:scale-95 shadow-md disabled:opacity-70 flex-shrink-0"
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                  ) : (
                    <>Subscribe <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}

            <p className="text-white/45 text-xs mt-4">
              No spam, ever. Unsubscribe anytime. 🔒
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
