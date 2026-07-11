import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { destinations } from '../../data/treks';

export default function PopularDestinations() {
  return (
    <section className="section-py bg-white">
      <div className="section-container">
        <SectionHeader
          label="Destinations"
          title="Popular Trek"
          titleHighlight="Base Camps"
          subtitle="Every great Himalayan adventure starts from these iconic gateway villages."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden h-72 cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-900/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-xs font-semibold">{dest.state}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-1">{dest.name}</h3>
                <p className="text-white/65 text-xs leading-snug mb-3">{dest.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1">
                    <Compass className="w-3 h-3 text-white/80" />
                    <span className="text-white/80 text-xs font-medium">
                      {dest.trekkCount} treks
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
