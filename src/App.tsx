import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from './components/ThemeContext';

import LandingPage from './components/LandingPage';
import AboutUsPage from './components/AboutUs';
import OurServicesPage from './components/OurServices';
import OurProjectsPage from './components/OurProjects';
import ContactPage from './components/ContactPage';
import Layout from './components/Layout';
import Projects from './components/Projects';
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />  
        {/* ROUTES */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<OurServicesPage />} />
            <Route path="/projects" element={<OurProjectsPage />} />
            <Route path="/projects/treasure" element={<Projects />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>

        {/* WHATSAPP BUTTON - OUTSIDE ROUTES */}
        <WhatsAppButton />

      </Router>
    </ThemeProvider>
  );
};

export default App;
