import { motion } from 'framer-motion';
import { Users, Mountain, Award, Shield } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

const icons = { Users, Mountain, Award, Shield };

const StatItem = ({ stat }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(stat.value, 2200, inView);
  const Icon = icons[stat.icon] ?? Shield;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Icon ring */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4
                   group-hover:bg-white/20 transition-colors duration-300"
      >
        <Icon className="w-8 h-8 text-white" strokeWidth={1.7} />
      </motion.div>

      {/* Counter */}
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-black text-white tabular-nums leading-none">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl font-black text-accent">{stat.suffix}</span>
      </div>

      <p className="text-white/65 text-sm font-medium mt-2">{stat.label}</p>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="h-0.5 w-10 bg-accent rounded-full mt-3 origin-left"
      />
    </motion.div>
  );
};

export default function Statistics() {
  const statsData = [
    { id: 1, value: 5000, suffix: '+', label: 'Happy Trekkers', icon: 'Users' },
    { id: 2, value: 14, suffix: '+', label: 'Trek Routes', icon: 'Mountain' },
    { id: 3, value: 10, suffix: '+', label: 'Years of Excellence', icon: 'Award' },
    { id: 4, value: 99, suffix: '%', label: 'Summit Success Rate', icon: 'Shield' },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-secondary-600">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none"
      />

      <div className="section-container relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-white/70 text-sm font-bold uppercase tracking-widest mb-12"
        >
          Numbers that speak for themselves
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {statsData.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
