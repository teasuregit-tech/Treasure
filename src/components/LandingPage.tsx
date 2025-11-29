import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { 
  X, Maximize2, Phone, User, Settings, PenTool, ArrowRight, 
  Menu, Sun, Moon, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube 
} from 'lucide-react';

// Ideally, these would be imported from your files
import HeroSection from './HeroSection';
import IntroSection from './IntroSection'; 
import NavigationSidebar from './NavigationSidebar';

// --- MAIN COMPONENT ---

const LandingPage = () => {
  // Theme State Management
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
      const newTheme = !prevIsDark;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main className={`min-h-screen transition-colors duration-700 ease-in-out font-sans overflow-x-hidden
      bg-[#F9F9F7] text-stone-800 
      dark:bg-[#2A0A0A] dark:text-white`}>

      {/* MOBILE HEADER: Visible only on mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 mix-blend-difference text-white">
        <button onClick={openMenu} aria-label="Open Menu">
          <Menu size={32} />
        </button>
        <button onClick={toggleTheme} className="p-2 rounded-full border border-white/20 hover:bg-white/10">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* DESKTOP TOGGLE: Floating top-right */}
      <div className="hidden md:block fixed top-8 right-12 z-50">
        <button 
          onClick={toggleTheme} 
          className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
            isDark 
              ? 'bg-black/40 border-white text-white hover:bg-white/20' 
              : 'bg-white/20 border-white text-white hover:bg-white/30'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      {/* SIDEBAR: Visible on Desktop */}
      <FixedSidebar isDark={isDark} onOpenMenu={openMenu} />
      
      {/* DRAWER MENU */}
      <NavigationSidebar isOpen={isMenuOpen} onClose={closeMenu} />

      {/* MAIN CONTENT WRAPPER: Padded left on desktop only */}
      <div className="pl-0 md:pl-24">
        
        {/* 1. HERO (Imported) */}
        <HeroSection />
        
        {/* 2. INTRO (Imported) */}
        <IntroSection /> 

        {/* 3. SUB-SECTIONS */}
        <VideoSection />
        <FeaturesSection isDark={isDark} />
        <StatsSection isDark={isDark} />
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

const FixedSidebar = ({ isDark, onOpenMenu }: { isDark: boolean, onOpenMenu: () => void }) => {
  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-50 flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${
      isDark ? 'bg-[#2A0A0A] border-white/10' : 'bg-white border-gray-100'
    }`}>
      {/* Top: Hamburger & Main Logo */}
      <div className="flex flex-col items-center w-full pt-8 gap-12">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
          <div className="space-y-1.5">
            <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span>
            <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-stone-800'}`}></span>
          </div>
        </button>
        
        <Link to="/" className="group hover:opacity-80 transition-opacity">
          <img 
            src="/assets/images/logo.png" 
            alt="Treasure Logo" 
            className="w-12 h-auto object-contain"
          />
        </Link>
      </div>

      {/* Bottom: Secondary Logo & Enquiry Link */}
      <div className="w-full flex flex-col items-center">
          
          {/* --- NEW LOGO ABOVE ENQUIRY (Increased Size) --- */}
          <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="/assets/images/katewa-logo.png" 
              alt="Secondary Logo" 
              // Changed w-8 to w-10 for increased size
              className={`w-12 h-auto object-contain ${isDark ? 'brightness-0 invert' : ''}`} 
            />
          </div>

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
  <section className="w-full h-[50vh] md:h-screen relative group overflow-hidden">
    <img 
      src="/assets/images/vdn3.jpg" 
      alt="Property Showcase" 
      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
    />
  </section>
);

const UNIT_FEATURES = ['+ Premium Units', '+ Balconies with Plantation Areas', '+ Smart Spatial Planning'];

const FeaturesSection = ({ isDark }: { isDark: boolean }) => (
  <section className="relative py-16 md:py-32 px-6 md:px-24 max-w-[1600px] mx-auto overflow-hidden">
     {/* Watermark */}
     <div className="absolute top-10 right-0 text-[6rem] md:text-[12rem] opacity-5 pointer-events-none font-['Playfair_Display'] font-bold whitespace-nowrap dark:text-white dark:opacity-[0.05]">
      Building
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
       
       {/* LEFT COLUMN: Images */}
       <div className="lg:col-span-7 relative h-[400px] md:h-[600px]">
          {/* Top/Left Image - Reduced width to 55% */}
          <motion.img 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="/assets/images/guestbedroom.jpg" 
            className="absolute left-0 top-0 w-[55%] h-[80%] object-cover shadow-2xl z-10" 
          />
          
          {/* Bottom/Right Image - Reduced width to 55% */}
          <motion.img 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="/assets/images/vdn4.jpg" 
            className={`absolute right-0 bottom-0 w-[55%] h-[75%] object-cover shadow-xl z-0 border-8 ${isDark ? 'border-[#2A0A0A]' : 'border-[#F9F9F7]'}`} 
          />
       </div>

       {/* RIGHT COLUMN: Text */}
       <div className="lg:col-span-5 lg:pl-12 mt-4 lg:mt-0">
          {/* Switched to Oswald for Heading */}
          <h2 className="font-['Oswald'] text-3xl md:text-4xl mb-6 uppercase tracking-wide leading-tight dark:text-white">
             Refined Residences <br/> Designed for your Comfort
          </h2>
          
          {/* Playfair for Body Text */}
          <p className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 mb-8 font-light leading-relaxed text-lg">
             Treasure offers thoughtfully crafted apartment layouts, ensuring spacious interiors, cross ventilation, natural lighting, and luxury-grade detailing.
          </p>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
              {UNIT_FEATURES.map(item => (
                 <div key={item} className="font-['Oswald'] text-sm uppercase tracking-wider text-stone-500 dark:text-white/60">{item}</div>
              ))}
          </div>
       </div>
    </div>
  </section>
);


const STATS_DATA = [
  { val: '78%', label: 'Climate Responsive Architecture' },
  { val: '92%', label: 'Premium Material Selection' },
  { val: '88%', label: 'Optimal Layout Efficiency' },
  { val: '0%', label: 'AQI' },
]; 

const StatsSection = ({ isDark }: { isDark: boolean }) => {
  const circumference = 2 * Math.PI * 63;

  return (
    <section className="py-16 md:py-20 border-t border-stone-200 dark:border-white/10 relative overflow-hidden">
       {/* Warm Cream Background Shape in Dark Mode */}
       <div 
         className="absolute inset-0 z-0 pointer-events-none" 
         style={{
           background: isDark 
             ? 'linear-gradient(135deg, transparent 65%, #F9F5EB 65%)' 
             : 'linear-gradient(135deg, transparent 65%, rgba(255,255,255,0.8) 65%)'
         }} 
       />

       <div className="relative z-10 max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS_DATA.map((stat, idx) => (
             <motion.div 
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
             >
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border flex items-center justify-center mb-6 relative ${isDark ? 'border-stone-800' : 'border-stone-300'}`}>
                   <span className={`font-playfair text-2xl md:text-3xl font-bold ${isDark ? 'text-stone-900' : 'text-stone-800'}`}>{stat.val}</span>
                   <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                      <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="1" className={`${isDark ? 'text-stone-800/20' : 'text-stone-800/10'}`} />
                      <motion.circle 
                        cx="50%" 
                        cy="50%" 
                        r="48%" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference * (1 - parseInt(stat.val) / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + idx * 0.1 }}
                        className={`${isDark ? 'text-stone-900' : 'text-stone-800'}`} />
                   </svg>
                </div>
                <h3 className={`text-[10px] md:text-xs uppercase tracking-widest max-w-[150px] ${isDark ? 'text-stone-900' : 'text-stone-600'}`}>{stat.label}</h3>
             </motion.div>
          ))}
       </div>
    </section>
  );
};

// 
// 
// 
// 

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/assets/images/masterbed2.jpg",
    title: " Master Bedroom",
    category: "Private Quarters",
    colSpan: "md:col-span-5" // Narrow (Left Top)
  },
  {
    id: 2,
    src: "/assets/images/guestbedroom.jpg",
    title: "Guest Bedroom",
    category: "Private Quarters",
    colSpan: "md:col-span-7" // Wide (Right Top)
  },
  {
    id: 3,
    src: "/assets/images/living4.jpg",
    title: "Living Dining",
    category: "Social Spaces",
    colSpan: "md:col-span-7" // Wide (Left Bottom)
  },
  {
    id: 4,
    src: "/assets/images/living.jpg",
    title: "Living Dining",
    category: "Social Spaces",
    colSpan: "md:col-span-5" // Narrow (Right Bottom)
  }
];

const GalleryCard = ({ item }) => (
  <div className={`relative group overflow-hidden bg-stone-200 cursor-pointer ${item.colSpan} h-[300px] md:h-[400px]`}>
    {/* Image with Zoom Effect */}
    <img 
      src={item.src} 
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
    />
    
    {/* Dark Overlay on Hover */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    
    {/* Slide-up Content Panel */}
    <div className="absolute bottom-0 left-0 w-full bg-black p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
      {/* Category: Playfair (Text) */}
      <p className="text-[10px] text-white/70 uppercase tracking-widest mb-1 font-playfair italic">
        {item.category}
      </p>
      {/* Title: Oswald (Heading) */}
      <h4 className="text-white font-oswald text-lg md:text-xl uppercase tracking-wide">
        {item.title}
      </h4>
    </div>
  </div>
);

const GallerySection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 bg-white dark:bg-[#1a1a1a] transition-colors duration-700">
      
      {/* Font Imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Decorative Background Text */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 text-[15vw] leading-none opacity-[0.03] pointer-events-none font-playfair font-bold whitespace-nowrap dark:text-white select-none">
        Gallery
      </div>
      
      {/* Section Header */}
      <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto">
         {/* Main Heading: Oswald */}
         <h2 className="font-oswald text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest mb-4 text-black dark:text-white">
           Visualize Your Future Home
         </h2>
         <div className="w-24 h-[1px] bg-stone-400 mx-auto mb-6"></div>
         {/* Body Text: Playfair */}
         <p className="font-playfair text-stone-600 dark:text-stone-300 italic text-base md:text-lg">
           A curated collection of renders showcasing the architectural brilliance of Treasure.
         </p>
      </div>

      {/* Grid Layout - Responsive Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 max-w-[1600px] mx-auto">
         {GALLERY_ITEMS.map((item) => (
           <GalleryCard key={item.id} item={item} />
         ))}
      </div>

      {/* Footer CTA */}
      

    </section>
  );
};

const BlogSection = () => {
  const posts = [
    { id: 1, category: "Design", date: "June 10, 2024", title: "WARM LUXURY", image: "/assets/images/masterbed2.jpg", excerpt: "Exploring the nuances of warm tones in modern interiors." },
    { id: 2, category: "Lifestyle", date: "June 9, 2024", title: "A GUIDE TO ELEGANCE", image: "/assets/images/living4.jpg", excerpt: "How to curate a lifestyle that reflects architectural beauty." },
    { id: 3, category: "Architecture", date: "June 8, 2024", title: "A CALM AFTERNOON", image: "/assets/images/image2.png", excerpt: "The importance of natural light in creating calming spaces." },
  ];

  return (
    <section className="relative py-24 bg-[#F5F5F0] dark:bg-[#2A0A0A] overflow-hidden transition-colors duration-700">
      
      {/* Watermark */}
      <div className="absolute top-[-20px] left-10 md:left-20 select-none pointer-events-none z-0">
        <span className="text-[6rem] sm:text-[10rem] md:text-[14rem] font-['Playfair_Display'] text-[#EBEBE6] dark:text-white/5 leading-none opacity-80">
          Blog
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-xl md:text-2xl font-['Oswald'] tracking-widest text-[#8C7B6C] dark:text-white/70 uppercase mb-2">
            Hot off the Press
          </h2>
          <div className="w-12 h-px bg-[#8C7B6C] dark:bg-white/70" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer flex flex-col gap-6">
              {/* Image Container */}
              <div className="overflow-hidden aspect-[3/4] w-full bg-stone-200 dark:bg-stone-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <div className="text-xs font-['Oswald'] font-medium text-stone-500 dark:text-white/60 uppercase tracking-wider">
                  {post.date} / <span className="text-stone-800 dark:text-white/90">{post.category}</span>
                </div>
                
                <h3 className="text-2xl font-['Oswald'] text-stone-900 dark:text-white tracking-wide group-hover:text-[#8C7B6C] dark:group-hover:text-white/70 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed line-clamp-3 font-light">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
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
    <section className="relative w-full pt-16 md:pt-24 bg-[#F9F9F7] dark:bg-[#2A0A0A] transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Image */}
        <div className="w-full h-[50vh] md:h-[90vh]">
          <img 
            src="/assets/images/living3.jpg"
            alt="Modern building exterior" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Form Container */}
        <div className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-[130%] md:-translate-y-1/2 z-10 max-w-md w-full -mt-20 md:mt-0 mx-auto px-4 md:px-0 pb-12 md:pb-0">
          <div className="bg-[#4A2521] dark:bg-[#1a0505] text-[#EBEBE6] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Character */}
              <div className="absolute -right-10 top-0 h-full w-32 opacity-5 pointer-events-none text-9xl font-['Playfair_Display'] flex items-center text-white">
                  §
              </div>

              <h2 className="font-['Oswald'] text-2xl md:text-3xl mb-8 leading-snug tracking-wide relative z-10 text-white uppercase">
                Schedule a visit or<br/> request more details
              </h2>

              <form className="space-y-8 z-10 relative">
                {formFields.map(({ name, label, type }) => (
                  <div key={name} className="relative">
                    <input 
                      type={type} 
                      id={name}
                      name={name}
                      placeholder={label}
                      className="peer block w-full bg-transparent border-b border-white/30 py-2 text-white placeholder:text-transparent focus:outline-none focus:border-white transition-colors font-['Playfair_Display']"
                    />
                    <label 
                      htmlFor={name}
                      className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-white/60 font-['Oswald']
                        transition-all duration-300 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/60
                        peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white"
                    >
                      {label}
                    </label>
                  </div>
                ))}

                <button 
                  type="submit"
                  className="group flex items-center justify-center gap-3 px-8 py-3 border border-white/50 hover:bg-[#EBEBE6] hover:text-[#4A2521] text-white transition-all duration-300 uppercase text-xs tracking-widest mt-4 font-['Oswald']"
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
    <section className="relative py-24 md:py-32 bg-[#F5F5F0] dark:bg-[#2A0A0A] overflow-hidden transition-colors duration-700">
      
      {/* Background Image with Gradient Mask */}
      <div className="absolute top-0 right-0 w-full md:w-[75%] h-full z-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <img 
          src="/assets/images/bp.png"
          alt="Building Blueprint Sketch"
          className="w-full h-full object-contain object-right p-4 md:p-1 mix-blend-multiply dark:mix-blend-lighten opacity-60 dark:opacity-40"
        />
        {/* Gradient fade to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/80 to-transparent dark:from-[#2A0A0A] dark:via-[#2A0A0A]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-12">
          
          {/* HEADING: Oswald */}
          <h2 className="text-3xl md:text-4xl font-['Oswald'] text-[#4A2521] dark:text-white uppercase tracking-widest mb-8 leading-tight">
            Prime Location at <br/> Vidhyadhar Nagar, Jaipur
          </h2>
          
          <div className="w-12 h-px bg-[#4A2521]/40 dark:bg-white/40 mb-8" />

          {/* BODY: Playfair Display */}
          <p className="font-['Playfair_Display'] text-stone-600 dark:text-white/80 leading-relaxed mb-8 text-lg lg:text-xl font-light">
            Perfectly situated in one of Jaipur’s most calm residential zones, nested near the Aravallis. Treasure offers easy connectivity to schools, hospitals, markets, restaurants, and transport hubs.
          </p>

          {/* BUTTON: Oswald */}
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3 border border-stone-400 dark:border-white/50 text-stone-700 dark:text-white hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors uppercase text-xs tracking-widest bg-white/50 dark:bg-black/50 backdrop-blur-sm font-['Oswald']"
          >
            <MapPin size={14} />
            View on map
          </Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-[#2C1A16] text-[#EBEBE6] relative font-sans border-t border-white/10">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img 
          src="/assets/images/dpattern.jpg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A16]/95 to-[#1A0B09]/98 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">About</h3>
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-light max-w-xs">
              This is property showcase done in a clean and
contemporary manner. We built Treasure to provide you with a trouble-free website setup and managing, and to let you have fun along the way.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-light">
              <li className="flex items-center gap-3"><Phone size={14} className="text-white/40" /><span>+91 73782 55255</span></li>
              <li className="flex items-center gap-3"><Mail size={14} className="text-white/40" /><span>katewacompanies@gmail.com</span></li>
              <li className="flex items-start gap-3"><MapPin size={14} className="text-white/40 mt-1" /><span>Sector-5, Vidhyadhar Nagar, Jaipur</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Links</h3>
            <ul className="space-y-2 text-sm text-[#EBEBE6]/60 font-light">
              <li><Link to="/about" className="flex items-center gap-2 hover:text-white transition-colors group"><span>About us</span></Link></li>
              <li><Link to="/services" className="flex items-center gap-2 hover:text-white transition-colors group"><span>Services</span></Link></li>
              <li><Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors group"><span>Contact us</span></Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">Newsletter</h3>
            <div className="space-y-3">
              <div className="relative border-b border-[#EBEBE6]/20">
                <Mail size={14} className="absolute left-0 top-2.5 text-white/40" />
                <input type="email" placeholder="Email Address" className="w-full bg-transparent py-2 pl-6 text-sm focus:outline-none placeholder:text-[#EBEBE6]/30 text-white" />
              </div>
              <button className="w-full py-2 border border-[#EBEBE6]/20 text-xs uppercase tracking-widest hover:bg-[#EBEBE6] hover:text-[#2C1A16] transition-colors font-oswald">Subscribe</button>
            </div>
            <div className="flex gap-3 pt-2">
               <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300"><Facebook size={14} /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300"><Linkedin size={14} /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300"><Twitter size={14} /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-[#1A0B09] flex items-center justify-center text-white/70 hover:bg-white hover:text-[#4A2521] transition-all duration-300"><Youtube size={14} /></a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-[#1A0B09] py-4 border-t border-[#EBEBE6]/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <img src="/assets/images/logo.png" alt="Treasure" className="h-6 w-auto object-contain brightness-0 invert opacity-70" />
             <span className="text-xs text-[#EBEBE6]/30 uppercase tracking-wider">© 2025 Treasure</span>
          </div>
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