import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Star, Shield,
  Users, Mountain, MapPin, Calendar
} from 'lucide-react';

/* ── Animation Variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Floating Stat Badge ────────────────────────────────── */
const StatBadge = ({ icon: Icon, value, label, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-glass ${className}`}
  >
    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-white font-bold text-lg leading-none">{value}</p>
      <p className="text-white/70 text-xs mt-0.5">{label}</p>
    </div>
  </motion.div>
);

/* ── Scroll Indicator ───────────────────────────────────── */
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 0.8 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
  >
    <p className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</p>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center"
    >
      <ChevronDown className="w-4 h-4 text-white/60" />
    </motion.div>
  </motion.div>
);

/* ── Trek Feature Pill ──────────────────────────────────── */
const FeaturePill = ({ icon: Icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-2 glass rounded-full px-3 py-1.5"
  >
    <Icon className="w-3.5 h-3.5 text-accent" />
    <span className="text-white/90 text-xs font-medium">{text}</span>
  </motion.div>
);

/* ── Main Hero Section ──────────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef(null);

  // Parallax: background moves at 40% the scroll speed
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* ── Parallax Background ───────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-110 origin-center"
      >
        <img
          src="/hero-bg.jpg"
          alt="Himalayan mountain peaks at golden hour"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-900/50 to-dark-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/30" />
      </motion.div>

      {/* ── Animated Particles ───────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Main Content ─────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 section-container w-full pt-24 pb-20"
      >
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Feature Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              <FeaturePill icon={Shield} text="Expert Guides" delay={0.4} />
              <FeaturePill icon={Star} text="5-Star Rated" delay={0.5} />
              <FeaturePill icon={Users} text="Group Treks" delay={0.6} />
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Conquer the</span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-accent via-primary-300 to-secondary-300 bg-clip-text text-transparent">
                    Himalayas
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary-400 rounded-full origin-left"
                  />
                </span>
                <br />
                <span className="text-white">With Us</span>
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/75 max-w-xl leading-relaxed"
            >
              Premium guided treks through Uttarakhand & Himachal Pradesh.
              14+ hand-crafted routes, certified guides, and memories that last forever.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/treks"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-base
                           bg-primary-600 text-white shadow-lg hover:bg-primary-500
                           hover:shadow-glow-primary transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mountain className="w-5 h-5" />
                Explore Treks
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-base
                           border-2 border-white/40 text-white glass
                           hover:bg-white hover:text-primary-700 hover:border-white
                           transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                Plan My Trek
              </Link>
            </motion.div>

            {/* Quick info bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/15"
            >
              {[
                { icon: MapPin, text: 'Uttarakhand & HP' },
                { icon: Calendar, text: 'Oct – May Season' },
                { icon: Users, text: 'Small Groups (6–12)' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-white/70 text-sm font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Floating Stat Badges (Right Side) ──────── */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2">
          <StatBadge icon={Users} value="5,000+" label="Happy Trekkers" delay={1.0} />
          <StatBadge icon={Mountain} value="14+" label="Trek Routes" delay={1.2} />
          <StatBadge
            icon={Star}
            value="4.9 / 5"
            label="Average Rating"
            delay={1.4}
          />
          <StatBadge icon={Shield} value="10+ Yrs" label="Of Experience" delay={1.6} />
        </div>

        {/* ── Mobile Stats Row ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="lg:hidden grid grid-cols-2 xs:grid-cols-4 gap-3 mt-10"
        >
          {[
            { value: '5K+', label: 'Trekkers' },
            { value: '14+', label: 'Routes' },
            { value: '4.9★', label: 'Rating' },
            { value: '10+', label: 'Years' },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-3 text-center">
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/60 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ─────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bottom Gradient Fade ─────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent z-10" />
    </section>
  );
}
