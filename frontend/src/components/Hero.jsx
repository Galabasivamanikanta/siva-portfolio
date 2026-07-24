import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { Download, ArrowRight, Mail, Sparkles, Bot, Code, Terminal, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Hero() {
  const [activeDot, setActiveDot] = useState(0);

  const orbitalDetails = [
    {
      title: '1 Full-Stack MERN Project',
      subtitle: 'DiagnoLabs Healthcare Engine',
      desc: 'Architected DiagnoLabs with Node, Express, MongoDB Atlas, Google OAuth, and AI chatbot integration.',
      color: '#60a5fa'
    },
    {
      title: 'B.Tech CSE (AI & ML)',
      subtitle: 'Parul University - PIET Campus',
      desc: 'Specializing in Machine Learning algorithms, Data Structures, and Software Engineering.',
      color: '#a78bfa'
    },
    {
      title: 'NxtWave CCBP 4.0',
      subtitle: 'Upskilling & Industry Readiness',
      desc: 'Mastering modern full-stack web development, REST APIs, and database engineering.',
      color: '#34d399'
    },
    {
      title: 'AI & MCP Integration',
      subtitle: 'Automation & Chatbots',
      desc: 'Integrating generative AI chatbots, prompt pipelines, and Model Context Protocol concepts.',
      color: '#f472b6'
    }
  ];

  // Auto-cycle through the orbital dots every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % orbitalDetails.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [orbitalDetails.length]);

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: '6rem' }}>
      <div className="section-container" style={{ width: '100%' }}>
        <div className="grid-2-col" style={{ alignItems: 'center', gap: '4rem' }}>
          
          {/* RIGHT SIDE: Minimal Professional Content (Shifted to right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'left', order: 2 }}
          >
            {/* Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1rem',
                borderRadius: '99px',
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              Available for New Opportunities
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1rem',
                letterSpacing: '-0.03em'
              }}
            >
              Siva Manikanta Galaba
            </h1>

            {/* Sub-headline */}
            <h2
              className="flex-row items-center gap-sm"
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#60a5fa',
                marginBottom: '1.2rem'
              }}
            >
              <Bot size={20} color="#60a5fa" /> MERN Stack & AI Engineer
            </h2>

            {/* Pitch */}
            <p className="section-subtitle" style={{ fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '540px' }}>
              Building scalable full-stack applications with intelligent AI integrations, automation workflows, and MCP concepts. Upskilling with NxtWave CCBP 4.0.
            </p>

            {/* MINIMAL TRANSPARENT BUTTONS */}
            <div className="flex-row flex-wrap gap-md">
              <a
                href="#projects"
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Work <ArrowRight size={16} />
              </a>

              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <Download size={16} /> Resume
              </a>

              <a
                href="#contact"
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <Mail size={16} /> Contact
              </a>
            </div>

          </motion.div>

          {/* LEFT SIDE: React.js Central Logo + Half-Circle Orbital Node Dots (Shifted to left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex-center"
            style={{ position: 'relative', marginTop: '2rem', order: 1 }}
          >
            <div
              className="flex-center"
              style={{
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '1 / 1',
                position: 'relative'
              }}
            >
              {/* Portrait Image — perfectly centered in the circle container */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  height: '90%',
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <motion.img
                  src="/siva_transparent.png"
                  alt="Siva Manikanta Galaba"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))'
                  }}
                />
              </div>

              {/* Right-side Semi-Circle Arc — 100% size, centered */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px solid transparent',
                  borderRightColor: 'rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'rgba(255, 255, 255, 0.08)',
                  borderBottomColor: 'rgba(255, 255, 255, 0.08)',
                  pointerEvents: 'none',
                  zIndex: 5
                }}
              />

              {/*
                4 Dots exactly ON the 100% arc: radius = 50% of container
                Arc center = (50%, 50%)
                Angles shifted right to avoid overlapping the suit: -60°, -20°, +20°, +60°
                x = 50 + 50·cos(θ),  y = 50 + 50·sin(θ)
                  θ=-60°: x=75.0%, y=6.7%
                  θ=-20°: x=97.0%, y=32.9%
                  θ=+20°: x=97.0%, y=67.1%
                  θ=+60°: x=75.0%, y=93.3%
              */}
              {[
                { top: '6.7%',  left: '75.0%', popupLeft: true,  popupTop: '-10px' },
                { top: '32.9%', left: '97.0%', popupLeft: true,  popupTop: '-10px' },
                { top: '67.1%', left: '97.0%', popupLeft: true,  popupTop: '-10px' },
                { top: '93.3%', left: '75.0%', popupLeft: true,  popupTop: '-80px' }
              ].map((pos, idx) => {
                const isActive = activeDot === idx;
                const dotColor = orbitalDetails[idx].color;
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 30,
                    }}
                  >
                    <motion.button
                      onClick={() => {
                        sound.playClick();
                        setActiveDot(idx);
                      }}
                      onMouseEnter={() => {
                        sound.playHover();
                        setActiveDot(idx);
                      }}
                      whileHover={{ scale: 1.5 }}
                      style={{
                        display: 'block',
                        width: isActive ? 22 : 14,
                        height: isActive ? 22 : 14,
                        borderRadius: '50%',
                        background: dotColor,
                        border: '2px solid #ffffff',
                        boxShadow: isActive ? `0 0 22px ${dotColor}` : `0 0 10px ${dotColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />

                    {/* Data Popup — to the RIGHT of the dot to avoid overlapping the face */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.85, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: 'absolute',
                            top: pos.popupTop,
                            left: '45px', // Fixed pixel value guarantees it completely clears the dot and shadow
                            width: '200px',
                            padding: '0.85rem 1rem',
                            borderRadius: '14px',
                            background: 'rgba(8, 8, 16, 0.97)',
                            border: `1px solid ${dotColor}60`,
                            boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${dotColor}20`,
                            textAlign: 'left',
                            pointerEvents: 'none',
                            zIndex: 50
                          }}
                        >
                          <div className="flex-row items-center gap-xs" style={{ marginBottom: '0.3rem' }}>
                            <CheckCircle2 size={13} color={dotColor} />
                            <h4 style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 800, lineHeight: 1.2 }}>
                              {orbitalDetails[idx].title}
                            </h4>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: dotColor, fontWeight: 600, marginBottom: '0.3rem' }}>
                            {orbitalDetails[idx].subtitle}
                          </p>
                          <p style={{ fontSize: '0.70rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            {orbitalDetails[idx].desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
