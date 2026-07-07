import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import TrekCard from '../ui/TrekCard';
import { treks } from '../../data/treks';

const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Moderate-Hard', 'Hard'];

export default function FeaturedTreks() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? treks
      : treks.filter((t) => t.difficulty === activeFilter);

  return (
    <section id="featured-treks" className="section-py bg-surface relative">
      <div className="section-container">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <SectionHeader
            label="Our Treks"
            title="Find Your"
            titleHighlight="Adventure"
            subtitle="14+ carefully crafted routes across Uttarakhand and Himachal Pradesh."
            align="left"
          />
          <Link
            to="/treks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600
                       hover:text-primary-700 transition-colors flex-shrink-0 group"
          >
            View All Treks
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <SlidersHorizontal className="w-4 h-4 text-dark-400 mr-1" />
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setActiveFilter(d)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === d
                  ? 'bg-primary-600 text-white shadow-md scale-105'
                  : 'bg-white text-dark-600 hover:bg-primary-50 hover:text-primary-600 border border-dark-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((trek, i) => (
              <TrekCard key={trek.id} trek={trek} index={i} />
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-dark-400 text-lg font-medium">
                No treks match this filter. Try another difficulty.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            to="/treks"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary-600 text-white font-bold
                       hover:bg-primary-700 shadow-md hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
          >
            Explore All 14+ Treks <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
