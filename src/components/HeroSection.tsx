import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

// --- CONFIGURATION ---
const SLIDES = [
  {
    id: 1,
    url: "/assets/images/newimg8.png", 
    alt: "Exterior Facade"
  },
  {
    id: 2,
    url: "/assets/images/vdn2.jpg", 
    alt: "Luxury Interior"
  },
  {
    id: 3,
    url: "/assets/images/vdn5.png", 
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
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-black font-sans">
      
      {/* --- FONT LOADING & UTILITIES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

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
            className="w-full h-full object-cover opacity-60" 
          />
        </motion.div>
      ))}

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

      {/* --- HERO CONTENT --- */}
      <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* 1. MAIN HEADING (Oswald) */}
        {/* Responsive sizing: Starts large on mobile, scales up massively on desktop */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase font-bold tracking-widest drop-shadow-2xl leading-none"
        >
          Treasure
        </motion.h1>
        
        {/* 2. SUBHEADING (Playfair Display) */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mt-4 mb-6 italic font-normal tracking-wide max-w-4xl"
        >
          Built to Last, Designed to Inspire
        </motion.h2>

        {/* 3. BODY TEXT (Playfair Display) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-playfair text-xs sm:text-sm md:text-base text-gray-300 max-w-xs sm:max-w-xl md:max-w-2xl leading-relaxed opacity-90 mx-auto"
        >
          Discover premium residences designed for those who desire superior architecture, 
          timeless elegance, and sophisticated living spaces in the heart of the city.
        </motion.p>
        
        {/* 4. CTA BUTTON (Oswald) */}
        
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.1 }}
>
  <Link
    to="/about"
    className="group mt-10 sm:mt-12 relative overflow-hidden 
               bg-transparent text-white border border-white 
               px-8 py-3 sm:px-10 sm:py-4 
               flex items-center gap-3 
               transition-all duration-300 uppercase font-playfair 
               text-xs sm:text-sm tracking-[0.2em] font-medium
               hover: hover:text-white cursor-pointer"
  >
    <span className="relative z-10">About us</span>
    <ArrowRight
      size={16}
      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>
</motion.div>
      </div>

      {/* --- INDICATOR DOTS --- */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-4 md:right-10 md:left-auto md:justify-end md:px-10">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-500 ease-out 
              ${idx === currentIndex ? 'w-12 bg-white opacity-100' : 'w-6 bg-white opacity-40 hover:opacity-70'}
              h-[2px]`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;