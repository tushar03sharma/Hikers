import HeroSection from '../components/sections/HeroSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import FeaturedTreks from '../components/sections/FeaturedTreks';
import PopularDestinations from '../components/sections/PopularDestinations';
import AdventureCategories from '../components/sections/AdventureCategories';
import Statistics from '../components/sections/Statistics';
import Testimonials from '../components/sections/Testimonials';
import GalleryPreview from '../components/sections/GalleryPreview';
import FAQ from '../components/sections/FAQ';
import Newsletter from '../components/sections/Newsletter';
import ContactCTA from '../components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedTreks />
      <PopularDestinations />
      <Statistics />
      <AdventureCategories />
      <Testimonials />
      <GalleryPreview />
      <FAQ />
      <Newsletter />
      <ContactCTA />
    </>
  );
}
