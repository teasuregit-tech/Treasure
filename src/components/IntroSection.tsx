import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const INTRO_IMAGES = [
  "/assets/images/image.jpg",
];

const IntroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simple timer to cycle through images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-24 max-w-[1600px] mx-auto">
      {/* Watermark Text */}
  <div className="
  absolute
  bottom-[-30px] sm:bottom-[-30px] md:bottom-[-40px]
  left-1/2 -translate-x-[40%]
  text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]
  opacity-5 pointer-events-none font-playfair font-bold whitespace-nowrap
">
  Interiors
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Image Slideshow (Stacked) */}
        <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-lg shadow-xl border border-stone-300 dark:border-luxury-gold/20 bg-stone-100 dark:bg-stone-800">
          {INTRO_IMAGES.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt="Interior Showcase"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 1.05 // Subtle zoom effect
              }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}

          {/* Slideshow Indicators (Dots) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {INTRO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Static Text */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="flex flex-col justify-center"
        >
          <h2 className="font-playfair text-4xl md:text-5xl mb-8 uppercase tracking-wide">
            Light. Space. Sophistication.
          </h2>
          <p className="text-stone-600 dark:text-luxury-gold/80 mb-8 leading-relaxed text-lg font-light">
Architecture, for us, is an experience, a rhythm of proportion, material, and calm. At Treasure, every home is imagined not as a structure but as a relationship: between light and space, between family and home, between craft and comfort.

We design to endure, thoughtfully, gracefully, and with restraint. The result is a home that feels timeless from the day it is finished.

          </p>
          
          

          
        </motion.div>

      </div>
    </section>
  );
};

export default IntroSection;