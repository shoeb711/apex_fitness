
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import {AiMealNutritionAnalyzer} from '@/components/AiMealNutritionAnalyzer';
import AIWorkoutPrograms from '@/components/AIWorkoutPrograms';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServiceCards />
        <AIWorkoutPrograms/>
        <AiMealNutritionAnalyzer />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

