import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- CONFIGURATION ---
const SLIDES = [
  {
    id: 1,
    url: "/assets/images/masterbed2.jpg", 
    alt: "Exterior Facade"
  },
  {
    id: 2,
    url: "/assets/images/vdn2.jpg", 
    alt: "Luxury Interior"
  },
  {
    id: 3,
    url: "/assets/images/vdn3.jpg", 
    alt: "Evening Ambience"
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Changed h-screen to h-[100dvh] for better mobile browser support (addresses address bar resizing)
    // Added min-h to prevent squashing on landscape mobile
    <section className="relative h-[100dvh] min-h-[500px] w-full overflow-hidden bg-black">
      
      {/* --- IMAGE STACK --- */}
      {SLIDES.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.1 
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: index === currentIndex ? 10 : 0 }}
        >
          <img 
            src={slide.url} 
            alt={slide.alt}
            className="w-full h-full object-cover opacity-80 dark:opacity-50" 
          />
        </motion.div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* --- HERO CONTENT --- */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
        
        {/* 1. MAIN HEADING (Oswald) */}
        {/* Adjusted text sizes: text-5xl on mobile -> text-9xl on desktop */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-oswald text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-widest uppercase drop-shadow-2xl font-bold leading-tight"
        >
          Treasure
        </motion.h1>
        
        {/* 2. SUBHEADING (Playfair Display) */}
        {/* Adjusted text sizes and margin for mobile */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-playfair text-xl sm:text-2xl md:text-4xl text-white/90 mt-2 sm:mt-4 mb-4 sm:mb-6 italic font-light tracking-wide px-2"
        >
          Build to Last, Design to Inspire
        </motion.h2>

        {/* 3. BODY TEXT (Playfair/Sans Mix) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-playfair text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-2xl leading-relaxed opacity-90"
        >
          Discover premium residences designed for those who desire superior architecture, 
          timeless elegance, and sophisticated living spaces.
        </motion.p>
        
        {/* 4. ABOUT US BUTTON (Oswald) */}
        {/* Adjusted padding and font size for mobile touch targets */}
        <motion.a 
          href="/about" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="group mt-8 sm:mt-10 border border-white/30 bg-white/5 hover:bg-white text-white hover:text-black px-8 py-3 sm:px-10 sm:py-4 flex items-center gap-3 transition-all duration-300 uppercase font-oswald text-xs sm:text-sm tracking-[0.2em] backdrop-blur-sm cursor-pointer"
        >
          About Us 
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 sm:w-[18px] sm:h-[18px]" />
        </motion.a>
      </div>

      {/* --- INDICATOR DOTS --- */}
      {/* Mobile: Centered at bottom | Desktop: Bottom Right */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-10 md:right-10 z-30 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-[3px] md:h-[2px] transition-all duration-500 ease-out rounded-full md:rounded-none
              ${idx === currentIndex ? 'w-8 md:w-10 bg-white' : 'w-4 md:w-5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;