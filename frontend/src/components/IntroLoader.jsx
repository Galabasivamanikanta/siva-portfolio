import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1800);
    const timer2 = setTimeout(() => {
      setStep(3);
      if (onComplete) onComplete();
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (step === 3) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="intro-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#050508',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Glow Ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Step 1: WELCOME */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.8em' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              fontFamily: 'Outfit, sans-serif',
              textTransform: 'uppercase',
              textShadow: '0 0 30px rgba(255,255,255,0.5)'
            }}
          >
            WELCOME
          </motion.div>
        )}

        {/* Step 2: Welcome To Galaba Sivamanikanta's Portfolio */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', padding: '0 2rem' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.1rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '0.8rem'
              }}
            >
              Portfolio Of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}
            >
              Galaba Sivamanikanta's Portfolio
            </motion.h1>
          </motion.div>
        )}

        {/* Loading Bar Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '99px',
            overflow: 'hidden'
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.8, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #ffffff)',
              boxShadow: '0 0 10px #60a5fa'
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
