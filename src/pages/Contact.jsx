import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle, Globe,
  Film, ChevronDown, Mountain, Users, Star
} from 'lucide-react';
import { contactInfo } from '../data/navigation';
import SectionHeader from '../components/ui/SectionHeader';
import { Link } from 'react-router-dom';

/* ─── Form field component ──────────────────────────────────── */
const Field = ({ id, label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-bold text-dark-700">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="flex items-center gap-1.5 text-red-500 text-xs font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputClass = (error) =>
  `w-full px-4 py-3.5 rounded-xl border text-sm font-medium text-dark-800 placeholder:text-dark-300
   focus:outline-none focus:ring-2 transition-all duration-200 bg-white
   ${error
     ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
     : 'border-dark-200 focus:ring-primary-100 focus:border-primary-400'
   }`;

const TREK_OPTIONS = [
  'Kedarkantha Trek', 'Har Ki Dun Trek', 'Buran Ghati Trek',
  'Dayara Bugyal Trek', 'Valley of Flowers Trek', 'Rupin Pass Trek',
  'Chopta Chandrashila Trek', 'Nag Tibba Trek', 'Bali Pass Trek',
  'Phulara Ridge Trek', 'Chandernahan Lake Trek', 'Borasu Pass Trek',
  'Ruinsara Tal Trek', 'Chaainsheel Bugyal Trek',
  'Not sure yet — need guidance',
];

const FAQ_QUICK = [
  { q: 'Is there a physical fitness requirement?', a: 'Yes, but it varies by trek. Our team will share a tailored fitness guide once you connect with us.' },
  { q: 'How do I reach the trek starting point?', a: 'We provide detailed travel instructions for each trek. Most routes depart from Dehradun or Shimla.' },
  { q: 'Are solo travellers welcome?', a: 'Absolutely! Most of our trekkers join solo and leave with lifelong friends.' },
];

/* ─── Main Contact Page ─────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', trek: '', message: '', how: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required';
    if (!form.phone.trim() || form.phone.replace(/\D/, '').length < 10) e.phone = 'Valid phone number required';
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Please write at least 20 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-primary-950 via-dark-900 to-secondary-900 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Let's Plan Your<br />
              <span className="text-accent">Dream Trek</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mb-8">
              Have questions? Want expert advice on which trek suits you best? Our team responds within 24 hours — Mon to Sun.
            </p>

            {/* Quick Contact Pills */}
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2.5 glass rounded-2xl px-5 py-3 text-white hover:bg-white/20 transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xs text-white/60 font-medium leading-none">Call us free</p>
                  <p className="text-sm font-bold">{contactInfo.phone}</p>
                </div>
              </a>
              <a href={`https://wa.me/918279888470`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 glass rounded-2xl px-5 py-3 text-white hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xs text-white/60 font-medium leading-none">WhatsApp</p>
                  <p className="text-sm font-bold">Chat Now</p>
                </div>
              </a>
              <a href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-2.5 glass rounded-2xl px-5 py-3 text-white hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-secondary-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-2xs text-white/60 font-medium leading-none">Email us</p>
                  <p className="text-sm font-bold">{contactInfo.email}</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Grid ─────────────────────────────────────── */}
      <div className="section-container py-12">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Form (3 cols) ────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-card border border-dark-100 overflow-hidden"
            >
              {/* Form header */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6">
                <h2 className="text-xl font-black text-white mb-1">Send Us a Message</h2>
                <p className="text-white/70 text-sm">We'll get back to you within 24 hours.</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                  {/* Row 1: Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field id="contact-name" label="Full Name" required error={errors.name}>
                      <input
                        id="contact-name" type="text" value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="John Doe"
                        className={inputClass(errors.name)}
                      />
                    </Field>
                    <Field id="contact-phone" label="Phone Number" required error={errors.phone}>
                      <input
                        id="contact-phone" type="tel" value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={inputClass(errors.phone)}
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field id="contact-email" label="Email Address" required error={errors.email}>
                    <input
                      id="contact-email" type="email" value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="john@example.com"
                      className={inputClass(errors.email)}
                    />
                  </Field>

                  {/* Trek Interest */}
                  <Field id="contact-trek" label="Trek You're Interested In">
                    <div className="relative">
                      <select
                        id="contact-trek" value={form.trek}
                        onChange={(e) => set('trek', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-dark-200 text-sm font-medium text-dark-800 appearance-none
                                   focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 bg-white cursor-pointer transition-all"
                      >
                        <option value="">Select a trek (optional)</option>
                        {TREK_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                    </div>
                  </Field>

                  {/* How did you hear */}
                  <Field id="contact-how" label="How Did You Hear About Us?">
                    <div className="flex flex-wrap gap-2">
                      {['Google', 'Instagram', 'Friend / Word of Mouth', 'YouTube', 'Travel Blog', 'Other'].map((src) => (
                        <button
                          key={src} type="button"
                          onClick={() => set('how', src)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200
                            ${form.how === src
                              ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                              : 'bg-white text-dark-600 border-dark-200 hover:border-primary-300 hover:text-primary-700'
                            }`}
                        >
                          {src}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Message */}
                  <Field id="contact-message" label="Your Message" required error={errors.message}>
                    <textarea
                      id="contact-message" rows={5} value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Tell us about your trekking experience, preferred dates, group size, any special requirements..."
                      className={`${inputClass(errors.message)} resize-none`}
                    />
                    <p className={`text-xs self-end -mt-1 font-medium ${form.message.length < 20 && form.message.length > 0 ? 'text-red-400' : 'text-dark-400'}`}>
                      {form.message.length} / 500
                    </p>
                  </Field>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl bg-primary-600 text-white font-black text-base
                               hover:bg-primary-700 transition-colors shadow-md
                               flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-dark-400">
                    🔒 We never share your details. View our <span className="underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </form>
              ) : (
                /* Success */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 flex flex-col items-center text-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-black text-dark-900 mb-2">Message Received! 🎉</h3>
                    <p className="text-dark-500 leading-relaxed max-w-sm">
                      Thanks <strong>{form.name}</strong>! Our trek expert will call you at{' '}
                      <strong>{form.phone}</strong> within 24 hours.
                    </p>
                  </div>
                  <div className="bg-surface rounded-2xl p-5 w-full border border-dark-100 flex flex-col gap-3 text-left">
                    <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-1">What Happens Next</p>
                    {[
                      { icon: Phone, text: 'Expert calls you within 24 hours (7 AM – 10 PM)' },
                      { icon: Mountain, text: form.trek ? `Detailed info on ${form.trek} shared` : 'Personalised trek recommendations shared' },
                      { icon: Mail, text: `Confirmation email sent to ${form.email}` },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm text-dark-600">
                        <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary-600" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <Link to="/treks"
                    className="w-full py-3.5 rounded-2xl bg-primary-600 text-white font-bold text-center
                               hover:bg-primary-700 transition-colors"
                  >
                    Explore Our Treks While You Wait
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ── Right: Info (2 cols) ───────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl shadow-card border border-dark-100 p-6 flex flex-col gap-4"
            >
              <h3 className="font-black text-dark-900 text-lg">Contact Details</h3>
              {[
                { icon: Phone, label: 'Phone / WhatsApp', value: contactInfo.phone, href: `tel:${contactInfo.phone}`, color: 'bg-blue-50 text-primary-600' },
                { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, color: 'bg-teal-50 text-secondary-600' },
                { icon: MapPin, label: 'Base Office', value: contactInfo.address, href: 'https://maps.google.com/?q=Sankri,Uttarakhand', color: 'bg-rose-50 text-rose-500' },
                { icon: Clock, label: 'Working Hours', value: contactInfo.hours, href: null, color: 'bg-amber-50 text-accent' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="text-sm font-semibold text-dark-700 hover:text-primary-600 transition-colors leading-snug">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-dark-700 leading-snug">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="rounded-3xl overflow-hidden shadow-card border border-dark-100 relative h-52 bg-dark-100"
            >
              <iframe
                title="SummitSeek Location — Sankri, Uttarakhand"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.2!2d78.0891!3d31.0922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3906d6e4fa4d4a4f%3A0x4c94c9e1f6de2e34!2sSankri%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1687000000000"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 right-3">
                <a
                  href="https://maps.google.com/?q=Sankri,Uttarakhand"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-white rounded-xl px-3 py-2 text-xs font-bold text-dark-700 shadow-card hover:bg-primary-50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary-600" /> Open in Maps
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="bg-white rounded-3xl shadow-card border border-dark-100 p-6"
            >
              <h3 className="font-black text-dark-900 text-base mb-4">Follow Our Adventures</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Instagram', handle: '@summitseek', href: 'https://instagram.com', icon: Globe, color: 'bg-pink-50 text-pink-600 border-pink-100' },
                  { label: 'YouTube', handle: 'SummitSeek', href: 'https://youtube.com', icon: Film, color: 'bg-red-50 text-red-600 border-red-100' },
                  { label: 'WhatsApp', handle: 'Chat with Us', href: 'https://wa.me/918279888470', icon: MessageCircle, color: 'bg-green-50 text-green-600 border-green-100' },
                  { label: 'Reviews', handle: '4.9★ on Google', href: '#', icon: Star, color: 'bg-amber-50 text-amber-600 border-amber-100' },
                ].map(({ label, handle, href, icon: Icon, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all duration-200 hover:scale-105 hover:shadow-sm ${color}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none">{label}</p>
                      <p className="text-2xs opacity-70 mt-0.5">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-6 text-white"
            >
              <p className="font-black text-lg mb-4">Why Trek With Us?</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Users, text: '5,000+ Happy Trekkers' },
                  { icon: Mountain, text: '99% Summit Success Rate' },
                  { icon: Star, text: '4.9★ Avg. Rating' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/90 font-semibold">
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Quick FAQ ──────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="section-container">
          <SectionHeader
            label="Quick FAQ"
            title="Common"
            titleHighlight="Questions"
            subtitle="Fast answers before you reach out."
            className="mb-10"
          />
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {FAQ_QUICK.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-surface rounded-3xl p-6 border border-dark-100 hover:shadow-card transition-shadow cursor-default"
              >
                <p className="font-bold text-dark-900 text-sm mb-2 leading-snug">❓ {item.q}</p>
                <p className="text-dark-500 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/#faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-primary-600 text-primary-600
                         font-bold hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              View Full FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
