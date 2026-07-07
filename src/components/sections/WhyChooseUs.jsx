import { motion } from 'framer-motion';
import {
  Shield, Users, Award, Compass, HeartHandshake,
  Leaf, Clock, Star
} from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const features = [
  {
    icon: Shield,
    title: 'Certified & Trained Guides',
    description:
      'All our trek leaders are certified by the Indian Mountaineering Foundation and carry Wilderness First Aid training.',
    color: 'bg-blue-50 text-primary-600',
    delay: 0,
  },
  {
    icon: Users,
    title: 'Small Group Experience',
    description:
      'We cap groups at 6–12 trekkers to ensure personalised attention, trail safety, and a more intimate Himalayan experience.',
    color: 'bg-teal-50 text-secondary-600',
    delay: 0.1,
  },
  {
    icon: Award,
    title: '10+ Years of Excellence',
    description:
      'Since 2014, we\'ve led over 5,000 trekkers safely across 14+ Himalayan routes with a 99% summit success rate.',
    color: 'bg-amber-50 text-accent',
    delay: 0.2,
  },
  {
    icon: HeartHandshake,
    title: 'All-Inclusive Packages',
    description:
      'Meals, camping gear, permits, safety equipment — everything is taken care of so you just focus on the adventure.',
    color: 'bg-rose-50 text-rose-500',
    delay: 0.3,
  },
  {
    icon: Leaf,
    title: 'Eco-Responsible Trekking',
    description:
      'We follow Leave No Trace principles, pay fair wages to local porters, and contribute to Himalayan conservation.',
    color: 'bg-green-50 text-green-600',
    delay: 0.4,
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Our team is available round the clock — before, during, and after your trek — for any queries or emergencies.',
    color: 'bg-purple-50 text-purple-600',
    delay: 0.5,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-50 blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary-50 blur-3xl opacity-60 pointer-events-none" />

      <div className="section-container relative">
        <SectionHeader
          label="Why SummitSeek"
          title="Adventure Done"
          titleHighlight="Right"
          subtitle="We don't just guide treks — we craft memories. Here's what makes every SummitSeek expedition extraordinary."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-surface rounded-3xl p-7 border border-dark-100/60
                         hover:shadow-card-hover hover:border-transparent transition-all duration-300 cursor-default"
            >
              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-5 ${color} w-14 h-14`}>
                <Icon className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-bold text-dark-900 mb-2 leading-snug">{title}</h3>
              <p className="text-sm text-dark-500 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
