import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { categories } from '../../data/treks';

export default function AdventureCategories() {
  return (
    <section className="section-py bg-surface">
      <div className="section-container">
        <SectionHeader
          label="Categories"
          title="Every Kind of"
          titleHighlight="Adventure"
          subtitle="From snow-laden winter trails to blooming summer meadows — find the trek that calls to you."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden h-48 shadow-card hover:shadow-card-hover cursor-pointer"
            >
              {/* Background */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Dark overlay + gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-75`} />
              <div className="absolute inset-0 bg-dark-900/30" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="glass rounded-full px-3 py-1 text-white text-xs font-bold">
                    {cat.count} Treks
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">{cat.name}</h3>
                  <p className="text-white/70 text-xs leading-snug">{cat.description}</p>
                </div>
              </div>

              {/* Hover overlay with CTA */}
              <div className="absolute inset-0 bg-dark-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  to="/treks"
                  className="flex items-center gap-2 glass-light text-primary-700 font-bold text-sm px-5 py-2.5 rounded-xl
                             transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
