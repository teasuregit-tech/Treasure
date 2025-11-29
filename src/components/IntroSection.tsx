import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const INTRO_IMAGES = [
  "/assets/images/image.jpg",
  // Add more images here to see the slideshow effect
  // "/assets/images/image2.jpg",
];

const IntroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simple timer to cycle through images
  useEffect(() => {
    if (INTRO_IMAGES.length <= 1) return; // Don't cycle if only 1 image
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INTRO_IMAGES.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Import Fonts directly in the component for immediate use */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        `}
      </style>

      <section className="relative py-24 lg:py-32 px-6 lg:px-24 max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Watermark Text */}
        <div className="
          absolute
          bottom-[-60px] 
          left-1/2 -translate-x-1/2
          text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem]
          text-stone-900/5 dark:text-white/5 
          pointer-events-none 
          font-['Playfair_Display'] font-bold whitespace-nowrap
          select-none
          z-0 
        ">
          Interiors
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
          
          {/* LEFT COLUMN: Image Slideshow */}
          {/* 1. Wrapped in a flex container to center the reduced-size image */}
          <div className="flex justify-center items-center w-full">
             {/* 2. REDUCED IMAGE SIZE:
                 - Added max-w constraints (max-w-[500px] lg:max-w-[650px]) so it doesn't get too huge.
                 - Changed aspect ratio from md:aspect-[4/5] to md:aspect-[3/4] to make it slightly shorter vertically.
             */}
            <div className="relative w-full max-w-[500px] lg:max-w-[650px] aspect-square md:aspect-[3/4] overflow-hidden rounded-lg shadow-2xl border border-stone-200 dark:border-luxury-gold/10 bg-stone-100 dark:bg-stone-800">
              {INTRO_IMAGES.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt="Interior Showcase"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 1.1 
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}

              {/* Slideshow Indicators */}
              {INTRO_IMAGES.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {INTRO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${idx === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Static Text */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             viewport={{ once: true }}
             className="flex flex-col justify-center"
          >
            <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl mb-8 uppercase tracking-wider text-stone-900 dark:text-white">
              Light. Space.<br />Sophistication.
            </h2>

            <p className="font-['Playfair_Display'] text-stone-600 dark:text-stone-300 mb-8 leading-loose text-lg lg:text-xl">
              Architecture, for us, is an experience, a rhythm of proportion, material, and calm. At Treasure, every home is imagined not as a structure but as a relationship: between light and space, between family and home, between craft and comfort.
            </p>
            
            <p className="font-['Playfair_Display'] text-stone-600 dark:text-stone-300 leading-loose text-lg lg:text-xl">
              We design to endure, thoughtfully, gracefully, and with restraint. The result is a home that feels timeless from the day it is finished.
            </p>

          </motion.div>

        </div>
      </section>
    </>
  );
};

export default IntroSection;