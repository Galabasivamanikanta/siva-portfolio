import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 5, 8, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '4rem 0 3rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="section-container" style={{ padding: 0, textAlign: 'center' }}>
        
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#60a5fa', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 600 }}>
            <Sparkles size={16} /> Portfolio Complete
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}
          >
            Thank You For Visiting • See You Again
          </h3>

          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
            Designed & Engineered by Siva Manikanta Galaba using React, Three.js & Modern Web Technologies.
          </p>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            © {new Date().getFullYear()} Siva Manikanta Galaba. All rights reserved.
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
