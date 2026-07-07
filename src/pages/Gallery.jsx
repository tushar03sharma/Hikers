import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Mountain, Camera } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/gallery';

/* ─── Lightbox ──────────────────────────────────────────────── */
const Lightbox = ({ images, index, onClose }) => {
  const [current, setCurrent] = useState(index);
  const img = images[current];

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Keyboard nav
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={handleKey}
      tabIndex={-1}
      className="fixed inset-0 bg-dark-950/96 z-100 flex flex-col outline-none"
      onClick={onClose}
      autoFocus
    >
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <p className="text-white font-bold text-sm">{img.caption}</p>
          <p className="text-white/50 text-xs mt-0.5">{img.trek}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-sm">{current + 1} / {images.length}</span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.2 }}
            src={img.url}
            alt={img.caption}
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 p-4 justify-center overflow-x-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setCurrent(i)}
            className={`w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200
              ${i === current ? 'ring-2 ring-primary-400 opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}
          >
            <img src={img.thumb} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Gallery Card ──────────────────────────────────────────── */
const GalleryCard = ({ img, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.93 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    onClick={onClick}
    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-dark-100"
    style={{ gridRow: img.height === 2 ? 'span 2' : 'span 1' }}
  >
    <img
      src={img.thumb}
      alt={img.caption}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      style={{ minHeight: '180px' }}
    />

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/45 transition-all duration-300 flex flex-col justify-between p-3">
      {/* Category pill */}
      <div className="translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 self-start">
        <span className="glass rounded-full px-2.5 py-1 text-white text-2xs font-bold">
          {img.category}
        </span>
      </div>

      {/* Bottom caption */}
      <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
        <p className="text-white text-xs font-bold leading-snug">{img.caption}</p>
        <p className="text-white/60 text-2xs mt-0.5">{img.trek}</p>
      </div>
    </div>

    {/* Zoom icon */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                    bg-white/20 backdrop-blur-sm flex items-center justify-center
                    opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300">
      <ZoomIn className="w-5 h-5 text-white" />
    </div>
  </motion.div>
);

/* ─── Main Gallery Page ─────────────────────────────────────── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-primary-950 via-dark-900 to-secondary-900 pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />

        <div className="section-container relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4" /> Photography
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Trek Gallery
            </h1>
            <p className="text-white/65 text-lg mb-8 max-w-xl">
              Raw, unfiltered Himalayan beauty — captured by our trekkers and guides on trail.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Camera, value: '200+', label: 'Photos' },
                { icon: Mountain, value: '14', label: 'Trek Routes' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2 glass rounded-2xl px-4 py-2">
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-white font-black text-sm">{value}</span>
                  <span className="text-white/60 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filter Bar ────────────────────────────────────── */}
      <div className="bg-white border-b border-dark-100 shadow-sm sticky top-16 z-30">
        <div className="section-container py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm scale-105'
                    : 'text-dark-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="ml-2 text-white/80 text-xs">
                    ({activeCategory === 'All' ? galleryImages.length : galleryImages.filter(i => i.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery Grid ──────────────────────────────────── */}
      <div className="section-container py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]"
          >
            {filtered.length > 0 ? (
              filtered.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  img={img}
                  index={i}
                  onClick={() => setLightboxIndex(i)}
                />
              ))
            ) : (
              <div className="col-span-3 py-24 text-center">
                <p className="text-5xl mb-4">📸</p>
                <p className="text-dark-400 font-medium">No photos in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Result count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-dark-400 mt-8 font-medium"
        >
          Showing <span className="font-bold text-dark-700">{filtered.length}</span> photo{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </motion.p>
      </div>

      {/* ── Submit your photo CTA ─────────────────────────── */}
      <section className="section-py bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-4xl p-10 md:p-14 text-center border border-primary-100 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-200/30 blur-2xl" />
            <span className="text-5xl mb-5 block">📷</span>
            <h2 className="text-3xl font-black text-dark-900 mb-3">Share Your Trek Moments</h2>
            <p className="text-dark-500 text-lg mb-6 max-w-md mx-auto">
              Trekked with us? Share your photos and get featured in our gallery!
            </p>
            <a
              href="mailto:gallery@summitseek.in?subject=Trek Photo Submission"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-primary-600 text-white font-bold
                         hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Camera className="w-5 h-5" /> Submit Your Photos
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
