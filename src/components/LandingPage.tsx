import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { X, Maximize2, Phone,  User, Settings, PenTool, ArrowRight, Menu, Sun, Moon, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection'; 
import NavigationSidebar from './NavigationSidebar';

const LandingPage = () => {
  // Check for saved preference in localStorage, or default to system preference
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(prevIsDark => {
      localStorage.setItem('theme', !prevIsDark ? 'dark' : 'light');
      return !prevIsDark;
    });
  };

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  // Effect to toggle dark mode class on the <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main className={`min-h-screen transition-colors duration-700 ease-in-out
      bg-luxury-cream text-stone-800 
      dark:bg-luxury-maroon dark:text-luxury-gold 
      font-lato overflow-x-hidden`}>

      {/* HEADER: Visible on all screens, but Menu button hidden on Desktop */}
      <Header isDark={isDark} onToggleTheme={toggleTheme} onOpenMenu={openMenu} />
      
      {/* SIDEBAR: Visible on Desktop, No Theme Toggle */}
      <FixedSidebar isDark={isDark} onOpenMenu={openMenu} />
      
      <NavigationSidebar isOpen={isMenuOpen} onClose={closeMenu} />

      <div className="lg:ml-24">
        {/* 1. SLIDESHOW HERO */}
        <HeroSection />
        
        {/* 2. PARALLAX INTRO */}
        <IntroSection /> 

        {/* 3. REMAINING SECTIONS */}
        <VideoSection />
        <FeaturesSection />
        <StatsSection />
        <GallerySection />
        <BlogSection />
        <ContactHero />
        <LocationSection />
      </div>

      <Footer />

    </main>
  );
};

// --- SUB-COMPONENTS ---

const Header = ({ isDark, onToggleTheme, onOpenMenu }: { isDark: boolean, onToggleTheme: () => void, onOpenMenu: () => void }) => (
  <nav className="fixed top-0 w-full z-50 grid grid-cols-3 items-center p-8 mix-blend-difference text-white">
    {/* Left: Menu Button */}
    <div className="flex justify-start">
      <button onClick={onOpenMenu} aria-label="Open Menu">
        <Menu size={32} strokeWidth={1} />
      </button>
    </div>
    {/* Center: Logo */}
    <div className="flex flex-col items-center justify-center">
      <span className="text-2xl font-bold tracking-widest font-playfair"></span>
      <span className="text-[10px] tracking-[0.3em] uppercase"></span>
    </div>
    {/* Right: Theme Toggle */}
    <div className="flex justify-end">
      <button onClick={onToggleTheme} aria-label="Toggle Dark Mode" className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  </nav>
);


// --- SIDEBAR COMPONENT (No Theme Toggle) ---
const FixedSidebar = ({ isDark, onOpenMenu }: { isDark: boolean, onOpenMenu: () => void }) => {
  return (
    <aside className={`fixed top-0 left-0 h-screen w-24 z-50 hidden lg:flex flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${
      isDark ? 'bg-luxury-maroon border-white/10' : 'bg-white border-gray-100'
    }`}>
      {/* Top: Hamburger & Image Logo */}
      <div className="flex flex-col items-center w-full pt-8 gap-12">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
          <div className="space-y-1.5">
            <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-luxury-gold' : 'bg-stone-800'}`}></span>
            <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-luxury-gold' : 'bg-stone-800'}`}></span>
          </div>
        </button>
        
        {/* UPDATED: LOGO IMAGE */}
        <Link to="/" className="group hover:opacity-80 transition-opacity">
          <img 
            src="/assets/images/logo.png" 
            alt="Treasure Logo" 
            className="w-14 h-auto object-contain"
          />
        </Link>
      </div>

      {/* Bottom: Enquiry Link (Redirects to Contact) */}
      <div className="w-full flex flex-col items-center">
          <Link 
            to="/contact" 
            className="w-full h-48 bg-[#3E2723] text-white flex items-center justify-center hover:bg-[#2C1A16] transition-colors"
          >
              <span className="text-xs font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">
                Make an Enquiry
              </span>
          </Link>
      </div>
    </aside>
  );
};

const VideoSection = () => (
  <section className="w-full h-screen relative group overflow-hidden">
    {/* Just the image with a slow zoom effect on hover */}
    <img 
      src="/assets/images/vdn3.jpg" // Ensure this image exists in your public folder
      alt="Property Showcase" 
      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
    />
  </section>
);

const UNIT_FEATURES = ['+ Premium Units', '+ Balconies with Plantation Areas', '+ Smart Spatial Planning'];

const FeaturesSection = () => (
  <section className="relative py-24 lg:py-32 px-6 lg:px-24 max-w-[1600px] mx-auto">
     <div className="absolute top-10 right-0 text-[12rem] opacity-5 pointer-events-none font-playfair font-bold whitespace-nowrap dark:text-luxury-gold dark:opacity-[0.05]">
      Building
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
       <div className="lg:col-span-7 relative h-[600px]">
          <motion.img 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="/assets/images/guestbedroom.jpg" 
            className="absolute left-0 top-0 w-2/3 h-[80%] object-cover shadow-2xl z-10" 
          />
          <motion.img 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="/assets/images/vdn4.jpg" 
            className="absolute right-0 bottom-0 w-3/5 h-[70%] object-cover shadow-xl z-0 border-8 border-luxury-cream dark:border-luxury-maroon" 
          />
       </div>

       <div className="lg:col-span-5 lg:pl-12 mt-12 lg:mt-0">
          <h2 className="font-playfair text-3xl md:text-4xl mb-6 uppercase tracking-wide leading-tight">
             Refined Residences <br/> Designed for your Comfort
          </h2>
          <p className="text-stone-600 dark:text-luxury-gold/80 mb-8 font-light">
             Treasure offers thoughtfully crafted apartment layouts, ensuring spacious interiors, cross ventilation, natural lighting, and luxury-grade detailing.
          </p>
          <div className="grid grid-cols-1 gap-4 mb-8">
              {UNIT_FEATURES.map(item => (
                 <div key={item} className="text-sm uppercase tracking-wider text-stone-500 dark:text-luxury-gold/60">{item}</div>
              ))}
          </div>
          
       </div>
    </div>
  </section>
);

type Stat = {
  val: string;
  label: string;
};

const STATS_DATA = [
  { val: '78%', label: 'Climate Responsive Architecture' },
  { val: '92%', label: 'Premium Material Selection' },
  { val: '88%', label: 'Optimal Layout Efficiency' },
  { val: '81%', label: 'Green Living Design' },
]; 

const StatsSection = () => {
  const circumference = 2 * Math.PI * 63; // 2 * pi * r

  return (
    <section className="py-20 border-t border-stone-200 dark:border-white/10">
       <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS_DATA.map((stat, idx) => (
             <motion.div 
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
             >
                <div className="w-32 h-32 rounded-full border border-stone-300 dark:border-stone-600 flex items-center justify-center mb-6 relative">
                   <span className="font-playfair text-3xl font-bold">{stat.val}</span>
                   <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                      <circle cx="64" cy="64" r="63" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-800/10 dark:text-luxury-gold/10" />
                      <motion.circle 
                        cx="64" 
                        cy="64" 
                        r="63" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference * (1 - parseInt(stat.val) / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + idx * 0.1 }}
                        className="text-stone-800 dark:text-luxury-gold" />
                   </svg>
                </div>
                <h3 className="text-xs uppercase tracking-widest max-w-[150px]">{stat.label}</h3>
             </motion.div>
          ))}
       </div>
    </section>
  );
};

type GalleryItem = {
  id: number;
  src: string;
  title: string;
  category: string;
  height: string;
};

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/assets/images/masterbed.jpg" ,
    title: "Master Suite",
    category: "Bedroom",
    height: "flex-1" 
  },
  {
    id: 2,
    src: "/assets/images/guestbedroom.jpg" ,
    title: "Guest Room",
    category: "Bedroom",
    height: "h-1/3" 
  },
  {
    id: 3,
    src: "/assets/images/living4.jpg" ,
    title: "Living & Dining",
    category: "Living Area",
    height: "h-full" 
  },
  {
    id: 4,
    src: "/assets/images/living.jpg" ,
    title: "Living & Dining",
    category: "Living Area",
    height: "h-1/2" 
  },
  {
    id: 5,
    src: "/assets/images/living3.jpg" ,
    title: "Hall",
    category: "Living Area",
    height: "flex-1" 
  },
];

const GalleryCard = ({ item, className }: { item: GalleryItem, className?: string }) => (
  <div className={`relative group overflow-hidden bg-stone-200 cursor-pointer ${item.height} ${className}`}>
    <img 
      src={item.src} 
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    <div className="absolute bottom-0 left-0 w-full bg-black p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
      <p className="text-[10px] text-white/70 uppercase tracking-widest mb-1 font-lato">
        {item.category}
      </p>
      <h4 className="text-white font-playfair text-xl uppercase tracking-wide">
        {item.title}
      </h4>
    </div>
  </div>
);

const GallerySection = () => (
  <section className="relative py-24 pb-32 px-6 bg-white dark:bg-[#2A0A0A] transition-colors duration-700">
  <div
  className="
    absolute top-0
    left-[42%] sm:left-[41%] md:left-[40%] lg:left-[38%]
    -translate-x-1/2
    text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem]
    opacity-5 pointer-events-none font-playfair font-bold whitespace-nowrap
    dark:text-luxury-gold dark:opacity-[0.05]
  "
>
  Gallery
</div>
    
    <div className="text-center mb-16 relative z-10">
       <h2 className="font-playfair text-3xl uppercase tracking-widest mb-2">Visualize Your Future Home</h2>
       <p className="text-stone-500 dark:text-luxury-gold/60 italic text-sm">A collection of renders showcasing the architectural brilliance of Treasure.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1600px] mx-auto h-[600px] mb-16">
       <div className="md:col-span-1 h-full flex flex-col gap-4">
          <GalleryCard item={GALLERY_ITEMS[0]} />
          <GalleryCard item={GALLERY_ITEMS[1]} />
       </div>
       <div className="md:col-span-1 h-full">
          <GalleryCard item={GALLERY_ITEMS[2]} />
       </div>
       <div className="md:col-span-1 h-full flex flex-col gap-4">
          <GalleryCard item={GALLERY_ITEMS[3]} />
          <GalleryCard item={GALLERY_ITEMS[4]} />
       </div>
    </div>

    {/* ADDED: View Gallery Button */}
    

  </section>
);

type BlogPost = {
  id: number;
  category: string;
  date: string;
  title: string;
  image: string;
};

const BlogSection = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      category: "Design",
      date: "June 10, 2024",
      title: "WARM LUXURY",
      image: "/assets/images/living5.jpg" ,
    },
    {
      id: 2,
      category: "Lifestyle",
      date: "June 9, 2024",
      title: "A GUIDE TO ELEGANCE",
      image: "/assets/images/17-2.jpg",
    },
    {
      id: 3,
      category: "Architecture",
      date: "June 8, 2024",
      title: "A CALM AFTERNOON",
      image: "/assets/images/daughtersroom1.jpg",
    },
  ];

  return (
    <section className="relative py-24 bg-[#F5F5F0] dark:bg-luxury-maroon overflow-hidden transition-colors duration-700">
      <div className="
  absolute
  top-[-20px] sm:top-[-30px] md:top-[-40px]
  left-10 md:left-20
  select-none pointer-events-none z-0
">
  <span className="
    text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem]
    font-playfair text-[#EBEBE6] dark:text-luxury-gold/5
    leading-none opacity-80
  ">
    Blog
  </span>
</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xl md:text-2xl font-playfair tracking-widest text-[#8C7B6C] dark:text-luxury-gold/70 uppercase mb-2">
            Hot off the Press
          </h2>
          <div className="w-12 h-px bg-[#8C7B6C] dark:bg-luxury-gold/70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer flex flex-col gap-6">
              <div className="overflow-hidden aspect-[3/4] w-full bg-stone-200 dark:bg-stone-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-medium text-stone-500 dark:text-luxury-gold/60 uppercase tracking-wider">
                  {post.date} / <span className="text-stone-800 dark:text-luxury-gold/90">{post.category}</span>
                </div>
                
                <h3 className="text-2xl font-playfair text-stone-900 dark:text-luxury-gold tracking-wide group-hover:text-[#8C7B6C] dark:group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-stone-600 dark:text-luxury-gold/80 leading-relaxed line-clamp-3 font-light">{post.excerpt}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
      
type Room = {
  id: string;
  label: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

// BRAND PARTNERS
const BrandPartners = () => {
  const brands = [
    { name: "UltraTech", src: "/assets/images/brand1.png" },
    { name: "Asian Paints", src: "/assets/images/brand2.png" },
    { name: "Kohler", src: "/assets/images/brand3.png" },
    { name: "Dolby", src: "/assets/images/brand4.png" },
    { name: "Hafele", src: "/assets/images/brand5.png" },
    { name: "Kone", src: "/assets/images/brand6.png" },
    { name: "Schindler", src: "/assets/images/brand7.png" },
  ];

  // Duplicate the array to ensure seamless infinite scrolling
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="relative w-full py-16 bg-[#EFF2F4] dark:bg-[#1C0A0A] overflow-hidden transition-colors duration-700">
      
      {/* Gradient Masks to fade edges */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#EFF2F4] to-transparent dark:from-[#1C0A0A] z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#EFF2F4] to-transparent dark:from-[#1C0A0A] z-10 pointer-events-none" />

      {/* Subtle background diagonal effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none dark:opacity-5" />

      <div className="relative z-0 max-w-full">
        
        {/* Moving Track */}
        <motion.div 
          className="flex items-center gap-12 md:gap-20 w-max"
          // Animate from 0% to -50% (since list is doubled, -50% is the exact restart point)
          // To move Left-to-Right instead, swap to: animate={{ x: ["-50%", "0%"] }}
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            ease: "linear", 
            duration: 30, // Adjust speed here (higher = slower)
            repeat: Infinity 
          }}
        >
          {marqueeBrands.map((brand, index) => (
            <div 
              // Use index + name to ensure unique keys for the duplicated list
              key={`${brand.name}-${index}`} 
              className="w-32 md:w-40 h-16 flex items-center justify-center flex-shrink-0"
            >
              <img 
                src={brand.src} 
                alt={brand.name} 
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-default"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
      
const QuoteSection = () => {
  return (
    <section className="relative w-full py-32 md:py-48 bg-[#1A0B09] overflow-hidden flex items-center justify-center">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/assets/images/dpattern.jpg" // <--- Replace with your actual image filename
          alt="Background Pattern" 
          className="w-full h-full " // Adjust opacity (0.1 to 0.3) to blend with the dark background
        />
      </div>

      {/* Optional: Vignette Overlay for depth (darkens edges) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1A0B09]/20 to-[#1A0B09]/80 z-0 pointer-events-none" />

      {/* --- TEXT CONTENT --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl md:text-5xl lg:text-3xl text-[#EBEBE6] italic leading-snug tracking-wide drop-shadow-lg">
          “Don't wait to invest in treasure.<br />
          Invest in treasure and wait.”
        </h2>
      </div>
    </section>
  );
};

type Plan = {
  id: string;
  title: string;
  desc: string;
  src: string;
};

const FloorPlanSection = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'plan-1',
      title: "Typical Floor Plan (3 BHK)",
      desc: "Optimized for ventilation and family privacy.",
      src: "/assets/images/fp1.jpg" 
    },
    {
      id: 'plan-2',
      title: "Penthouse Layout (4 BHK)",
      desc: "Expansive terraces with panoramic city views.",
      src: "/assets/images/fp2.jpg" 
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#2A0A0A] transition-colors duration-700 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair mb-4 dark:text-luxury-gold">Floor Plans</h2>
          <p className="text-stone-600 dark:text-luxury-gold/80 font-light">
            Click on a layout to view the finer details.
          </p>
        </div>

        {/* UPDATED: Tighter Grid & Padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              layoutId={`container-${plan.id}`}
              onClick={() => setSelectedId(plan.id)}
              className="relative group cursor-pointer bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 p-2 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="overflow-hidden relative aspect-[4/3] bg-white dark:bg-black/20">
                <motion.img
                  layoutId={`image-${plan.id}`}
                  src={plan.src}
                  alt={plan.title}
                  // UPDATED: Removed padding (p-4 -> p-0) so image touches edges or has minimal gap
                  className="w-full h-full object-contain p-0 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Overlay with Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                   <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" size={32} />
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4 text-center">
                <h3 className="font-playfair text-xl text-stone-800 dark:text-luxury-gold">{plan.title}</h3>
                <p className="text-sm text-stone-500 dark:text-luxury-gold/60 mt-1 pb-2">{plan.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EXPANDED MODAL */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
              
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Expanded Card */}
              {plans.map((plan) => {
                if (plan.id !== selectedId) return null;
                return (
                  <motion.div
                    key={plan.id}
                    layoutId={`container-${plan.id}`}
                    className="relative w-full max-w-5xl bg-white dark:bg-[#1a0505] p-0 md:p-2 shadow-2xl overflow-hidden"
                  >
                    {/* Close Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="absolute top-4 right-4 z-20 p-2 bg-stone-100 dark:bg-white/10 rounded-full hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                    >
                      <X className="text-stone-800 dark:text-white" size={24} />
                    </button>

                    {/* Expanded Image */}
                    <div className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-stone-50 dark:bg-black/40">
                      <motion.img
                        layoutId={`image-${plan.id}`}
                        src={plan.src}
                        alt={plan.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Footer Info in Modal */}
                    <div className="p-4 md:p-6 text-center">
                        <motion.h3 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-2xl font-playfair text-stone-800 dark:text-luxury-gold mb-2"
                        >
                          {plan.title}
                        </motion.h3>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-stone-500 dark:text-luxury-gold/60"
                        >
                          {plan.desc}
                        </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};


const ContactHero = () => {
  const formFields = [
    { name: 'email', label: 'Email*', type: 'email' },
    { name: 'phone', label: 'Phone*', type: 'tel' },
    { name: 'message', label: 'Message', type: 'text' },
  ];

  return (
    <section className="relative w-full pt-24 bg-luxury-cream dark:bg-luxury-maroon transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="w-full h-[70vh] md:h-[90vh]">
          {/* Ensure this image matches your preference (local or remote) */}
          <img 
            src="/assets/images/living3.jpg"
            alt="Modern building exterior" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* UPDATED POSITION: changed md:-translate-x-[80%] to md:-translate-x-[95%] */}
        <div className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-[130%] md:-translate-y-1/2 z-10 max-w-md w-full -mt-32 md:mt-0 mx-auto px-4 md:px-0">
          <div className="bg-[#4A2521] dark:bg-[#381c19] text-[#EBEBE6] p-10 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 top-0 h-full w-32 opacity-5 pointer-events-none text-9xl font-playfair flex items-center text-white">
                  §
              </div>

              <h2 className="font-playfair text-2xl md:text-3xl mb-8 leading-snug tracking-wide relative z-10">
                SCHEDULE A VISIT OR REQUEST MORE DETAILS
              </h2>

              <form className="space-y-8 z-10 relative">
                {formFields.map(({ name, label, type }) => (
                  <div key={name} className="relative">
                    <input 
                      type={type} 
                      id={name}
                      name={name}
                      placeholder={label}
                      className="peer block w-full bg-transparent border-b border-[#EBEBE6]/30 py-2 text-white placeholder:text-transparent focus:outline-none focus:border-white transition-colors"
                    />
                    <label 
                      htmlFor={name}
                      className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#EBEBE6]/60
                        transition-all duration-300 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#EBEBE6]/60
                        peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white"
                    >
                      {label}
                    </label>
                  </div>
                ))}

                <button 
                  type="submit"
                  className="group flex items-center justify-center gap-3 px-8 py-3 border border-[#EBEBE6]/50 hover:bg-[#EBEBE6] hover:text-[#4A2521] transition-all duration-300 uppercase text-xs tracking-widest mt-4"
                >
                  <Mail size={14} />
                  Submit Inquiry
                </button>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#F5F5F0] dark:bg-luxury-maroon overflow-hidden transition-colors duration-700">
      
      {/* --- BACKGROUND IMAGE (Size Increased) --- */}
      {/* 1. Increased width to 55% (md:w-[55%]) to give it more horizontal space */}
      <div className="absolute top-0 right-0 w-full md:w-[75%] h-full z-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <img 
          src="/assets/images/bp.png"
          alt="Building Blueprint Sketch"
          // 2. Reduced padding (md:p-6) so the image fills more of the container (making it bigger)
          className="w-full h-full object-contain object-right p-4 md:p-1 mix-blend-multiply dark:mix-blend-lighten opacity-60 dark:opacity-40"
        />
        {/* Gradient fade to ensure text readability where overlap might occur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent dark:from-luxury-maroon dark:via-luxury-maroon/80" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        
        <div className="w-full md:w-1/2 pr-0 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#4A2521] dark:text-luxury-gold uppercase tracking-widest mb-8 leading-tight">
            Prime Location at <br/> Vidhyadhar Nagar, Jaipur
          </h2>
          
          <div className="w-12 h-px bg-[#4A2521]/40 dark:bg-luxury-gold/40 mb-8" />

          <p className="text-stone-600 dark:text-luxury-gold/80 leading-relaxed mb-6 text-sm md:text-base font-light">
            Perfectly situated in one of Jaipur’s most calm residential zones, nested near the Arvallis Treasure offers easy connectivity to schools, hospitals, markets, restaurants, and transport hubs.
          </p>

          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3 border border-stone-400 dark:border-luxury-gold/50 text-stone-700 dark:text-luxury-gold hover:bg-stone-800 hover:text-white dark:hover:bg-luxury-gold dark:hover:text-luxury-maroon transition-colors uppercase text-xs tracking-widest bg-white/50 dark:bg-luxury-maroon/50 backdrop-blur-sm"
          >
            <MapPin size={14} />
            View on map
          </Link>
        </div>

      </div>
    </section>
  );
};
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300">
    {icon}
  </a>
);



const Footer = () => {
  return (
    <footer className="w-full bg-[#2C1A16] text-[#EBEBE6] relative font-sans border-t border-white/10">
      
      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img 
          src="/assets/images/dpattern.jpg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Darker Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A16]/95 to-[#1A0B09]/98 z-0" />

      {/* --- MAIN CONTENT --- */}
      {/* Reduced py-20 to py-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* COLUMN 1: ABOUT */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">About</h3>
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-light max-w-xs">
              Treasure provides superior architecture and sophisticated living. Built to provide a trouble-free experience.
            </p>
          </div>

          {/* COLUMN 2: CONTACT */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-light">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-white/40" />
                <span>+91 73782 55255</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-white/40" />
                <span>katewacompanies@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-white/40 mt-1" />
                <span>Sector-5, Vidhyadhar Nagar, Jaipur</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: USEFUL LINKS */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Links</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-light">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>About us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <span className="w-1 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
                  <span>Contact us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Newsletter</h3>
            
            <div className="space-y-3">
              <div className="relative border-b border-[#EBEBE6]/20">
                <Mail size={14} className="absolute left-0 top-2.5 text-white/40" />
                {/* Reduced padding */}
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent py-2 pl-6 text-sm focus:outline-none placeholder:text-[#EBEBE6]/30 text-white"
                />
              </div>
              <button className="w-full py-2 border border-[#EBEBE6]/20 text-xs uppercase tracking-widest hover:bg-[#EBEBE6] hover:text-[#2C1A16] transition-colors font-oswald">
                Subscribe
              </button>
            </div>

            <div className="flex gap-3 pt-2">
               <SocialIcon icon={<Facebook size={14} />} />
               <SocialIcon icon={<Linkedin size={14} />} />
               <SocialIcon icon={<Twitter size={14} />} />
               <SocialIcon icon={<Youtube size={14} />} />
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      {/* Reduced height and removed redundant info */}
      <div className="bg-[#1A0B09] py-4 border-t border-[#EBEBE6]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
             <img 
               src="/assets/images/logo.png" 
               alt="Treasure" 
               className="h-6 w-auto object-contain brightness-0 invert opacity-70" 
             />
             <span className="text-xs text-[#EBEBE6]/30 uppercase tracking-wider">© 2025 Treasure</span>
          </div>

          {/* Simple footer links */}
          <div className="flex gap-6 text-xs text-[#EBEBE6]/40">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};



export default LandingPage;