import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { contactInfo } from '../../data/navigation';

export default function ContactCTA() {
  return (
    <section className="section-py bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-4xl overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-900/75 to-dark-900/50" />

          <div className="relative px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-2xl">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-xs font-bold uppercase tracking-widest">Plan Your Trek</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              >
                Ready for Your<br />
                <span className="text-accent">Next Summit?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="text-white/70 text-lg leading-relaxed mb-10"
              >
                Our trek experts will craft the perfect Himalayan adventure for you. 
                Get in touch today — no obligation, just great conversations about mountains.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.28 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-primary-600 text-white font-bold
                             hover:bg-primary-500 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Free Consultation
                </Link>
                <a
                  href={`https://wa.me/918279888470?text=Hi! I'd like to know more about your trek packages.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-white/30 text-white font-bold glass
                             hover:bg-white hover:text-dark-900 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </motion.div>

              {/* Contact cards */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-3 glass rounded-2xl px-4 py-3 hover:bg-white/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium">Call Us Free</p>
                    <p className="text-white font-bold text-sm">{contactInfo.phone}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 glass rounded-2xl px-4 py-3 hover:bg-white/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium">Email Us</p>
                    <p className="text-white font-bold text-sm">{contactInfo.email}</p>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
