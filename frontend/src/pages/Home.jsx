import React, { useState } from 'react';
import IntroLoader from '../components/IntroLoader';
import ThreeCanvas from '../components/ThreeCanvas';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Skills from '../components/Skills';
import SocialProfiles from '../components/SocialProfiles';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AiChatWidget from '../components/AiChatWidget';
import { sound } from '../utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = () => {
    const mutedState = sound.toggleMute();
    setIsMuted(mutedState);
    if (!mutedState) {
      sound.playClick();
    }
  };

  return (
    <div style={{ backgroundColor: '#050508', color: '#ffffff', minHeight: '100vh', position: 'relative' }}>
      
      {/* Magnetic Glow Cursor */}
      <CustomCursor />

      {/* 1. Particle Entry Sequence (Plays exactly once) */}
      {!isIntroDone && <IntroLoader onComplete={() => setIsIntroDone(true)} />}

      {/* 2. Interactive WebGL 3D Canvas */}
      <ThreeCanvas isIntroDone={isIntroDone} />

      {/* 3. Floating Glass Navigation */}
      <Navbar />

      {/* Web Audio Synthesizer Mute/Unmute Widget (Positioned at bottom-left) */}
      <button
        onClick={toggleAudio}
        title={isMuted ? 'Unmute UI Audio' : 'Mute UI Audio'}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 100,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(5, 5, 8, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          transition: 'all 0.2s ease'
        }}
      >
        {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} color="#60a5fa" />}
      </button>

      {/* 4. Main Portfolio Content Sections */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Skills />
        <SocialProfiles />
        <Contact />
      </main>

      {/* 5. Floating Dynamic AI Chat Space Widget */}
      <AiChatWidget />

      {/* 6. Minimal Luxury Footer */}
      <Footer />
      
    </div>
  );
}
