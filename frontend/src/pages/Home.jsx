import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutUsSection from '../components/sections/AboutUsSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';

import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUsSection />

      <ContactSection />
    </div>
  );
}
