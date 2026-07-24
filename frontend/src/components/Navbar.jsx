import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Shield, UserCheck, Terminal, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'projects', 'tech', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech', label: 'Tech' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3.5 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0.5rem 1.4rem',
          borderRadius: '99px',
          background: scrolled ? 'rgba(5, 5, 8, 0.9)' : 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
          transition: 'all 0.4s ease'
        }}
      >
        {/* Sleek Modern Brand Monogram Logo */}
        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            marginRight: '0.5rem'
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
            }}
          >
            <Code2 size={18} color="#ffffff" />
          </div>

          <span
            style={{
              fontSize: '1.15rem',
              fontWeight: 900,
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            SIVA<span style={{ color: '#60a5fa', WebkitTextFillColor: '#60a5fa' }}>.DEV</span>
          </span>
        </a>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                style={{
                  position: 'relative',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '99px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Recruiter / Admin Auth Section */}
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '1rem', display: 'flex', alignItems: 'center' }}>
          {!user ? (
            <button
              onClick={handleGoogleLogin}
              className="btn-glass-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              <Shield size={14} /> Login
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                <UserCheck size={14} /> {user.name}
              </span>
              {user.role === 'admin' && (
                <a href="/admin" className="btn-glass-secondary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                  Admin Dashboard
                </a>
              )}
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textDecoration: 'underline'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
