import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, ArrowRight, User, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    const backendUrl = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
    window.location.href = `${backendUrl}/auth/google`;
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score; // Max 5
  };

  const strength = getPasswordStrength();
  const strengthColors = ['#ef4444', '#ef4444', '#f59e0b', '#10b981', '#10b981', '#34d399'];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isLoginMode && strength < 3) {
      setErrorMsg('Password is too weak. Please use a stronger password.');
      return;
    }

    setIsLoading(true);
    
    const backendUrl = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
    const payload = isLoginMode ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success
      login({ token: data.token, ...data.user });
      onClose(); // Close modal
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetStateAndToggle = () => {
    setIsLoginMode(!isLoginMode);
    setErrorMsg('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            padding: '2.5rem', borderRadius: '24px', maxWidth: '420px', width: '90%',
            position: 'relative', overflow: 'hidden',
            background: 'rgba(10, 10, 15, 0.85)', border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Animated Background Glow */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', background: 'rgba(59, 130, 246, 0.3)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(139, 92, 246, 0.3)', filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />

          <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', zIndex: 10 }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.2)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
            <X size={16} />
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
              {isLoginMode ? 'Sign in to access your dashboard' : 'Join to explore the portfolio'}
            </p>
          </div>

          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '0.8rem', color: '#f87171', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
              <ShieldAlert size={16} />
              {errorMsg}
            </motion.div>
          )}
          
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1 }}>
            
            {!isLoginMode && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ position: 'relative' }}>
                <User size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required={!isLoginMode}
                  style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
                />
              </motion.div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.9rem 2.8rem 0.9rem 2.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLoginMode && password.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '-0.5rem', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', gap: '4px', height: '4px', width: '100%' }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level} 
                      style={{ 
                        flex: 1, 
                        borderRadius: '2px', 
                        background: strength >= level ? strengthColors[strength] : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s ease'
                      }} 
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: strengthColors[strength], textAlign: 'right' }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>{isLoginMode ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', position: 'relative', zIndex: 1 }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
              width: '100%', padding: '0.9rem', borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '1rem', fontWeight: 500, cursor: 'pointer',
              transition: 'background 0.2s ease', position: 'relative', zIndex: 1
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </>
            )}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              type="button"
              onClick={resetStateAndToggle}
              style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              {isLoginMode ? 'Sign up' : 'Sign in'}
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
