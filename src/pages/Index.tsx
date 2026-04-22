import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ParallaxGrid from "@/components/ParallaxGrid";
import FloatingCircles from "@/components/FloatingCircles";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import LevelSystem from "@/components/LevelSystem";
import ExperienceSection from "@/components/ExperienceSection";
import CultureSection from "@/components/CultureSection";
import FounderSection from "@/components/FounderSection";
import CommunitySection from "@/components/CommunitySection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SubliminalInterruption from "@/components/SubliminalInterruption";

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
        <div className="section-accent-cyan">
          <IntroSection isFloating={isFloating} />
          <LevelSystem isFloating={isFloating} />
        </div>
        <ExperienceSection isFloating={isFloating} />
        <div className="section-accent-cyan">
          <CultureSection isFloating={isFloating} />
        </div>
        <SubliminalInterruption />
        <FounderSection isFloating={isFloating} />
        <CommunitySection isFloating={isFloating} />
        <div className="section-accent-pink">
          <GallerySection isFloating={isFloating} />
          <FAQSection isFloating={isFloating} />
        </div>
        <ContactSection isFloating={isFloating} />
        <div className="section-accent-cyan">
          <FinalCTA isFloating={isFloating} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
