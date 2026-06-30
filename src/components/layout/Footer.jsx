import { Link } from 'react-router-dom';
import { Mountain, Phone, Mail, MapPin, Clock, Globe, Send, Film, Heart, ArrowRight } from 'lucide-react';
import { navLinks, contactInfo } from '../../data/navigation';

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-dark-400 hover:text-primary-500 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
    >
      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
      {children}
    </Link>
  </li>
);

export default function Footer() {
  const trekLinks = navLinks.find((l) => l.label === 'Treks')?.dropdown?.slice(0, 8) ?? [];

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">SummitSeek</p>
                <p className="text-dark-400 text-xs mt-0.5">Adventures</p>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              India's most trusted Himalayan trekking company. Expert guides, 
              premium gear, and unforgettable adventures since 2014.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Globe, label: 'Website', href: '#' },
                { Icon: Send, label: 'Telegram', href: '#' },
                { Icon: Film, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-dark-800 hover:bg-primary-600 flex items-center justify-center
                             transition-all duration-200 hover:scale-110 text-dark-400 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Treks */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-dark-300 mb-5">
              Our Treks
            </h3>
            <ul className="space-y-2.5">
              {trekLinks.map((link) => (
                <FooterLink key={link.path} to={link.path}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-dark-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/gallery">Photo Gallery</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/treks">All Treks</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-dark-300 mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {[
                { Icon: Phone, text: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                { Icon: Mail, text: contactInfo.email, href: `mailto:${contactInfo.email}` },
                { Icon: MapPin, text: contactInfo.address, href: '#' },
                { Icon: Clock, text: contactInfo.hours, href: null },
              ].map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm text-dark-400 hover:text-white transition-colors leading-relaxed">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-dark-400 leading-relaxed">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} SummitSeek Adventures. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in the Himalayas
          </p>
        </div>
      </div>
    </footer>
  );
}
