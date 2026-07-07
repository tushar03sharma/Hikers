import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, TrendingUp, Star, Users, ArrowRight, Heart } from 'lucide-react';
import { cn, formatPrice, getDifficultyColor, formatDuration } from '../../utils/cn';
import { useState } from 'react';

export default function TrekCard({ trek, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const discount = Math.round(((trek.originalPrice - trek.price) / trek.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl shadow-card hover:shadow-card-hover
                 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-dark-100 flex-shrink-0">
        {/* Skeleton shimmer while loading */}
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}

        <img
          src={trek.image}
          alt={trek.name}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-500',
            'group-hover:scale-110',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {trek.badge && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-accent text-dark-900 shadow-sm">
              {trek.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-9 h-9 rounded-xl glass flex items-center justify-center
                     transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn('w-4 h-4 transition-colors', wishlisted ? 'text-red-500 fill-red-500' : 'text-white')}
          />
        </button>

        {/* Bottom: rating pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <span className="text-white text-xs font-bold">{trek.rating}</span>
          <span className="text-white/70 text-xs">({trek.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Title & region */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-secondary-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-secondary-600">{trek.region}</span>
          </div>
          <h3 className="text-lg font-bold text-dark-900 leading-snug group-hover:text-primary-600 transition-colors duration-200">
            {trek.name}
          </h3>
          <p className="text-sm text-dark-400 mt-0.5 leading-snug">{trek.tagline}</p>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-xs text-dark-500 font-medium">{formatDuration(trek.duration)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-dark-400" />
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', getDifficultyColor(trek.difficulty))}>
              {trek.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-dark-400" />
            <span className="text-xs text-dark-500 font-medium">{trek.groupSize}</span>
          </div>
        </div>

        {/* Altitude & Season */}
        <div className="flex gap-2">
          <div className="flex-1 bg-surface rounded-xl px-3 py-2">
            <p className="text-2xs text-dark-400 font-medium uppercase tracking-wider">Max Altitude</p>
            <p className="text-sm font-bold text-dark-700 mt-0.5">{trek.maxAltitude.toLocaleString()} ft</p>
          </div>
          <div className="flex-1 bg-surface rounded-xl px-3 py-2">
            <p className="text-2xs text-dark-400 font-medium uppercase tracking-wider">Best Season</p>
            <p className="text-sm font-bold text-dark-700 mt-0.5">{trek.bestSeason}</p>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dark-100">
          <div>
            <p className="text-2xs text-dark-400 font-medium">Starting from</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-dark-900">{formatPrice(trek.price)}</span>
              <span className="text-sm text-dark-400 line-through">{formatPrice(trek.originalPrice)}</span>
            </div>
            <p className="text-2xs text-dark-400">per person</p>
          </div>
          <Link
            to={`/treks/${trek.slug}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold
                       hover:bg-primary-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
