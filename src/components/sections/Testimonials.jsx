import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionHeader from '../ui/SectionHeader';
import { reviews } from '../../data/reviews';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-dark-200'}`}
      />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-3xl p-7 shadow-card flex flex-col gap-4 h-full border border-dark-100/60">
    {/* Quote icon */}
    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
      <Quote className="w-5 h-5 text-primary-500" />
    </div>

    {/* Rating + trek badge */}
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <StarRating rating={review.rating} />
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary-50 text-secondary-700 border border-secondary-100 flex-shrink-0">
        {review.trek}
      </span>
    </div>

    {/* Review text */}
    <p className="text-dark-600 text-sm leading-relaxed flex-1 italic">"{review.review}"</p>

    {/* Highlight pill */}
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-amber-700 text-xs font-semibold w-fit">
      ✨ {review.highlight}
    </div>

    {/* Reviewer info */}
    <div className="flex items-center gap-3 pt-3 border-t border-dark-100">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100"
      />
      <div>
        <p className="text-sm font-bold text-dark-800 leading-none">{review.name}</p>
        <p className="text-xs text-dark-400 mt-0.5">{review.location} · {review.date}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="section-py bg-gradient-to-br from-primary-950 via-dark-900 to-secondary-950 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-600/10 blur-3xl pointer-events-none" />

      <div className="section-container relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeader
            label="Testimonials"
            title="What Our"
            titleHighlight="Trekkers Say"
            subtitle="Real stories from real adventurers who conquered the Himalayas with us."
            align="left"
            dark
          />

          {/* Custom Nav Buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center
                         text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-xl bg-primary-600 flex items-center justify-center
                         text-white hover:bg-primary-500 transition-colors duration-200"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: '.swiper-pagination-testimonial' }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640:  { slidesPerView: 1.5 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination-testimonial flex justify-center gap-2 mt-2" />
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 glass rounded-3xl px-8 py-5"
        >
          <div className="flex -space-x-3">
            {reviews.slice(0, 4).map((r) => (
              <img
                key={r.id}
                src={r.avatar}
                alt={r.name}
                className="w-10 h-10 rounded-full ring-2 ring-dark-700 object-cover"
              />
            ))}
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">
              5,000+ Happy Adventurers
            </p>
            <p className="text-white/60 text-sm mt-1">Average rating: 4.9/5 across all treks</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
