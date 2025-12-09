import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Preloader from './components/UI/Preloader';
import Noise from './components/UI/Noise';
import FloatingFlowers from './components/UI/FloatingFlowers';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="app">
      <FloatingFlowers />
      <Noise />
      <AnimatePresence mode='wait'>
        {loading ? (
          <Preloader key="preloader" setLoading={setLoading} />
        ) : (
          <>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
