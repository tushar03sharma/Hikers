import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Users, Phone, Mail,
  ChevronDown, CheckCircle, Mountain, AlertCircle
} from 'lucide-react';
import { formatPrice } from '../../utils/cn';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const currentYear = new Date().getFullYear();
const YEARS = [currentYear, currentYear + 1];

export default function BookingModal({ trek, isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    month: '', year: String(currentYear),
    adults: 1, children: 0,
    requests: '',
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.replace(/\D/g,'').length < 10) e.phone = 'Valid phone number required';
    if (!form.month) e.month = 'Please select a preferred month';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1600);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setForm({ name:'',email:'',phone:'',month:'',year:String(currentYear),adults:1,children:0,requests:'' }); setErrors({}); }, 400);
  };

  const totalPax = form.adults + form.children;
  const estimatedTotal = trek ? trek.price * form.adults : 0;

  const InputField = ({ id, label, type = 'text', value, onChange, error, placeholder, required }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-dark-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-dark-800
                    placeholder:text-dark-300 focus:outline-none focus:ring-2 transition-all duration-200
                    ${error
                      ? 'border-red-300 focus:ring-red-200 bg-red-50'
                      : 'border-dark-200 focus:ring-primary-200 focus:border-primary-400 bg-white'
                    }`}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-red-500 text-xs font-medium">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="booking-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/70 backdrop-blur-sm z-90"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="booking-modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {step === 1 ? (
                <>
                  {/* Header */}
                  <div className="sticky top-0 bg-white rounded-t-4xl px-6 pt-6 pb-4 border-b border-dark-100 z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Mountain className="w-4 h-4 text-primary-600" />
                          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Book Your Trek</span>
                        </div>
                        <h2 className="text-xl font-black text-dark-900 leading-snug">{trek?.name}</h2>
                        <p className="text-sm text-dark-500 mt-0.5">
                          Starting from <span className="font-bold text-dark-800">{formatPrice(trek?.price ?? 0)}</span> / person
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-9 h-9 rounded-xl bg-dark-100 flex items-center justify-center hover:bg-dark-200 transition-colors flex-shrink-0 mt-1"
                      >
                        <X className="w-4 h-4 text-dark-600" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    {/* Trek Date */}
                    <div>
                      <label className="block text-xs font-bold text-dark-700 mb-1.5">
                        Preferred Month <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                          <select
                            value={form.month}
                            onChange={(e) => set('month', e.target.value)}
                            className={`w-full pl-9 pr-3 py-3 rounded-xl border text-sm font-medium text-dark-800 appearance-none
                                        focus:outline-none focus:ring-2 transition-all duration-200
                                        ${errors.month ? 'border-red-300 focus:ring-red-200' : 'border-dark-200 focus:ring-primary-200 focus:border-primary-400'}`}
                          >
                            <option value="">Month</option>
                            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <select
                            value={form.year}
                            onChange={(e) => set('year', e.target.value)}
                            className="w-full px-3 py-3 rounded-xl border border-dark-200 text-sm font-medium text-dark-800 appearance-none
                                       focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
                          >
                            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
                        </div>
                      </div>
                      {errors.month && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errors.month}</p>}
                    </div>

                    {/* Group Size */}
                    <div>
                      <label className="block text-xs font-bold text-dark-700 mb-1.5">
                        Group Size
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Adults', key: 'adults', min: 1 },
                          { label: 'Children (under 12)', key: 'children', min: 0 },
                        ].map(({ label, key, min }) => (
                          <div key={key} className="bg-surface rounded-xl p-3 border border-dark-100">
                            <p className="text-xs text-dark-500 font-medium mb-2">{label}</p>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => form[key] > min && set(key, form[key] - 1)}
                                className="w-7 h-7 rounded-lg bg-dark-200 flex items-center justify-center text-dark-700
                                           hover:bg-dark-300 transition-colors disabled:opacity-40"
                                disabled={form[key] <= min}
                              >
                                <span className="font-bold text-sm leading-none">−</span>
                              </button>
                              <span className="text-lg font-black text-dark-900 w-5 text-center tabular-nums">
                                {form[key]}
                              </span>
                              <button
                                type="button"
                                onClick={() => set(key, form[key] + 1)}
                                className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700
                                           hover:bg-primary-200 transition-colors"
                              >
                                <span className="font-bold text-sm leading-none">+</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-dark-100" />

                    {/* Personal Info */}
                    <InputField id="book-name" label="Full Name" value={form.name} onChange={(v) => set('name', v)} placeholder="John Doe" error={errors.name} required />
                    <InputField id="book-email" label="Email Address" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="john@example.com" error={errors.email} required />
                    <InputField id="book-phone" label="Phone Number" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="+91 98765 43210" error={errors.phone} required />

                    {/* Special Requests */}
                    <div>
                      <label htmlFor="book-requests" className="block text-xs font-bold text-dark-700 mb-1.5">
                        Special Requests <span className="text-dark-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="book-requests"
                        rows={3}
                        value={form.requests}
                        onChange={(e) => set('requests', e.target.value)}
                        placeholder="Dietary needs, medical info, equipment requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-dark-200 text-sm font-medium text-dark-800
                                   placeholder:text-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400
                                   resize-none transition-all duration-200"
                      />
                    </div>

                    {/* Price estimate */}
                    <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-dark-600 font-medium">
                          {formatPrice(trek?.price ?? 0)} × {form.adults} adult{form.adults > 1 ? 's' : ''}
                        </span>
                        <span className="font-bold text-dark-800">{formatPrice(estimatedTotal)}</span>
                      </div>
                      {form.children > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-dark-600 font-medium">
                            Children ({form.children}) — discount applied
                          </span>
                          <span className="font-bold text-dark-800 text-green-600">Contact Us</span>
                        </div>
                      )}
                      <div className="h-px bg-primary-200 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-dark-800 text-sm">Estimated Total</span>
                        <span className="font-black text-lg text-primary-700">{formatPrice(estimatedTotal)}</span>
                      </div>
                      <p className="text-xs text-dark-400 mt-1.5">Exact quote after confirmation call. No payment now.</p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-primary-600 text-white font-black text-base
                                 hover:bg-primary-700 transition-all duration-200 hover:scale-[1.02] active:scale-98
                                 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>📅 Request Booking</>
                      )}
                    </button>

                    <p className="text-center text-xs text-dark-400">
                      🔒 No payment required now. Our team will call within 24 hours to confirm.
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="p-8 flex flex-col items-center text-center gap-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-black text-dark-900 mb-2">Booking Request Sent! 🎉</h3>
                    <p className="text-dark-500 text-sm leading-relaxed max-w-sm">
                      Thanks <strong>{form.name}</strong>! We've received your request for{' '}
                      <strong>{trek?.name}</strong> in{' '}
                      <strong>{form.month} {form.year}</strong> for{' '}
                      <strong>{totalPax} person{totalPax > 1 ? 's' : ''}</strong>.
                    </p>
                  </div>
                  <div className="bg-surface rounded-2xl p-4 w-full flex flex-col gap-3 border border-dark-100">
                    <p className="text-xs font-bold text-dark-500 uppercase tracking-wider">What's Next</p>
                    {[
                      { icon: Phone, text: 'Our trek expert calls you within 24 hours' },
                      { icon: Mail, text: `Confirmation sent to ${form.email}` },
                      { icon: Calendar, text: 'Trek dates and itinerary shared on call' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm text-dark-600">
                        <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-primary-600" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
                  >
                    Close & Explore More Treks
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
