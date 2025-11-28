import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, X, Sun, Moon, Phone, MapPin, User, Settings, PenTool, 
  ArrowRight, Mail, Facebook, Twitter, Linkedin, Youtube, Play, Menu 
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// --- DATA ---
const services = [
  {
    id: "01",
    title: "ARCHITECTURE & SPACE PLANNING",
    description: "We develop spatial frameworks that balance function and elegance — ensuring every square foot works seamlessly and looks timeless."
  },
  {
    id: "02",
    title: "INTERIOR DESIGN & MATERIAL SELECTION",
    description: "From textures to tones, we curate environments with high-quality materials, refined palettes, and tailored interior compositions."
  },
  {
    id: "03",
    title: "PROJECT MANAGEMENT & EXECUTION",
    description: "Our team ensures precision from concept to completion — coordinating craftsmen, vendors, and timelines for flawless project execution."
  }
];

const galleryImages = [
  { src: "/assets/images/daughtersroom1.jpg", alt: "Modern Interior Kitchen Detail" },
  { src: "/assets/images/living3.jpg", alt: "Unique Architectural Balconies" },
  { src: "/assets/images/image2.png", alt: "Textured Interior Wall Feature" },
  { src: "/assets/images/living.jpg", alt: "Exterior Apartment Building at Dusk" }
];

const testimonials = [
  {
    id: 1,
    quote: "Working with the team was seamless from day one. Their clarity, precision, and refined design approach elevated our entire project.",
    author: "Aarti Sharma",
    role: "CEO",
    image: "/assets/images/person2.png"
  },
  {
    id: 2,
    quote: "They transformed our vision into a reality that exceeded our expectations. The attention to material detail was unparalleled.",
    author: "Sanjay Mehta",
    role: "Property Developer",
    image: "/assets/images/person.png"
  },
  {
    id: 3,
    quote: "The project management was flawless. They coordinated complex vendor schedules perfectly, delivering on time without compromising quality.",
    author: "Rukmani Sinha",
    role: "Managing Director, Horizon Stay",
    image: "/assets/images/person3.png"
  }
];

// --- SIDEBAR COMPONENTS ---

const NavigationSidebar = React.memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { isDark } = useTheme();
  
  const MENU_ITEMS = [
    { label: 'Home', href: '/' }, 
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ type: 'tween', duration: 0.5 }} 
            className={`fixed top-0 left-0 h-full w-[85%] md:w-1/4 z-[70] shadow-2xl flex flex-col border-r backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'bg-[#2A0A0A]/95 border-[#4A2521]' : 'bg-[#F9F9F7]/95 border-stone-200'
            }`}
          >
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                    {/* Changed gold to white */}
                    <span className={`text-2xl md:text-3xl font-serif font-bold tracking-widest ${isDark ? 'text-white' : 'text-stone-800'}`}>TREASURE</span>
                    <span className={`text-[10px] tracking-[0.3em] uppercase ${isDark ? 'text-white/60' : 'text-stone-500'}`}>Menu</span>
                </div>
                {/* Updated close button colors */}
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-white/30 hover:bg-white/10 text-white' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      onClick={onClose} 
                      // Updated link text colors and hover states
                      className={`group flex items-center justify-between text-xl md:text-3xl font-serif transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`}
                    >
                        {item.label} 
                        {/* Updated Arrow icon color */}
                        <ArrowRight className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${isDark ? 'text-white' : 'text-[#D4AF37]'}`} size={20} />
                    </Link>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

const FixedSidebar = React.memo(({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-24 z-50 flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] border-[#4A2521]' : 'bg-white border-gray-100'}`}>
      
      {/* Top: Menu & Theme Toggle */}
      <div className="flex flex-col items-center w-full pt-8 gap-10">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
            <div className="space-y-1.5">
                {/* Updated menu icon lines to white */}
                <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
                <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-800'}`}></span>
            </div>
        </button>
        
        {/* Updated toggle button colors */}
        

        <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src="/assets/images/logo.png" 
              alt="Treasure Logo" 
              className="w-12 h-auto object-contain" 
            />
        </Link>
      </div>
      
      <div className="w-full flex flex-col items-center">
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
              <span className="text-xs font-bold tracking-[0.25em] uppercase [writing-mode:vertical-lr] rotate-180">Make an Enquiry</span>
          </Link>
      </div>
    </aside>
  );
});

// --- SUB-COMPONENTS ---

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* COLUMN 1: ABOUT */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest font-oswald text-white">About</h3>
            <p className="text-sm text-[#EBEBE6]/60 leading-relaxed font-light max-w-xs">
             This is property showcase done in a clean and
contemporary manner. We built Treasure to provide you with a trouble-free website setup and managing, and to let you have fun along the way.
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
                <span className="break-all">katewacompanies@gmail.com</span>
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

          <div className="flex gap-6 text-xs text-[#EBEBE6]/40">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

const TestimonialsSlider = () => {
  const { isDark } = useTheme();
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[activeTestimonialIndex];

  return (
    // Updated border colors
    <div className={`mt-16 relative py-12 border-t min-h-[400px] transition-colors duration-500 ${isDark ? 'border-white/20' : 'border-gray-200/50'}`}>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">
          <div className="flex-1 relative w-full">
              <AnimatePresence mode='wait'>
                  <motion.div 
                    key={activeTestimonialIndex} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.6, ease: "easeInOut" }} 
                    className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
                  >
                      <div className="flex-shrink-0">
                        <img 
                          src={currentTestimonial.image} 
                          alt={currentTestimonial.author} 
                          className="w-24 h-24 md:w-32 md:h-32 object-cover grayscale-[30%]" 
                          loading="lazy" 
                          decoding="async" 
                        />
                      </div>
                      <div className="max-w-2xl text-center md:text-left z-10">
                          {/* Updated text colors */}
                          <p className={`font-serif text-xl md:text-3xl leading-tight mb-8 transition-colors duration-500 ${isDark ? 'text-[#EBEBE6]' : 'text-[#4A3B32]'}`}>"{currentTestimonial.quote}"</p>
                          <div>
                          <h4 className={`font-bold tracking-[0.15em] uppercase text-sm transition-colors duration-500 ${isDark ? 'text-white' : 'text-[#5D4037]'}`}>{currentTestimonial.author}</h4>
                          <p className={`text-xs tracking-wider uppercase mt-1 transition-colors duration-500 ${isDark ? 'text-[#EBEBE6]/60' : 'text-gray-500'}`}>{currentTestimonial.role}</p>
                          </div>
                      </div>
                  </motion.div>
              </AnimatePresence>
          </div>
          <div className="hidden md:flex gap-4 h-full pt-4">
               {/* Updated vertical line color */}
               <div className={`w-[1px] h-32 transition-colors duration-500 ${isDark ? 'bg-white/30' : 'bg-[#DCCFC5]'}`}></div>
                <div className={`flex flex-col gap-2 font-serif text-sm leading-none transition-colors duration-500 ${isDark ? 'text-white/30' : 'text-[#DCCFC5]'}`}>
                    {testimonials.map((_, index) => (
                        // Updated active state color
                        <span key={index} className={`transition-colors duration-500 ${index === activeTestimonialIndex ? (isDark ? 'text-white font-bold' : 'text-[#5D4037] font-bold') : ''}`}>0{index + 1}</span>
                    ))}
                </div>
          </div>
      </div>
    </div>
  );
};

const GalleryItem = React.memo(({ image, isDark, onClick }: { image: any, isDark: boolean, onClick: () => void }) => (
  <div className="h-full w-full cursor-pointer group overflow-hidden" onClick={onClick}>
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full h-[300px] md:h-[450px] object-cover block transition-transform duration-700 group-hover:scale-105" 
        loading="lazy" 
        decoding="async"
        style={{ contentVisibility: 'auto' }} 
      />
  </div>
));

// --- MAIN PAGE COMPONENT ---

const OurServicesPage = () => {
  const { isDark, toggleTheme } = useTheme(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedImageSrc, setExpandedImageSrc] = useState<string | null>(null);

  const bgShapeClass = `absolute bottom-0 left-0 w-[40%] h-[40%] transform -skew-x-12 -translate-x-20 translate-y-20 z-0 pointer-events-none transition-colors duration-700 will-change-transform ${isDark ? 'bg-[#4A2521] opacity-10' : 'bg-white opacity-50'}`;

  return (
    // Updated Main Theme color
    <div className={`min-h-screen w-full font-sans relative transition-colors duration-700 ease-in-out ${isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F9F9F7] text-[#4A3B32]'}`}>
      <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FixedSidebar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {expandedImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImageSrc(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button
              onClick={() => setExpandedImageSrc(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-[110] bg-black/20 rounded-full"
            >
              <X size={32} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={expandedImageSrc}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full pl-0 md:pl-24 overflow-hidden">
        <div className={bgShapeClass} />
        
        {/* --- MOBILE HEADER --- */}
        <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-white/10 z-50 relative">
             <div className="flex items-center gap-4">
                 {/* Updated menu button color */}
                 <button onClick={() => setIsMenuOpen(true)} className={`p-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    <Menu size={24} />
                 </button>
                 <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
             </div>
             {/* Updated mobile theme toggle */}
             <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full border transition-all duration-300 ${
                    isDark ? 'border-white text-white' : 'border-gray-300 text-gray-600'
                }`}
             >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
        </div>

        {/* --- DESKTOP HEADER (Theme Toggle Only) --- */}
        <header className="hidden md:flex absolute top-0 left-0 w-full z-20 pl-36 pr-12 py-6 justify-end items-center">
          {/* Updated desktop theme toggle to be white in dark mode */}
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Dark Mode" 
            className={`p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
              isDark 
                ? 'bg-black/40 border-white text-white hover:bg-white/20' 
                : 'bg-white/20 border-white text-white hover:bg-white/30'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[500px] overflow-hidden group mb-12">
          <img 
            src="/assets/images/vdn.jpg" 
            alt="Services" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 will-change-transform" 
            decoding="async" 
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end items-start text-left text-white px-6 md:px-16 pb-12 md:pb-16">
            <h2 className="font-oswald text-4xl md:text-6xl mb-4">Our Services</h2>
            <div className="w-12 h-[1px] bg-white/80 mb-6"></div>
            <p className="max-w-lg text-base md:text-xl font-playfair leading-relaxed tracking-wide text-white/90">
                Crafted solutions shaped by precision and purpose.
            </p>
          </div>
        </div>

        {/* Top Content Container */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 md:pb-24">
                {services.map(service => (
                    <div key={service.id} className="relative mt-10 md:mt-0 group">
                        <div className="absolute -top-14 -left-2 select-none z-0 pointer-events-none will-change-transform">
                            {/* Changed background number color */}
                            <span className={`font-serif text-[100px] md:text-[120px] leading-none opacity-60 transition-colors duration-500 ${isDark ? 'text-white/10' : 'text-[#DCCFC5]'}`}>{service.id}</span>
                        </div>
                        <div className="relative z-10 pt-20 pl-4">
                            {/* Updated service title color */}
                            <h3 className={`font-bold font-oswald tracking-[0.15em] uppercase text-sm md:text-base mb-6 leading-relaxed max-w-[80%] transition-colors duration-500 ${isDark ? 'text-white' : 'text-[#5D4037]'}`}>{service.title}</h3>
                            <p className={`text-sm leading-relaxed font-playfair max-w-xs transition-colors duration-500 ${isDark ? 'text-[#EBEBE6]/70' : 'text-gray-600'}`}>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center pb-24">
                <div className="relative">
                    {/* Updated image border */}
                    <div className={`border p-1 transition-colors duration-500 ${isDark ? 'border-white' : 'border-[#5D4037]'}`}>
                    <img 
                        src="/assets/images/living3.jpg"
                        alt="Interior" 
                        className="w-full h-[300px] md:h-[500px] object-cover" 
                        loading="lazy" 
                        decoding="async" 
                    />
                    </div>
                </div>
                <div className="flex flex-col justify-center pl-2 md:pl-8">
                    {/* Updated section title color */}
                    <h2 className={`text-2xl md:text-4xl font-semibold font-oswald tracking-widest uppercase mb-6 leading-tight transition-colors duration-500 ${isDark ? 'text-white' : 'text-[#5D4037]'}`}>Material & Brands <br /> </h2>
                    {/* Updated divider line color */}
                    <div className={`w-12 h-[2px] mb-8 transition-colors duration-500 ${isDark ? 'bg-white/50' : 'bg-[#DCCFC5]'}`}></div>
                    <p className={`text-base md:text-lg font-playfair leading-relaxed mb-10 max-w-md transition-colors duration-500 ${isDark ? 'text-[#EBEBE6]/80' : 'text-gray-600'}`}>Materials shape a home’s soul. We choose them the way curators choose art, for truth, texture, and reliability.
From Jaquar and Kohler fittings to Kajaria stone, Saint-Gobain glass, Asian Paints, Havells, and UltraTech, each brand reflects our commitment to quality.
Every surface tells a story of intention.Every choice is made to ensure that your home feels as good as it looks, years after it is built.</p>
                    <div>
                    {/* Updated CTA Button styles */}
                    <button className={`group flex items-center gap-4 px-8 py-4 border bg-transparent transition-all duration-300 ${isDark ? 'border-white/50 hover:border-white hover:bg-white/10' : 'border-gray-300 hover:border-[#5D4037] hover:bg-white'}`}>
                        <span className={`font-serif italic text-lg transition-colors duration-300 ${isDark ? 'text-[#EBEBE6]/60 group-hover:text-white' : 'text-gray-400 group-hover:text-[#5D4037]'}`}>i</span>
                        <span className={`uppercase tracking-widest text-xs font-medium transition-colors duration-300 ${isDark ? 'text-[#EBEBE6] group-hover:text-white' : 'text-gray-600 group-hover:text-[#5D4037]'}`}>Send Us a Message</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>

        {/* FULL WIDTH GALLERY SECTION */}
        <div className="w-full mt-0 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {galleryImages.map((image, index) => (
                    <GalleryItem key={index} image={image} isDark={isDark} onClick={() => setExpandedImageSrc(image.src)} />
                ))}
            </div>
        </div>

        {/* Bottom Content Container */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
            <TestimonialsSlider />
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default OurServicesPage;