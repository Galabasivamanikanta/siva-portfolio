import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Briefcase, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section-container" style={{ padding: '4rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>About Me</h2>
        <p className="section-subtitle" style={{ fontSize: '0.95rem', marginBottom: '2rem' }}>
          Passionate software engineer bridging full-stack development with artificial intelligence and modern automation concepts.
        </p>

        <div className="grid-2-col" style={{ alignItems: 'stretch' }}>
          
          {/* Left: Bio & Objective */}
          <div className="flex-col" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-row gap-sm" style={{ marginBottom: '1rem', color: '#60a5fa' }}>
                <Target size={20} />
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Bio & Career Objective</h3>
              </div>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.92rem' }}>
                I am a MERN Stack Developer actively expanding my capabilities in AI integrations, automation workflows, and Model Context Protocol (MCP) concepts. I turn complex backend logic into responsive web experiences.
              </p>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                Upskilling through **NxtWave CCBP 4.0 Technologies**, building platforms like healthcare booking engines, recipe portals, and entertainment showcases.
              </p>
            </div>

            <div className="flex-row gap-xl" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Location</div>
                <div className="flex-row gap-sm" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', marginTop: '0.1rem' }}>
                  <MapPin size={14} color="#ef4444" /> India
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Status</div>
                <div className="flex-row gap-sm" style={{ fontSize: '0.88rem', fontWeight: 600, color: '#34d399', marginTop: '0.1rem' }}>
                  <Briefcase size={14} color="#34d399" /> Student / Fresher
                </div>
              </div>
            </div>
          </div>

          {/* Right: Compact Education Timeline */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex-row gap-sm" style={{ marginBottom: '1.2rem', color: '#a78bfa' }}>
              <GraduationCap size={22} />
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Education Journey</h3>
            </div>

            <div className="flex-col" style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1.4rem', gap: '1.4rem' }}>
              
              {/* B.Tech */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.9rem', top: '0.2rem', width: 12, height: 12, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
                <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>B.Tech in CSE (AI & ML)</h4>
                <p style={{ color: '#60a5fa', fontSize: '0.82rem', fontWeight: 600, margin: '0.1rem 0' }}>Parul University</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.1rem' }}>Vadodara, Gujarat • Specializing in AI, Machine Learning, and Full-Stack Software Engineering.</p>
              </div>

              {/* Diploma */}
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.9rem', top: '0.2rem', width: 12, height: 12, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                <h4 style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700 }}>Diploma in EEE</h4>
                <p style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600, margin: '0.1rem 0' }}>A.M.Reddy Memorial College of Engineering and Technology</p>
                <div className="flex-row gap-sm" style={{ display: 'inline-flex', background: 'rgba(16,185,129,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: '#34d399', fontWeight: 600, marginTop: '0.2rem' }}>
                  <Award size={12} /> Percentage: 78.22%
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
