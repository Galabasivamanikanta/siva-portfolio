import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    const backendUrl = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            padding: '2.5rem', borderRadius: '24px', maxWidth: '400px', width: '90%',
            textAlign: 'center', position: 'relative',
            background: 'rgba(10, 10, 15, 0.85)', border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Login</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Sign in with Google to download my AI-tailored resume and contact me instantly.
          </p>
          
          <button
            onClick={handleGoogleLogin}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
              width: '100%', padding: '0.9rem', borderRadius: '12px',
              background: '#ffffff', color: '#000000', border: 'none',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: '0 10px 25px rgba(255,255,255,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
