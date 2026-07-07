import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Mountain, Shield, Leaf, Heart, Award, Users,
  Star, MapPin, ArrowRight, Quote, CheckCircle
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

/* ─── Data ──────────────────────────────────────────────────── */
const team = [
  {
    id: 1,
    name: 'Rajan Sharma',
    role: 'Founder & Lead Guide',
    bio: 'IMF-certified mountaineer with 15+ years guiding experience. Summited 6 Himalayan peaks above 6000m. Born and raised in Sankri.',
    avatar: 'https://i.pravatar.cc/200?img=12',
    treks: 500,
    certifications: ['IMF Certified', 'Wilderness First Aid', 'Avalanche Level 2'],
  },
  {
    id: 2,
    name: 'Priya Negi',
    role: 'Operations Manager',
    bio: 'Trek logistics expert with a decade of experience coordinating seamless high-altitude expeditions across Uttarakhand.',
    avatar: 'https://i.pravatar.cc/200?img=47',
    treks: 300,
    certifications: ['MBA Tourism', 'Emergency Response', 'Altitude Sickness Expert'],
  },
  {
    id: 3,
    name: 'Deepak Rawat',
    role: 'Senior Trek Leader',
    bio: 'Local Garhwali guide who knows every trail like the back of his hand. Expert naturalist with deep knowledge of Himalayan flora and fauna.',
    avatar: 'https://i.pravatar.cc/200?img=68',
    treks: 420,
    certifications: ['IMF Certified', 'Nature Interpreter', 'First Aid Expert'],
  },
  {
    id: 4,
    name: 'Ananya Bisht',
    role: 'Safety & Wellness Officer',
    bio: 'Sports medicine professional ensuring every trekker is acclimatised, healthy, and prepared. Your safety is her sole focus.',
    avatar: 'https://i.pravatar.cc/200?img=25',
    treks: 200,
    certifications: ['Sports Medicine', 'Wilderness EMT', 'Yoga Instructor'],
  },
];

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Every decision on trail starts with safety. Certified guides, emergency protocols, and regular health monitoring — always.',
    color: 'bg-blue-50 text-primary-600',
  },
  {
    icon: Leaf,
    title: 'Eco Responsibility',
    description: 'Leave No Trace trekking, fair porter wages, plastic-free camps, and active contribution to Himalayan conservation.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Heart,
    title: 'Trekker-First Approach',
    description: 'Small groups, personalised attention, and genuine care for every individual — you\'re never just a booking number.',
    color: 'bg-rose-50 text-rose-500',
  },
  {
    icon: Award,
    title: 'Excellence Always',
    description: 'From the quality of our gear to the freshness of our food — we maintain premium standards across every touchpoint.',
    color: 'bg-amber-50 text-accent',
  },
];

const milestones = [
  { year: '2014', title: 'Founded', description: 'Started with 2 guides and a single Kedarkantha batch of 8 trekkers from Sankri village.' },
  { year: '2016', title: 'Expanded Routes', description: 'Added 6 new trek routes including Buran Ghati and Har Ki Dun based on trekker demand.' },
  { year: '2018', title: '1,000 Trekkers', description: 'Crossed our 1,000th trekker milestone. Expanded team to 12 certified guides.' },
  { year: '2020', title: 'Safety Upgrade', description: 'Invested in satellite communicators, premium camping gear and emergency oxygen for all groups.' },
  { year: '2022', title: 'Eco Pledge', description: 'Launched our Zero Plastic on Trail initiative and partnered with Himalayan conservation NGOs.' },
  { year: '2024', title: '5,000+ Happy Trekkers', description: 'Reached 5,000+ trekkers across 14 routes. Rated 4.9/5 across all platforms. Still growing!' },
];

/* ─── Stat Counter ──────────────────────────────────────────── */
const StatCounter = ({ value, suffix, label }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-black text-primary-600">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-dark-500 font-medium text-sm mt-1">{label}</p>
    </div>
  );
};

/* ─── Team Card ─────────────────────────────────────────────── */
const TeamCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
  >
    {/* Photo */}
    <div className="relative h-56 overflow-hidden bg-dark-100">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
      <div className="absolute bottom-3 left-3">
        <div className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
          <Mountain className="w-3 h-3 text-white/80" />
          <span className="text-white text-xs font-bold">{member.treks}+ treks</span>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-black text-dark-900 text-lg leading-none">{member.name}</h3>
      <p className="text-primary-600 text-sm font-semibold mt-0.5 mb-3">{member.role}</p>
      <p className="text-dark-500 text-sm leading-relaxed mb-4">{member.bio}</p>

      {/* Certifications */}
      <div className="flex flex-wrap gap-1.5">
        {member.certifications.map((cert) => (
          <span key={cert} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-50 text-primary-700 text-2xs font-semibold">
            <CheckCircle className="w-2.5 h-2.5" /> {cert}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Main About Page ───────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <img src="/team-photo.jpg" alt="SummitSeek team on a Himalayan ridge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-900/40 to-dark-950/90" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end section-container pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-accent text-xs font-black uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-3">
              We Are<br />
              <span className="text-accent">SummitSeek</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl">
              Born in the Himalayas. Built on trust, safety, and an unshakeable love for the mountains.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <SectionHeader
                label="Our Story"
                title="From a Village Dream"
                titleHighlight="to 5,000+ Summits"
                align="left"
                className="mb-6"
              />
              <div className="flex flex-col gap-4 text-dark-600 text-base leading-relaxed">
                <p>
                  It started in 2014 when Rajan Sharma, a Sankri-born mountaineer, noticed that most trekkers who came to the Himalayas were at the mercy of disorganised, unsafe operators. He knew these mountains intimately — their moods, their dangers, their jaw-dropping beauty.
                </p>
                <p>
                  With two certified guides, a borrowed tent, and an unwavering commitment to safety, SummitSeek led its first Kedarkantha batch of 8 trekkers. Everyone summited. Everyone came back safe. And everyone left with memories of a lifetime.
                </p>
                <p>
                  A decade later, we've guided <strong className="text-dark-800">5,000+ trekkers</strong> across <strong className="text-dark-800">14 Himalayan routes</strong>, built a team of <strong className="text-dark-800">12 certified guides</strong>, and maintained a <strong className="text-dark-800">99% summit success rate</strong> — all while staying true to our founding promise: <em>safety, authenticity, and extraordinary experiences.</em>
                </p>
              </div>
              <Link
                to="/treks"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-2xl bg-primary-600 text-white font-bold
                           hover:bg-primary-700 transition-all duration-200 hover:scale-105"
              >
                Explore Our Treks <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right: Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { value: 5000, suffix: '+', label: 'Happy Trekkers', icon: Users, color: 'from-primary-500 to-primary-700' },
                { value: 14, suffix: '+', label: 'Trek Routes', icon: Mountain, color: 'from-secondary-500 to-teal-700' },
                { value: 10, suffix: '+', label: 'Years Experience', icon: Award, color: 'from-accent to-orange-500' },
                { value: 99, suffix: '%', label: 'Summit Success', icon: Star, color: 'from-rose-400 to-rose-600' },
              ].map(({ value, suffix, label, icon: Icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`rounded-3xl bg-gradient-to-br ${color} p-6 flex flex-col gap-3 text-white shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white/80" strokeWidth={1.8} />
                  <div>
                    <StatCounter value={value} suffix={suffix} label="" />
                    <p className="text-white/80 text-xs font-semibold mt-1">{label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────── */}
      <section className="section-py bg-surface">
        <div className="section-container">
          <SectionHeader
            label="Our Values"
            title="What We"
            titleHighlight="Stand For"
            subtitle="Four principles that guide every decision we make on and off the trail."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-dark-100"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-dark-900 text-base mb-2">{title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="section-container">
          <SectionHeader
            label="Our Journey"
            title="A Decade of"
            titleHighlight="Himalayan Adventures"
            subtitle="From a small village startup to India's trusted trekking brand."
            className="mb-14"
          />
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 hidden md:block -translate-x-1/2" />

            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="flex-1 bg-surface rounded-3xl border border-dark-100 p-6 shadow-sm hover:shadow-card transition-shadow">
                    <p className="text-xs font-black text-primary-600 uppercase tracking-widest mb-1">{m.year}</p>
                    <h3 className="font-black text-dark-900 text-lg mb-2">{m.title}</h3>
                    <p className="text-dark-500 text-sm leading-relaxed">{m.description}</p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-primary-600 text-white text-sm font-black items-center justify-center shadow-md flex-shrink-0 z-10">
                    {m.year.slice(2)}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────── */}
      <section className="section-py bg-surface">
        <div className="section-container">
          <SectionHeader
            label="Our Team"
            title="Meet the People"
            titleHighlight="Behind the Magic"
            subtitle="Certified, experienced, and deeply passionate about the Himalayas — every one of them."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial feature ───────────────────────────── */}
      <section className="section-py bg-gradient-to-br from-primary-950 via-dark-900 to-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="section-container relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Quote className="w-10 h-10 text-primary-400 mx-auto mb-6" />
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed italic mb-8">
              "The mountains have always been there. Our job is simply to help more people experience their magic — safely, responsibly, and unforgettably."
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src="https://i.pravatar.cc/80?img=12" alt="Rajan Sharma" className="w-12 h-12 rounded-full ring-2 ring-primary-400" />
              <div className="text-left">
                <p className="text-white font-bold">Rajan Sharma</p>
                <p className="text-white/60 text-sm">Founder, SummitSeek Adventures</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section-py bg-white">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-dark-900 mb-4">
              Ready to Explore the <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Himalayas?</span>
            </h2>
            <p className="text-dark-500 text-lg mb-8 max-w-md mx-auto">
              Join thousands of adventurers who've trusted SummitSeek with their Himalayan dreams.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/treks" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all hover:scale-105 shadow-md">
                <Mountain className="w-5 h-5" /> Explore Treks
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary-600 text-primary-600 font-bold hover:bg-primary-50 transition-all hover:scale-105">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
