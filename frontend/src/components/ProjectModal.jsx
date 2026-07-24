import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Layers, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '3rem',
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.8), 0 0 60px rgba(59, 130, 246, 0.2)'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#60a5fa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Featured Project
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '0.3rem', color: '#ffffff' }}>
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-glass-primary">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-glass-secondary">
                <Code2 size={16} /> Source Code
              </a>
            )}
          </div>

          {/* Content Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Problem & Solution */}
            <div className="grid-2-col" style={{ gap: '1.5rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.5rem', borderRadius: '14px' }}>
                <h4 style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '1.05rem' }}>
                  <ShieldAlert size={18} /> Problem Statement
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.problem}</p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '14px' }}>
                <h4 style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '1.05rem' }}>
                  <CheckCircle2 size={18} /> Solution & Impact
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{project.solution}</p>
              </div>
            </div>

            {/* Architecture & Features */}
            <div>
              <h4 style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <Layers size={20} color="#60a5fa" /> Architecture & Key Features
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {project.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h4 style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                <Cpu size={20} color="#a78bfa" /> Technology Stack
              </h4>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      fontWeight: 500
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
