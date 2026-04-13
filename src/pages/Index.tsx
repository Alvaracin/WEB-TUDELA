import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ParallaxGrid from "@/components/ParallaxGrid";
import FloatingCircles from "@/components/FloatingCircles";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import LevelSystem from "@/components/LevelSystem";
import ExperienceSection from "@/components/ExperienceSection";
import CultureSection from "@/components/CultureSection";
import PricingSection from "@/components/PricingSection";
import CommunitySection from "@/components/CommunitySection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  const [isFloating, setIsFloating] = useState(false);
  const [gravityTriggered, setGravityTriggered] = useState(false);

  const handlePointerDown = useCallback(() => {
    setIsFloating(true);
    setGravityTriggered(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsFloating(false);
  }, []);

  return (
    <div className="grain-overlay relative">
      <ParallaxGrid isFloating={isFloating} />
      <FloatingCircles isFloating={isFloating} />
      <div className="relative z-10">
        <Navbar isFloating={isFloating} />
        <HeroSection
          isFloating={isFloating}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          gravityTriggered={gravityTriggered}
        />
        <IntroSection isFloating={isFloating} />
        <LevelSystem isFloating={isFloating} />
        <ExperienceSection isFloating={isFloating} />
        <CultureSection isFloating={isFloating} />
        <PricingSection isFloating={isFloating} />
        <CommunitySection isFloating={isFloating} />
        <GallerySection isFloating={isFloating} />
        <FAQSection isFloating={isFloating} />
        <ContactSection isFloating={isFloating} />
        <FinalCTA isFloating={isFloating} />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
