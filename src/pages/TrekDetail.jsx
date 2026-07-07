import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  MapPin, Clock, TrendingUp, Star, Users, Mountain,
  ArrowLeft, ArrowRight, Check, X, ChevronDown,
  Calendar, Phone, MessageCircle, Share2, Heart,
  Shield, Award, ChevronRight, ZoomIn
} from 'lucide-react';

import { treks } from '../data/treks';
import { reviews } from '../data/reviews';
import { cn, formatPrice, getDifficultyColor, formatDuration } from '../utils/cn';
import BookingModal from '../components/ui/BookingModal';
import TrekCard from '../components/ui/TrekCard';

/* ─── Tab definitions ───────────────────────────────────────── */
const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'itinerary',  label: 'Itinerary' },
  { id: 'includes',   label: "What's Included" },
  { id: 'gallery',    label: 'Gallery' },
  { id: 'reviews',    label: 'Reviews' },
];

/* ─── Itinerary day card ────────────────────────────────────── */
const ItineraryDay = ({ day, isLast }) => {
  const [open, setOpen] = useState(day.day === 1);
  return (
    <div className="flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-sm z-10
          ${open ? 'bg-primary-600 text-white' : 'bg-white border-2 border-dark-200 text-dark-600'}`}>
          {day.day}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-dark-200 mt-1 mb-0 min-h-[2rem]" />}
      </div>

      {/* Content */}
      <div className={`flex-1 mb-4 rounded-2xl border transition-all duration-300 overflow-hidden
        ${open ? 'border-primary-200 bg-primary-50/50 shadow-sm' : 'border-dark-100 bg-white'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-3 p-4 text-left"
        >
          <div className="flex-1">
            <p className="text-xs font-bold text-primary-600 mb-0.5">Day {day.day}</p>
            <h4 className="font-bold text-dark-900 text-sm leading-snug">{day.title}</h4>
            {!open && <p className="text-xs text-dark-400 mt-0.5">{day.distance}</p>}
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className={`w-4 h-4 ${open ? 'text-primary-600' : 'text-dark-400'}`} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-primary-200 text-primary-700">
                    📍 {day.distance}
                  </span>
                </div>
                <p className="text-sm text-dark-600 leading-relaxed">{day.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── Star rating display ───────────────────────────────────── */
const Stars = ({ rating, size = 'sm' }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5',
          i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-dark-200 fill-dark-200'
        )}
      />
    ))}
  </div>
);

/* ─── Review Card ───────────────────────────────────────────── */
const ReviewCard = ({ review }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl border border-dark-100 p-5 flex flex-col gap-3 shadow-sm hover:shadow-card transition-shadow"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100" />
        <div>
          <p className="font-bold text-dark-900 text-sm leading-none">{review.name}</p>
          <p className="text-dark-400 text-xs mt-0.5">{review.location}</p>
        </div>
      </div>
      <div className="text-right">
        <Stars rating={review.rating} />
        <p className="text-xs text-dark-400 mt-1">{review.date}</p>
      </div>
    </div>
    <p className="text-sm text-dark-600 leading-relaxed italic">"{review.review}"</p>
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-amber-700 text-xs font-semibold w-fit">
      ✨ {review.highlight}
    </div>
  </motion.div>
);

/* ─── Sticky Sidebar ────────────────────────────────────────── */
const BookingSidebar = ({ trek, onBook }) => {
  const discount = Math.round(((trek.originalPrice - trek.price) / trek.originalPrice) * 100);
  return (
    <div className="bg-white rounded-3xl shadow-card-hover border border-dark-100 overflow-hidden sticky top-24">
      {/* Price header */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-5 text-white">
        <p className="text-white/70 text-xs font-medium mb-1">Starting from</p>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black">{formatPrice(trek.price)}</span>
          <span className="text-white/60 line-through text-lg">{formatPrice(trek.originalPrice)}</span>
        </div>
        <p className="text-white/70 text-xs mt-1">per person · all inclusive</p>
        {discount > 0 && (
          <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
            🎉 Save {discount}%
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Duration', value: formatDuration(trek.duration), icon: Clock },
            { label: 'Difficulty', value: trek.difficulty, icon: TrendingUp },
            { label: 'Max Altitude', value: `${trek.maxAltitude.toLocaleString()} ft`, icon: Mountain },
            { label: 'Group Size', value: trek.groupSize, icon: Users },
            { label: 'Best Season', value: trek.bestSeason, icon: Calendar },
            { label: 'Region', value: trek.region, icon: MapPin },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-surface rounded-xl p-2.5">
              <div className="flex items-center gap-1 mb-0.5">
                <Icon className="w-3 h-3 text-primary-500" />
                <p className="text-2xs text-dark-400 font-medium uppercase tracking-wider">{label}</p>
              </div>
              <p className="text-xs font-bold text-dark-800 leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBook}
          className="w-full py-4 rounded-2xl bg-primary-600 text-white font-black text-base
                     hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" /> Book This Trek
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:+918279888470"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary-200
                       text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
          <a
            href="https://wa.me/918279888470"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 border-2 border-green-200
                       text-green-700 font-semibold text-sm hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col gap-2 pt-2 border-t border-dark-100">
          {[
            { icon: Shield, text: 'No Payment Now — Book Free' },
            { icon: Award, text: 'IMF Certified Trek Leaders' },
            { icon: Star, text: '4.9★ Rated by 5,000+ Trekkers' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-xs text-dark-500 font-medium">
              <Icon className="w-4 h-4 text-primary-500 flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Main TrekDetail Page ──────────────────────────────────── */
export default function TrekDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const trek = treks.find((t) => t.slug === slug);

  const [activeTab, setActiveTab] = useState('overview');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const tabsRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  // Related treks (same region, exclude current)
  const relatedTreks = treks.filter((t) => t.region === trek?.region && t.id !== trek?.id).slice(0, 3);

  // All gallery images (trek-specific + extras from data)
  const galleryImgs = trek
    ? [trek.image, ...(trek.gallery ?? [])].filter(Boolean)
    : [];

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-20">
        <div className="text-center px-4">
          <div className="text-7xl mb-4">🏔️</div>
          <h1 className="text-3xl font-black text-dark-900 mb-3">Trek Not Found</h1>
          <p className="text-dark-500 mb-6">The trail "{slug?.replace(/-/g,' ')}" doesn't exist in our collection.</p>
          <button
            onClick={() => navigate('/treks')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> View All Treks
          </button>
        </div>
      </div>
    );
  }

  const scrollToTabs = () => {
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <img
            src={trek.image}
            alt={trek.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-dark-900/40 to-dark-950/85" />
        </motion.div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end section-container pb-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-28 left-4 sm:left-8 right-4 flex items-center gap-2 text-sm font-medium"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link to="/treks" className="text-white/60 hover:text-white transition-colors">Treks</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/90 truncate max-w-[200px]">{trek.name}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {trek.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-accent text-dark-900 shadow-sm">
                  {trek.badge}
                </span>
              )}
              <span className={cn('px-3 py-1 rounded-full text-xs font-black', getDifficultyColor(trek.difficulty))}>
                {trek.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold glass text-white">
                {trek.region}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl">
              {trek.name}
            </h1>

            <p className="text-white/75 text-lg font-medium">{trek.tagline}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-1.5">
                <Stars rating={trek.rating} />
                <span className="text-white font-bold text-sm">{trek.rating}</span>
                <span className="text-white/60 text-sm">({trek.reviewCount} reviews)</span>
              </div>
              {[
                { icon: Clock, text: formatDuration(trek.duration) },
                { icon: Mountain, text: `${trek.maxAltitude.toLocaleString()} ft` },
                { icon: Users, text: trek.groupSize + ' pax' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-white text-xs font-semibold">{text}</span>
                </div>
              ))}
            </div>

            {/* Hero Actions */}
            <div className="flex gap-3 pt-1 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary-600 text-white font-bold
                           hover:bg-primary-500 shadow-lg transition-all duration-200"
              >
                <Calendar className="w-5 h-5" /> Book Now
              </motion.button>
              <button
                onClick={scrollToTabs}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl glass text-white font-bold
                           hover:bg-white/20 transition-all duration-200"
              >
                View Details <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={cn('w-5 h-5', wishlisted ? 'fill-red-400 text-red-400' : '')} />
              </button>
              <button
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Layout ──────────────────────────────────── */}
      <div className="section-container py-10">
        <div className="flex gap-8 items-start">

          {/* ── Left: Tabs ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Tab Bar */}
            <div
              ref={tabsRef}
              className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-card border border-dark-100 mb-8 overflow-x-auto scrollbar-hide"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-dark-500 hover:bg-dark-50 hover:text-dark-800'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* ── OVERVIEW ─────────────────────────── */}
                {activeTab === 'overview' && (
                  <div className="flex flex-col gap-8">
                    {/* Overview text */}
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-4">About This Trek</h2>
                      <p className="text-dark-600 leading-relaxed text-base">{trek.overview}</p>
                    </div>

                    {/* Highlights */}
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-5">Trek Highlights</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {trek.highlights.map((h, i) => (
                          <motion.div
                            key={h}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 border border-primary-100"
                          >
                            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-semibold text-dark-700">{h}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Quick facts */}
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-5">Quick Facts</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Duration', value: formatDuration(trek.duration), icon: Clock },
                          { label: 'Max Altitude', value: `${trek.maxAltitude.toLocaleString()} ft`, icon: Mountain },
                          { label: 'Difficulty', value: trek.difficulty, icon: TrendingUp },
                          { label: 'Group Size', value: trek.groupSize, icon: Users },
                          { label: 'Best Season', value: trek.bestSeason, icon: Calendar },
                          { label: 'Region', value: trek.region, icon: MapPin },
                        ].map(({ label, value, icon: Icon }) => (
                          <div key={label} className="bg-surface rounded-2xl p-4 border border-dark-100">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-lg bg-primary-100 flex items-center justify-center">
                                <Icon className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              <p className="text-xs font-bold text-dark-400 uppercase tracking-wider">{label}</p>
                            </div>
                            <p className="font-bold text-dark-900 text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ITINERARY ─────────────────────────── */}
                {activeTab === 'itinerary' && (
                  <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-black text-dark-900">Day-by-Day Itinerary</h2>
                      <span className="text-sm text-dark-400 font-medium">{trek.duration + 1} days</span>
                    </div>

                    {trek.itinerary.length > 0 ? (
                      <div>
                        {trek.itinerary.map((day, i) => (
                          <ItineraryDay
                            key={day.day}
                            day={day}
                            isLast={i === trek.itinerary.length - 1}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-surface rounded-2xl border border-dark-100">
                        <p className="text-4xl mb-3">📋</p>
                        <h3 className="font-bold text-dark-800 mb-2">Detailed Itinerary Available on Request</h3>
                        <p className="text-dark-500 text-sm mb-4">Our expert will share the complete day-by-day plan on your consultation call.</p>
                        <button
                          onClick={() => setBookingOpen(true)}
                          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
                        >
                          Request Detailed Itinerary
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── INCLUDES ─────────────────────────── */}
                {activeTab === 'includes' && (
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-5 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                        </span>
                        Included
                      </h2>
                      <ul className="flex flex-col gap-3">
                        {trek.included.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-dark-700">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-5 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                          <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                        </span>
                        Not Included
                      </h2>
                      <ul className="flex flex-col gap-3">
                        {trek.excluded.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-dark-700">
                            <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                              <X className="w-3 h-3 text-red-400" strokeWidth={2.5} />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gear recommendation */}
                    <div className="sm:col-span-2 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-6 border border-primary-100">
                      <h3 className="font-black text-dark-900 mb-3">🎒 What to Pack</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Trekking Shoes (broken-in)', 'Warm Fleece Jacket', 'Down Jacket', 'Waterproof Shell', 'Trekking Poles', 'Sunscreen SPF 50+', 'Sunglasses', 'Personal Medicines', '30–40L Backpack'].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-dark-700 font-medium">
                            <span className="w-4 h-4 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center text-2xs font-black">✓</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GALLERY ──────────────────────────── */}
                {activeTab === 'gallery' && (
                  <div className="flex flex-col gap-5">
                    <div className="bg-white rounded-3xl p-6 shadow-card border border-dark-100">
                      <h2 className="text-xl font-black text-dark-900 mb-5">Trek Gallery</h2>

                      {galleryImgs.length > 0 ? (
                        <>
                          {/* Main swiper */}
                          <Swiper
                            modules={[Navigation, SwiperPagination, Thumbs]}
                            navigation
                            pagination={{ clickable: true }}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            className="rounded-2xl overflow-hidden mb-3"
                            style={{ height: '380px' }}
                          >
                            {galleryImgs.map((src, i) => (
                              <SwiperSlide key={i}>
                                <div className="relative w-full h-full group cursor-pointer" onClick={() => setLightboxImg(src)}>
                                  <img src={src} alt={`${trek.name} gallery ${i + 1}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/20 transition-colors flex items-center justify-center">
                                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          {/* Thumbnails */}
                          <Swiper
                            modules={[Thumbs]}
                            watchSlidesProgress
                            onSwiper={setThumbsSwiper}
                            spaceBetween={8}
                            slidesPerView={Math.min(galleryImgs.length, 4)}
                            className="rounded-xl"
                            style={{ height: '72px' }}
                          >
                            {galleryImgs.map((src, i) => (
                              <SwiperSlide key={i} className="cursor-pointer rounded-xl overflow-hidden opacity-60 transition-opacity [&.swiper-slide-thumb-active]:opacity-100">
                                <img src={src} alt="" className="w-full h-full object-cover" />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </>
                      ) : (
                        <div className="h-64 rounded-2xl bg-surface flex items-center justify-center border border-dark-100">
                          <div className="text-center">
                            <p className="text-4xl mb-2">📸</p>
                            <p className="text-dark-500 font-medium text-sm">Gallery coming soon</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── REVIEWS ──────────────────────────── */}
                {activeTab === 'reviews' && (
                  <div className="flex flex-col gap-5">
                    {/* Rating summary */}
                    <div className="bg-white rounded-3xl p-7 shadow-card border border-dark-100">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="text-center">
                          <p className="text-6xl font-black text-dark-900">{trek.rating}</p>
                          <Stars rating={trek.rating} size="lg" />
                          <p className="text-dark-400 text-sm mt-1">{trek.reviewCount} reviews</p>
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-1.5">
                          {[5,4,3,2,1].map((star) => {
                            const pct = star === 5 ? 78 : star === 4 ? 17 : star === 3 ? 4 : star === 2 ? 1 : 0;
                            return (
                              <div key={star} className="flex items-center gap-3">
                                <span className="text-xs text-dark-500 font-medium w-3">{star}</span>
                                <Star className="w-3.5 h-3.5 text-accent fill-accent flex-shrink-0" />
                                <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, delay: (5 - star) * 0.1 }}
                                    className="h-full bg-accent rounded-full"
                                  />
                                </div>
                                <span className="text-xs text-dark-400 font-medium w-8 text-right">{pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Review cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Sticky Sidebar ─────────────────── */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <BookingSidebar trek={trek} onBook={() => setBookingOpen(true)} />
          </aside>
        </div>
      </div>

      {/* ── Mobile Bottom CTA ────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-dark-100 p-4 z-50 flex items-center gap-3 shadow-glass">
        <div className="flex-1">
          <p className="text-xs text-dark-400 font-medium">Starting from</p>
          <p className="text-xl font-black text-dark-900">{formatPrice(trek.price)}</p>
        </div>
        <button
          onClick={() => setBookingOpen(true)}
          className="flex-1 py-3.5 rounded-2xl bg-primary-600 text-white font-bold text-sm
                     hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" /> Book This Trek
        </button>
      </div>

      {/* ── Related Treks ────────────────────────────────── */}
      {relatedTreks.length > 0 && (
        <section className="section-container pb-16 lg:pb-10">
          <div className="h-px bg-dark-100 mb-10" />
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl font-black text-dark-900">More Treks in {trek.region}</h2>
            <Link to="/treks" className="text-sm font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedTreks.map((t, i) => <TrekCard key={t.id} trek={t} index={i} />)}
          </div>
        </section>
      )}

      {/* ── Booking Modal ────────────────────────────────── */}
      <BookingModal trek={trek} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── Gallery Lightbox ─────────────────────────────── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/95 z-100 flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={lightboxImg}
              alt="Gallery"
              className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-dark-800 flex items-center justify-center text-white hover:bg-dark-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
