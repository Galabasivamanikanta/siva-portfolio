import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, ShieldAlert, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaBootstrap } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJsonwebtokens, SiJavascript } from 'react-icons/si';
import { sound } from '../utils/sound';

// 1. Official DiagnoLabs Logo (Dark Theme Vector with Hexagon, Gold Vertices & Pulse Line)
const DiagnoLabsOfficialVector = ({ width = 240, height = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(10, 5)">
      <polygon points="40,5 75,25 75,65 40,85 5,65 5,25" stroke="#60A5FA" strokeWidth="3" fill="rgba(30, 58, 138, 0.3)" />
      <polygon points="40,12 68,28 68,62 40,78 12,62 12,28" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle cx="40" cy="5" r="3.5" fill="#F59E0B" />
      <circle cx="75" cy="25" r="3.5" fill="#60A5FA" />
      <circle cx="75" cy="65" r="3.5" fill="#60A5FA" />
      <circle cx="40" cy="85" r="3.5" fill="#F59E0B" />
      <circle cx="5" cy="65" r="3.5" fill="#60A5FA" />
      <circle cx="5" cy="25" r="3.5" fill="#60A5FA" />
      <path d="M18 45 H30 L36 30 L44 60 L52 38 L58 48 H62" stroke="#60A5FA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="95" y="46" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="Outfit, sans-serif" letterSpacing="-0.5">
      DiagnoLabs
    </text>
    <text x="96" y="68" fill="#F59E0B" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif" letterSpacing="3">
      CLINICAL DISCOVERY
    </text>
  </svg>
);

// 2. DelishDash Official Logo Vector
const DelishDashOfficialVector = ({ width = 240, height = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(15, 10)">
      <ellipse cx="35" cy="60" rx="30" ry="9" fill="#F59E0B" />
      <path d="M38 10 L22 36 H34 L28 58 L48 30 H35 L38 10 Z" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>
    <text x="90" y="46" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="Outfit, sans-serif">
      DelishDash
    </text>
    <text x="91" y="68" fill="#F59E0B" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif" letterSpacing="3">
      RECIPE & FOOD PORTAL
    </text>
  </svg>
);

// 3. CineWave Official Logo Vector
const CineWaveOfficialVector = ({ width = 240, height = 80 }) => (
  <svg width={width} height={height} viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(15, 10)">
      <circle cx="35" cy="35" r="28" stroke="#EC4899" strokeWidth="4" fill="rgba(236, 72, 153, 0.1)" />
      <circle cx="35" cy="35" r="9" fill="#EC4899" />
      <path d="M5 35 C15 20, 25 50, 35 35 C45 20, 55 50, 65 35" stroke="#F472B6" strokeWidth="3" opacity="0.8" />
    </g>
    <text x="90" y="46" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="Outfit, sans-serif">
      CineWave
    </text>
    <text x="91" y="68" fill="#EC4899" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif" letterSpacing="3">
      CINEMA SPOTLIGHT
    </text>
  </svg>
);

// Helper for rendering official SVG brand logos inside tech badges
const renderTechLogo = (techName) => {
  const t = techName.toLowerCase();
  if (t.includes('react')) return <FaReact color="#61DAFB" size={16} />;
  if (t.includes('javascript') || t === 'js') return <SiJavascript color="#F7DF1E" size={15} />;
  if (t.includes('html')) return <FaHtml5 color="#E34F26" size={16} />;
  if (t.includes('css') && !t.includes('tailwind')) return <FaCss3Alt color="#1572B6" size={16} />;
  if (t.includes('bootstrap')) return <FaBootstrap color="#7952B3" size={16} />;
  if (t.includes('node')) return <FaNodeJs color="#339933" size={16} />;
  if (t.includes('mongo')) return <SiMongodb color="#47A248" size={16} />;
  if (t.includes('express')) return <SiExpress color="#ffffff" size={16} />;
  if (t.includes('tailwind')) return <SiTailwindcss color="#06B6D4" size={16} />;
  if (t.includes('jwt')) return <SiJsonwebtokens color="#D63AFF" size={16} />;
  return <Cpu color="#60a5fa" size={15} />;
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState('diagnolabs');

  const projectsData = [
    {
      id: 'diagnolabs',
      name: 'DiagnoLabs',
      logoVector: <DiagnoLabsOfficialVector width={220} height={70} />,
      tabVector: <DiagnoLabsOfficialVector width={160} height={50} />,
      color: '#60a5fa',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      tagline: 'Healthcare Lab Discovery & AI Diagnostic Platform',
      desc: 'DiagnoLabs is my full-stack MERN flagship healthcare application designed to streamline diagnostic lab test bookings, medical report management, and real-time clinical laboratory discovery.',
      hasProblemSolution: true,
      problem: 'Patients struggle to locate accredited lab test centers nearby, compare test prices, and manage scattered digital diagnostic reports securely in one unified hub.',
      solution: 'Architected an end-to-end MERN platform featuring geolocation lab discovery, seamless test booking, encrypted medical report access, Google OAuth security, and an AI-powered health advice chatbot.',
      features: [
        'Real-time Geolocation Lab Discovery Engine',
        'Secure End-to-End Test Booking & Report Portal',
        'Integrated AI-Powered Health Guidance Chatbot',
        'Google OAuth Authentication & Passport.js Middleware',
        'Recruiter Telemetry Logging & MongoDB Atlas Database',
        'Dynamic ML Resume Generation Microservice'
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
      liveUrl: 'https://diagnolabs.netlify.app/',
      githubUrl: 'https://github.com/Galabasivamanikanta/DiagnoLabs'
    },
    {
      id: 'delishdash',
      name: 'DelishDash',
      logoVector: <DelishDashOfficialVector width={220} height={70} />,
      tabVector: <DelishDashOfficialVector width={160} height={50} />,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      tagline: 'Dynamic Food & Recipe Discovery Portal',
      desc: 'DelishDash is a hands-on skill development web app built to master frontend web development, dynamic recipe filtering, order history management, and interactive DOM manipulation.',
      hasProblemSolution: false,
      features: [
        'Multi-Category Menu Filtering (Starters, Soups, Seafood, Biryani, Desserts)',
        'Interactive Order Quantity Modal with Live Bill Calculation',
        'Slide-over Cart Drawer & Dynamic Order History Tracker',
        'Promo Gift Voucher Modal & Interactive Login/Signup Workflows',
        'Responsive Mobile-First Bootstrap Layout System'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'DOM Manipulation'],
      liveUrl: 'https://delishdash.ccbp.tech/',
      githubUrl: 'https://github.com/Galabasivamanikanta/delishdash'
    },
    {
      id: 'cinewave',
      name: 'CineWave',
      logoVector: <CineWaveOfficialVector width={220} height={70} />,
      tabVector: <CineWaveOfficialVector width={160} height={50} />,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      tagline: 'Spotlight Cinema & Entertainment Hub',
      desc: 'CineWave is a hands-on skill development movie ticket booking app inspired by BookMyShow, focused on clean responsive layout design, glassmorphic UI cards, and movie showcases.',
      hasProblemSolution: false,
      features: [
        'Cinematic BookMyShow-inspired Movie Spotlight Hero',
        'Glassmorphic Movie Showcase & Interactive Poster Cards',
        'Seat Selection & Movie Ticket Browsing UX Flow',
        'Responsive Media Query Grid System & Micro-Interactions'
      ],
      tech: ['React', 'Tailwind CSS', 'JavaScript', 'UI/UX Design'],
      liveUrl: 'https://show-spotlight-spark.lovable.app/',
      githubUrl: 'https://github.com/Galabasivamanikanta/showtime-landing'
    }
  ];

  const currentProj = projectsData.find(p => p.id === activeProject);

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Flagship Applications</h2>
        <p className="section-subtitle">
          Real-world problem solving through scalable full-stack architecture, pixel-perfect UIs, and dynamic data workflows.
        </p>

        {/* Project Navigation Tabs matching screenshot */}
        <div className="flex-row flex-center flex-wrap gap-md" style={{ marginBottom: '2.5rem' }}>
          {projectsData.map(proj => {
            const isActive = activeProject === proj.id;
            return (
              <motion.button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setActiveProject(proj.id);
                }}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveProject(proj.id);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-row items-center gap-sm"
                style={{
                  padding: '0.75rem 1.8rem',
                  borderRadius: '99px',
                  background: isActive ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? `1px solid ${proj.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isActive ? `0 0 20px ${proj.color}40` : 'none',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                {/* Brand Icon */}
                <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {proj.id === 'diagnolabs' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  )}
                  {proj.id === 'delishdash' && (
                    <span style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 900 }}>🍴</span>
                  )}
                  {proj.id === 'cinewave' && (
                    <span style={{ color: '#ec4899', fontSize: '1.1rem' }}>🎬</span>
                  )}
                </div>
                <span>{proj.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Project Display: Frameless Pure Transparent (Text directly over space background) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProj.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'transparent',
              padding: '1rem 0',
              textAlign: 'left'
            }}
          >
            <div className="grid-2-col gap-xl" style={{ alignItems: 'center', gridTemplateColumns: 'minmax(260px, 320px) 1fr' }}>
              
              {/* LEFT COLUMN: Official Vector Logo, Subtitle, Buttons (Directly over space) */}
              <div className="flex-col flex-center" style={{ textAlign: 'center' }}>
                
                {/* Official Vector Logo Container */}
                <div
                  className="flex-center"
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    width: '100%',
                    maxWidth: '280px'
                  }}
                >
                  {currentProj.logoVector}
                </div>

                {/* Subtitle */}
                <p style={{ fontSize: '0.9rem', color: currentProj.color, fontWeight: 700, marginBottom: '1.8rem', maxWidth: '260px' }}>
                  {currentProj.tagline}
                </p>

                {/* Action Link Buttons */}
                <div className="flex-row flex-center flex-wrap gap-md">
                  <a
                    href={currentProj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-primary"
                    style={{
                      padding: '0.7rem 1.6rem',
                      borderRadius: '99px',
                      fontSize: '0.88rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontWeight: 600
                    }}
                  >
                    <ExternalLink size={15} /> Live Site
                  </a>
                  <a
                    href={currentProj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-secondary"
                    style={{
                      padding: '0.7rem 1.6rem',
                      borderRadius: '99px',
                      fontSize: '0.88rem',
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <Code2 size={15} /> Source Code
                  </a>
                </div>

              </div>

              {/* RIGHT COLUMN: Overview, Problem/Solution, Key Features, Tech Stack (Pure Transparent over space) */}
              <div className="flex-col gap-lg">
                
                {/* Overview Text */}
                <p style={{ color: '#ffffff', fontSize: '1.08rem', lineHeight: 1.7, fontWeight: 500 }}>
                  {currentProj.desc}
                </p>

                {/* Problem & Solution (Frameless Border Accents over space) */}
                {currentProj.hasProblemSolution && (
                  <div className="grid-2-col gap-md">
                    <div
                      style={{
                        background: 'transparent',
                        borderLeft: '3px solid #ef4444',
                        padding: '0.8rem 1.2rem'
                      }}
                    >
                      <div className="flex-row items-center gap-xs" style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        <ShieldAlert size={15} /> PROBLEM
                      </div>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {currentProj.problem}
                      </p>
                    </div>

                    <div
                      style={{
                        background: 'transparent',
                        borderLeft: '3px solid #10b981',
                        padding: '0.8rem 1.2rem'
                      }}
                    >
                      <div className="flex-row items-center gap-xs" style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        <CheckCircle2 size={15} /> SOLUTION
                      </div>
                      <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {currentProj.solution}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Features List */}
                <div>
                  <div className="flex-row items-center gap-xs" style={{ fontSize: '0.82rem', color: currentProj.color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                    <Layers size={15} /> KEY FEATURES
                  </div>
                  <div className="grid-2-col gap-sm">
                    {currentProj.features.map((feat, idx) => (
                      <div key={idx} className="flex-row items-start gap-xs" style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}>
                        <span style={{ color: currentProj.color, fontWeight: 900, marginRight: '4px' }}>•</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <div className="flex-row items-center gap-xs" style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                    <Cpu size={15} /> TECH STACK
                  </div>
                  <div className="flex-row flex-wrap gap-xs">
                    {currentProj.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="flex-row items-center gap-xs"
                        style={{
                          padding: '0.4rem 0.95rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '99px',
                          fontSize: '0.85rem',
                          color: '#ffffff',
                          fontWeight: 600,
                          border: '1px solid rgba(255, 255, 255, 0.12)'
                        }}
                      >
                        {renderTechLogo(t)}
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
