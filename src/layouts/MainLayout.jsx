import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import WhatsAppButton from '../components/ui/WhatsAppButton';


const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

