import React, { useState } from 'react';
import { 
  Menu, ChevronLeft, ArrowUpRight, Sun, Moon, X, 
  Mail, Facebook, Twitter, Linkedin, Youtube, 
  Phone, MapPin, User, Settings, PenTool, ArrowRight 
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// --- DATASETS ---

const treasureData = [
  { id: 1, title: "GUEST BEDROOM", subtitle: "Treasure", src: "/assets/images/guestbedroom.jpg" },
  { id: 2, title: "MASTER BEDROOM", subtitle: "Treasure", src: "/assets/images/masterbed2.jpg" },
  { id: 3, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/living.jpg" },
  { id: 4, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/living3.jpg" },
  { id: 5, title: "DAUGHTER'S ROOM", subtitle: "Treasure", src: "/assets/images/daughtersroom.jpg" },
  { id: 6, title: "LIVING DINING", subtitle: "Treasure", src: "/assets/images/living4.jpg" },
];

const limitedData = [
  { id: 7, title: "PENTHOUSE SUITE", subtitle: "Limited Edition", src: "/assets/images/masterbed3.jpg" },
  { id: 8, title: "PRIVATE LOUNGE", subtitle: "Limited Edition", src: "/assets/images/living2.jpg" },
  { id: 9, title: "SKY TERRACE", subtitle: "Limited Edition", src: "/assets/images/daughtersroom1.jpg" },
  { id: 10, title: "MASTER BATH", subtitle: "Limited Edition", src: "/assets/images/living5.jpg" },
  { id: 11, title: "WALK-IN CLOSET", subtitle: "Limited Edition", src: "/assets/images/son.jpg" },
  { id: 12, title: "GRAND FOYER", subtitle: "Limited Edition", src: "/assets/images/a.jpg" },
];

// --- INTERNAL COMPONENTS ---

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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" 
          />
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.5 }} 
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
                {/* Close button updated to white */}
                <button onClick={onClose} className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-white/30 hover:bg-white/10 text-white' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}>
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    // Menu items hover state updated to white
                    <Link key={item.label} to={item.href} onClick={onClose} className={`group flex items-center justify-between text-xl md:text-3xl font-serif transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-white' : 'text-stone-400 hover:text-stone-800'}`}>
                        {item.label} 
                        {/* Arrow updated to white */}
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

// --- MAIN PROJECTS COMPONENT ---

const Projects = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // STATE for Active Project (Default: 'TREASURE')
  const [activeProject, setActiveProject] = useState<'TREASURE' | 'LIMITED'>('TREASURE');
  
  // STATE for Lightbox Image
  const [expandedImageSrc, setExpandedImageSrc] = useState<string | null>(null);

  // Determine which images to show
  const currentImages = activeProject === 'TREASURE' ? treasureData : limitedData;

  return (
    // Updated Main Theme color to white
    <div className={`min-h-screen w-full font-sans overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
      isDark ? 'bg-[#2A0A0A] text-white' : 'bg-[#F2F5F5] text-[#4A342B]'
    }`}>
      
      <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FixedSidebar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {expandedImageSrc && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setExpandedImageSrc(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button onClick={() => setExpandedImageSrc(null)} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-[110] bg-black/20 rounded-full">
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={expandedImageSrc}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <main className="relative w-full pl-0 md:pl-24">
        
        {/* --- MOBILE HEADER --- */}
        <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-white/10">
             <div className="flex items-center gap-4">
                 {/* Mobile Menu Icon Color */}
                 <button onClick={() => setIsMenuOpen(true)} className={`p-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    <Menu size={24} />
                 </button>
                 <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
             </div>
             {/* Mobile Theme Toggle */}
             <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full border transition-all duration-300 ${
                    isDark ? 'border-white text-white' : 'border-gray-300 text-gray-600'
                }`}
             >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
        </div>

        {/* 1. PAGE HEADER */}
        <div className="px-6 md:px-12 pt-8 md:pt-12 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="mb-2 md:mb-0">
                <span className={`block text-[10px] font-bold tracking-[0.2em] uppercase mb-1 ${isDark ? 'text-[#EBEBE6]/60' : 'text-gray-500'}`}>Our Projects</span>
                <h1 className="text-2xl md:text-4xl font-serif tracking-widest uppercase">Property Standard List</h1>
            </div>
            
            {/* Desktop Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle Dark Mode" 
              className={`hidden md:block p-3 rounded-full border transition-all duration-300 ${
                isDark 
                  ? 'border-white text-white hover:bg-white/10' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>

        {/* 2. HERO */}
        <div className="px-6 md:px-12 mb-16 md:mb-24">
            <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden shadow-lg">
                <img src="/assets/images/son2.jpg" alt="Luxury Bedroom Interior" className="w-full h-full object-cover" />
                <div className="absolute bottom-8 left-6 md:bottom-20 md:left-16 max-w-2xl pr-4">
                    <div className="w-12 h-0.5 bg-white mb-4 md:mb-6" />
                    <p className="text-white font-serif text-xl md:text-3xl leading-snug drop-shadow-md">
                        We craft environments that blend modern elegance with functional clarity — spaces designed to be lived in, felt, and remembered.
                    </p>
                </div>
            </div>
        </div>

        {/* 3. RESIDENTIALS BANNERS */}
        <div className="px-6 md:px-12 mb-16 md:mb-24">
            <div className="text-center mb-8 md:mb-10">
                {/* Updated header color */}
                <h3 className={`text-xs font-bold tracking-[0.25em] uppercase ${isDark ? 'text-white' : 'text-[#8C7B6C]'}`}>Residentials</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banner 1 */}
                <div 
                    onClick={() => setActiveProject('TREASURE')}
                    className={`group relative h-[180px] md:h-[260px] overflow-hidden border-4 cursor-pointer transition-all duration-300 ${
                        activeProject === 'TREASURE' 
                        ? (isDark ? 'border-white scale-[1.02]' : 'border-[#4A342B] scale-[1.02]') 
                        : 'border-white dark:border-[#2A0A0A] opacity-70 hover:opacity-100'
                    } shadow-xl`}
                >
                    <img src="/assets/images/vdn3.jpg" alt="Treasure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold tracking-[0.15em] uppercase text-xl md:text-2xl drop-shadow-lg">Treasure</span>
                    </div>
                </div>

                {/* Banner 2 */}
                <div 
                    onClick={() => setActiveProject('LIMITED')}
                    className={`group relative h-[180px] md:h-[260px] overflow-hidden border-4 cursor-pointer transition-all duration-300 ${
                        activeProject === 'LIMITED' 
                        ? (isDark ? 'border-white scale-[1.02]' : 'border-[#4A342B] scale-[1.02]') 
                        : 'border-white dark:border-[#2A0A0A] opacity-70 hover:opacity-100'
                    } shadow-xl`}
                >
                    <img src="/assets/images/aptnght.jpg" alt="Treasure Limited" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold tracking-[0.15em] uppercase text-xl md:text-2xl drop-shadow-lg">Treasure - Limited Edition</span>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. PROJECT GRID */}
        <div className="px-6 md:px-12 pb-16 md:pb-24">
            <motion.div 
                key={activeProject} // Triggers animation when state changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12"
            >
                {currentImages.map((item) => (
                    <div key={item.id} className="group cursor-pointer" onClick={() => setExpandedImageSrc(item.src)}>
                        {/* Image Wrapper - Updated Border Color */}
                        <div className={`border p-1 mb-4 transition-colors duration-500 ${isDark ? 'border-white/30' : 'border-[#8C7B6C]'}`}>
                            <div className="overflow-hidden h-[250px] md:h-[300px]">
                                <img 
                                    src={item.src} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        {/* Text Info */}
                        <div>
                            <h4 className={`font-bold tracking-[0.1em] uppercase text-sm mb-1 transition-colors ${isDark ? 'text-[#EBEBE6]' : 'text-[#4A342B]'}`}>
                                {item.title}
                            </h4>
                            {/* Updated Subtitle Color */}
                            <p className={`text-xs font-serif italic ${isDark ? 'text-white/70' : 'text-[#8C7B6C]'}`}>
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
            
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Projects;