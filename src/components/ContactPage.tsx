import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Mail, MapPin, Menu, X, Sun, Moon, Home, 
  Facebook, Twitter, Linkedin, Youtube, ArrowRight, Phone, User, Settings, PenTool 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

// --- CONFIGURATION: LOCAL ASSETS ---
const LOCAL_ASSETS = {
  logo: "/assets/images/logo.png",
  footerPattern: "/assets/images/dpattern.jpg",
  building: "/assets/images/vdn2.jpg" 
};

// --- SHARED COMPONENTS ---

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
            className={`fixed top-0 left-0 h-full w-full md:w-1/4 z-[70] shadow-2xl flex flex-col border-r backdrop-blur-md transition-colors duration-500 ${
              isDark ? 'bg-[#2A0A0A]/95 border-[#4A2521]' : 'bg-[#F9F9F7]/95 border-stone-200'
            }`}
          >
            <div className={`flex justify-between items-center p-8 border-b ${isDark ? 'border-[#4A2521]' : 'border-stone-200'}`}>
                <div className="flex flex-col">
                    <span className={`text-3xl font-serif font-bold tracking-widest ${isDark ? 'text-[#D4AF37]' : 'text-stone-800'}`}>TREASURE</span>
                    <span className={`text-[10px] tracking-[0.3em] uppercase ${isDark ? 'text-[#D4AF37]/60' : 'text-stone-500'}`}>Menu</span>
                </div>
                <button 
                  onClick={onClose} 
                  className={`p-2 rounded-full border transition-colors group ${isDark ? 'border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-stone-300 hover:bg-stone-200 text-stone-800'}`}
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12 space-y-6">
                {MENU_ITEMS.map(item => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      onClick={onClose} 
                      className={`group flex items-center justify-between text-2xl md:text-3xl font-serif transition-colors ${isDark ? 'text-[#EBEBE6]/60 hover:text-[#D4AF37]' : 'text-stone-400 hover:text-stone-800'}`}
                    >
                        {item.label} 
                        <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#D4AF37]" size={24} />
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
    <aside className={`fixed top-0 left-0 h-screen w-24 z-50 flex flex-col justify-between items-center border-r shadow-sm transition-colors duration-500 ${isDark ? 'bg-[#2A0A0A] border-[#4A2521]' : 'bg-white border-gray-100'}`}>
      
      {/* Top: Menu, Toggle, Logo */}
      <div className="flex flex-col items-center w-full pt-8 gap-10">
        <button onClick={onOpenMenu} aria-label="Open Menu" className="group p-2">
            <div className="space-y-1.5">
                <span className={`block w-8 h-0.5 group-hover:w-6 transition-all duration-300 ${isDark ? 'bg-[#D4AF37]' : 'bg-gray-800'}`}></span>
                <span className={`block w-5 h-0.5 group-hover:w-8 transition-all duration-300 ${isDark ? 'bg-[#D4AF37]' : 'bg-gray-800'}`}></span>
            </div>
        </button>
        
        

        <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
            <img 
              src={LOCAL_ASSETS.logo} 
              alt="Treasure Logo" 
              className="w-12 h-auto object-contain" 
            />
        </Link>
      </div>

      {/* Bottom: Enquiry */}
      <div className="w-full flex flex-col items-center">
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

// --- MAIN PAGE COMPONENT ---

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme(); // Destructure toggleTheme

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen w-full font-sans overflow-x-hidden relative transition-colors duration-700 ease-in-out ${
      isDark ? 'bg-[#2A0A0A] text-[#D4AF37]' : 'bg-[#EEF2F3] text-[#4A3B32]'
    }`}>
      
      <NavigationSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <FixedSidebar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Main Wrapper (pl-24 for sidebar) */}
      <main className="relative w-full pl-24">
        
        {/* --- UPDATED HEADER --- */}
        {/* Replaced Back Link with Theme Toggle */}
        <header className="absolute top-0 left-0 w-full z-20 pl-36 pr-12 py-6 flex justify-end items-center pointer-events-none">
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Dark Mode" 
            className={`pointer-events-auto p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm ${
              isDark 
                ? 'bg-black/40 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/20' 
                : 'bg-white border-gray-300 text-[#4A3B32] hover:bg-white/30'
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
      
        {/* --- Header & Map Section --- */}
        <section className="relative w-full flex flex-col">
            
            {/* Title Section */}
            <div className={`px-8 pt-6 pb-8 md:px-16 flex justify-between items-end transition-colors duration-500 ${
                isDark ? 'bg-[#2A0A0A]' : 'bg-[#EEF2F3]'
            }`}>
                <div>
                    <h2 className={`text-sm font-medium uppercase tracking-wide mb-1 opacity-80 ${
                        isDark ? 'text-[#D4AF37]/80' : 'text-[#4A3B32]/80'
                    }`}>Contact form</h2>
                    <h1 className={`text-4xl md:text-5xl font-serif font-bold tracking-tight ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#4A3B32]'
                    }`}>
                        GET IN TOUCH
                    </h1>
                </div>
            </div>

            {/* Map Container */}
            <div className="w-full h-[400px] md:h-[500px] relative bg-gray-200 overflow-hidden group border-y border-white/10">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d75.65046970685324!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1684489245621!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: isDark ? 'grayscale(100%) invert(90%) contrast(0.8)' : 'grayscale(100%) contrast(1.1) opacity(0.85)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
                className="transition-all duration-700 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
            ></iframe>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="bg-[#4A3B32] text-white p-3 rounded-full shadow-xl animate-bounce">
                    <MapPin size={32} fill="currentColor" />
                </div>
            </div>
            </div>
        </section>

        {/* --- Split Content Section (Contact Form) --- */}
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            {/* Left: Building Image */}
            <div className="w-full lg:w-1/2">
                <div className={`border p-2 inline-block w-full transition-colors duration-500 ${
                    isDark ? 'border-[#D4AF37]' : 'border-[#4A3B32]'
                }`}>
                <img 
                    src={LOCAL_ASSETS.building}
                    alt="Modern Apartment Building" 
                    className="w-full h-[400px] md:h-[600px] object-cover shadow-lg filter sepia-[0.2]"
                />
                </div>
            </div>

            {/* Right: Form Section */}
            <div className="w-full lg:w-1/2 relative pt-8 lg:pt-0">
                
                {/* Background Watermark */}
                <div className="absolute -top-10 right-0 select-none pointer-events-none overflow-hidden z-0">
                <span className={`text-[120px] md:text-[180px] font-serif leading-none transition-opacity duration-500 ${
                    isDark ? 'text-[#D4AF37] opacity-10' : 'text-[#E3E8EA] opacity-60'
                }`}>
                    hello
                </span>
                </div>

                <div className="relative z-10">
                <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 tracking-tight transition-colors duration-500 ${
                    isDark ? 'text-[#D4AF37]' : 'text-[#4A3B32]'
                }`}>
                    GET IN TOUCH
                </h2>
                
                <div className={`w-12 h-0.5 mb-6 transition-colors duration-500 ${
                    isDark ? 'bg-[#D4AF37]' : 'bg-[#4A3B32]'
                }`}></div>

                <p className={`mb-12 max-w-md leading-relaxed transition-colors duration-500 ${
                    isDark ? 'text-[#EBEBE6]/70' : 'text-gray-600'
                }`}>
                    Share a few details about your project, and our team will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-10 max-w-md">
                    
                    <div className="group">
                    <label htmlFor="email" className={`block text-sm font-semibold mb-1 transition-colors duration-500 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#4A3B32]'
                    }`}>
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b py-2 outline-none transition-colors duration-300 ${
                            isDark 
                                ? 'border-[#4A2521] focus:border-[#D4AF37] text-[#EBEBE6]' 
                                : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                        }`}
                    />
                    </div>

                    <div className="group">
                    <label htmlFor="phone" className={`block text-sm font-semibold mb-1 transition-colors duration-500 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#4A3B32]'
                    }`}>
                        Phone*
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b py-2 outline-none transition-colors duration-300 ${
                            isDark 
                                ? 'border-[#4A2521] focus:border-[#D4AF37] text-[#EBEBE6]' 
                                : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                        }`}
                    />
                    </div>

                    <div className="group">
                    <label htmlFor="message" className={`block text-sm font-semibold mb-1 transition-colors duration-500 ${
                        isDark ? 'text-[#D4AF37]' : 'text-[#4A3B32]'
                    }`}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={1}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b py-2 outline-none resize-none transition-colors duration-300 min-h-[40px] ${
                            isDark 
                                ? 'border-[#4A2521] focus:border-[#D4AF37] text-[#EBEBE6]' 
                                : 'border-gray-300 focus:border-[#4A3B32] text-[#4A3B32]'
                        }`}
                    />
                    </div>

                    <button 
                    type="submit" 
                    className={`mt-8 flex items-center justify-center px-8 py-4 border text-sm font-medium transition-all duration-300 shadow-sm ${
                        isDark 
                            ? 'bg-[#4A2521] border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#2A0A0A] text-[#EBEBE6]' 
                            : 'bg-[#F5F7F8] border-gray-200 hover:border-[#4A3B32] hover:bg-white text-[#4A3B32]'
                    }`}
                    >
                    <Mail className={`w-4 h-4 mr-3 ${
                        isDark ? 'text-[#D4AF37]' : 'text-gray-400'
                    }`} />
                    Send Us A Message
                    </button>

                </form>
                </div>
            </div>

            </div>
        </section>

        <Footer />
        
      </main>
    </div>
  );
};

export default ContactPage;