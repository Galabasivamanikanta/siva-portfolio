import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiPostgresql, SiJsonwebtokens, SiJavascript, SiPostman } from 'react-icons/si';
import { sound } from '../utils/sound';

// Crisp Vector SVG for Gen AI Logo matching the exact glowing brain-circuit aesthetic
const AiLogoSvg = () => (
  <svg width="56" height="32" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>
    
    {/* Brain Circuit Outline */}
    <path
      d="M25 15 C18 15, 12 20, 12 28 C12 33, 15 37, 18 40 C15 44, 18 50, 25 50 C28 50, 31 48, 33 46 C35 48, 38 50, 42 50 C48 50, 52 45, 50 38"
      stroke="url(#aiGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Circuit Nodes & Lines */}
    <path d="M33 22 H55 M38 30 H60 M33 38 H55 M40 45 H52" stroke="url(#aiGrad)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="55" cy="22" r="3" fill="url(#aiGrad)" />
    <circle cx="60" cy="30" r="3" fill="url(#aiGrad)" />
    <circle cx="55" cy="38" r="3" fill="url(#aiGrad)" />
    <circle cx="52" cy="45" r="3" fill="url(#aiGrad)" />

    {/* Crisp AI Text */}
    <text x="68" y="42" fill="url(#aiGrad)" fontSize="28" fontWeight="900" fontFamily="Outfit, sans-serif" letterSpacing="1">
      AI
    </text>
    
    {/* Outer Capsule Glow Border */}
    <rect x="5" y="5" width="110" height="50" rx="25" stroke="url(#aiGrad)" strokeWidth="2.5" strokeOpacity="0.8" />
  </svg>
);

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(null);

  const techData = [
    {
      id: 'react',
      name: 'React.js',
      category: 'Frontend Engine',
      level: 'Advanced (90%)',
      icon: <FaReact color="#61DAFB" size={48} />,
      color: '#61DAFB',
      desc: 'Building high-performance SPAs with component state management, hooks, and responsive UI design systems.',
      projects: ['DiagnoLabs', 'CineWave', 'Portfolio Website']
    },
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      category: 'Core Language',
      level: 'Advanced (95%)',
      icon: <SiJavascript color="#F7DF1E" size={44} />,
      color: '#F7DF1E',
      desc: 'Mastering async/await, closures, ES6+ features, functional programming, and DOM manipulation.',
      projects: ['DiagnoLabs', 'DelishDash', 'CineWave']
    },
    {
      id: 'genai',
      name: 'Gen AI & Automation',
      category: 'AI Engineering',
      level: 'Proficient (80%)',
      icon: <AiLogoSvg />,
      color: '#EC4899',
      desc: 'Integrating generative AI chatbots, prompt engineering, and automated AI assistance into web platforms.',
      projects: ['DiagnoLabs AI Health Chatbot']
    },
    {
      id: 'node',
      name: 'Node.js',
      category: 'Backend Runtime',
      level: 'Advanced (90%)',
      icon: <FaNodeJs color="#339933" size={48} />,
      color: '#339933',
      desc: 'Asynchronous event-driven server development with Express, REST APIs, and authentication middleware.',
      projects: ['DiagnoLabs Backend', 'OAuth Auth Server']
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'Backend Framework',
      level: 'Advanced (90%)',
      icon: <SiExpress color="#ffffff" size={44} />,
      color: '#ffffff',
      desc: 'Structuring modular Express routing, security headers, JWT verification, and database controller layers.',
      projects: ['DiagnoLabs API Engine']
    },
    {
      id: 'restapi',
      name: 'REST API Architecture',
      category: 'API Engineering',
      level: 'Advanced (95%)',
      icon: <SiPostman color="#FF6C37" size={44} />,
      color: '#FF6C37',
      desc: 'Designing clean RESTful endpoints, JSON request/response pipelines, status codes, and API testing.',
      projects: ['DiagnoLabs APIs', 'Backend Endpoints']
    },
    {
      id: 'mongo',
      name: 'MongoDB',
      category: 'NoSQL Database',
      level: 'Proficient (85%)',
      icon: <SiMongodb color="#47A248" size={48} />,
      color: '#47A248',
      desc: 'Designing schema models with Mongoose, indexing, telemetry collection, and MongoDB Atlas deployment.',
      projects: ['DiagnoLabs Recruiter DB']
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Styling & UI',
      level: 'Proficient (85%)',
      icon: <SiTailwindcss color="#06B6D4" size={44} />,
      color: '#06B6D4',
      desc: 'Utility-first modern styling, responsive layout grids, dark themes, and glassmorphism styling.',
      projects: ['CineWave', 'Portfolio UI']
    },
    {
      id: 'html5',
      name: 'HTML5',
      category: 'Web Standards',
      level: 'Advanced (95%)',
      icon: <FaHtml5 color="#E34F26" size={48} />,
      color: '#E34F26',
      desc: 'Semantic HTML markup, accessibility compliance, and DOM tree structures.',
      projects: ['DelishDash', 'DiagnoLabs', 'CineWave']
    },
    {
      id: 'css3',
      name: 'CSS3',
      category: 'Styling Engine',
      level: 'Advanced (90%)',
      icon: <FaCss3Alt color="#1572B6" size={48} />,
      color: '#1572B6',
      desc: 'Flexbox, Grid layouts, keyframe animations, and custom design systems.',
      projects: ['All Web Projects']
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Relational DB',
      level: 'Proficient (80%)',
      icon: <SiPostgresql color="#4169E1" size={44} />,
      color: '#4169E1',
      desc: 'Relational database schema modeling, JOIN queries, and structured data handling.',
      projects: ['Academic & Enterprise Projects']
    },
    {
      id: 'jwt',
      name: 'JWT & Security',
      category: 'Security & Auth',
      level: 'Advanced (90%)',
      icon: <SiJsonwebtokens color="#D63AFF" size={44} />,
      color: '#D63AFF',
      desc: 'Secure token authentication, Google OAuth Passport.js integration, and httpOnly cookie security.',
      projects: ['Recruiter Google Login']
    }
  ];

  return (
    <section id="tech" className="section-container" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title" style={{ textAlign: 'center' }}>Technology Stack</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
          Hover over any official language or technology logo to inspect engineering metrics and live project usages.
        </p>

        {/* Pure Official Brand Logos Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', position: 'relative' }}>
          {techData.map((tech) => (
            <div key={tech.id} style={{ position: 'relative' }}>
              
              {/* Clean Official Logo Icon Only */}
              <motion.button
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveTech(tech.id);
                }}
                onMouseLeave={() => setActiveTech(null)}
                whileHover={{ scale: 1.35, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${tech.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 10px 30px ${tech.color}25`,
                  transition: 'all 0.2s ease'
                }}
              >
                {tech.icon}
              </motion.button>

              {/* Hover Floating Data Telemetry Popup */}
              <AnimatePresence>
                {activeTech === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="tech-popup"
                    style={{
                      border: `1px solid ${tech.color}60`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tech.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: 800 }}>{tech.name}</h4>
                        <p style={{ fontSize: '0.78rem', color: tech.color, fontWeight: 700 }}>{tech.level}</p>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {tech.desc}
                    </p>

                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Projects Built With {tech.name}:
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {tech.projects.map((p, idx) => (
                          <span key={idx} style={{ padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
