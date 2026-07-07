import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, TrendingUp, Star, Users,
  ArrowRight, Heart, Mountain
} from 'lucide-react';
import { cn, formatPrice, getDifficultyColor, formatDuration } from '../../utils/cn';

export default function TrekListItem({ trek, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const discount = Math.round(((trek.originalPrice - trek.price) / trek.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col sm:flex-row"
    >
      {/* Image */}
      <div className="relative w-full sm:w-64 h-52 sm:h-auto flex-shrink-0 overflow-hidden bg-dark-100">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={trek.image}
          alt={trek.name}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-dark-900/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {trek.badge && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-accent text-dark-900 w-fit shadow-sm">
              {trek.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white w-fit shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-xl glass flex items-center justify-center
                     hover:scale-110 active:scale-95 transition-transform"
          aria-label="Wishlist"
        >
          <Heart className={cn('w-4 h-4', wishlisted ? 'text-red-400 fill-red-400' : 'text-white')} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-secondary-600" />
              <span className="text-xs font-semibold text-secondary-600">{trek.region}</span>
            </div>
            <h3 className="text-xl font-bold text-dark-900 leading-snug group-hover:text-primary-600 transition-colors">
              {trek.name}
            </h3>
            <p className="text-sm text-dark-400 mt-0.5 leading-snug">{trek.tagline}</p>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 bg-amber-50 rounded-xl px-3 py-1.5 flex-shrink-0 border border-amber-100">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="text-sm font-bold text-dark-800">{trek.rating}</span>
            <span className="text-xs text-dark-400">({trek.reviewCount})</span>
          </div>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl">
            <Clock className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-xs font-semibold text-dark-600">{formatDuration(trek.duration)}</span>
          </div>
          <div className={cn('px-3 py-1.5 rounded-xl text-xs font-bold', getDifficultyColor(trek.difficulty))}>
            {trek.difficulty}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl">
            <Mountain className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-xs font-semibold text-dark-600">{trek.maxAltitude.toLocaleString()} ft</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-xl">
            <Users className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-xs font-semibold text-dark-600">{trek.groupSize} pax</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5">
          {trek.highlights.slice(0, 3).map((h) => (
            <span key={h} className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">
              ✓ {h}
            </span>
          ))}
          {trek.highlights.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-dark-50 text-dark-500 text-xs font-medium">
              +{trek.highlights.length - 3} more
            </span>
          )}
        </div>

        {/* Bottom: Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dark-100 gap-4">
          <div>
            <p className="text-2xs text-dark-400">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-dark-900">{formatPrice(trek.price)}</span>
              <span className="text-sm text-dark-400 line-through">{formatPrice(trek.originalPrice)}</span>
            </div>
            <p className="text-2xs text-dark-400">per person · all inclusive</p>
          </div>
          <Link
            to={`/treks/${trek.slug}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary-600 text-white font-bold text-sm
                       hover:bg-primary-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex-shrink-0"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
