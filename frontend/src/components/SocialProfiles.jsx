import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { sound } from '../utils/sound';

export default function SocialProfiles() {
  const [activeCard, setActiveCard] = useState(null);
  const [ghData, setGhData] = useState({ repos: '8+', followers: '5+', loading: true });

  useEffect(() => {
    fetch('https://api.github.com/users/Galabasivamanikanta')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGhData({
            repos: `${data.public_repos}`,
            followers: `${data.followers}`,
            loading: false
          });
        }
      })
      .catch((err) => {
        console.log('GitHub API fallback:', err);
      });
  }, []);

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      icon: <FaGithub size={36} color="#ffffff" />,
      color: '#ffffff',
      url: 'https://github.com/Galabasivamanikanta',
      handle: '@Galabasivamanikanta',
      stats: [
        { label: 'Public Repos', val: ghData.repos },
        { label: 'Followers', val: ghData.followers },
        { label: 'Primary Lang', val: 'JS / React' }
      ],
      previewText: 'Explore official source code repositories for DiagnoLabs, DelishDash, CineWave, and full-stack projects.'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <FaLinkedin size={36} color="#0A66C2" />,
      color: '#0A66C2',
      url: 'https://www.linkedin.com/in/siva-manikanta-galaba-3a769b33a/',
      handle: 'Siva Manikanta Galaba',
      stats: [
        { label: 'Connections', val: '500+' },
        { label: 'Headline', val: 'MERN & AI Dev' },
        { label: 'Status', val: 'Open to Work' }
      ],
      previewText: 'Connect professionally, view academic milestones, endorsed skills, and industry updates.'
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      icon: <SiLeetcode size={36} color="#FFA116" />,
      color: '#FFA116',
      url: 'https://leetcode.com/u/7Y5VP6eAhf/',
      handle: 'u/7Y5VP6eAhf',
      stats: [
        { label: 'Solved Stats', val: 'Active Solver' },
        { label: 'Topics', val: 'DSA & Math' },
        { label: 'Language', val: 'JS / Python' }
      ],
      previewText: 'View algorithmic problem-solving track record, Data Structures practice, and challenge stats.'
    },
    {
      id: 'email',
      name: 'Email Contact',
      icon: <Mail size={36} color="#ec4899" />,
      color: '#ec4899',
      url: 'mailto:galabasivamanikanta8@gmail.com',
      handle: 'galabasivamanikanta8@gmail.com',
      stats: [
        { label: 'Response Time', val: '< 24 Hours' },
        { label: 'Availability', val: 'Immediate' },
        { label: 'Preferred', val: 'Direct Email' }
      ],
      previewText: 'Send direct emails for interview inquiries, project proposals, or collaboration opportunities.'
    }
  ];

  return (
    <section className="section-container" style={{ paddingBottom: '4rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title" style={{ textAlign: 'center' }}>Verified Networks</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
          Hover over any official brand logo below to inspect live API telemetry, algorithmic stats, and direct contact details.
        </p>

        {/* Minimal Floating Logos Row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', position: 'relative' }}>
          {socialLinks.map((social) => (
            <div key={social.id} style={{ position: 'relative' }}>
              
              {/* Floating Official Brand Logo Button */}
              <motion.button
                onClick={() => {
                  sound.playClick();
                  if (social.id === 'email') {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.open(social.url, '_blank');
                  }
                }}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveCard(social.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                whileHover={{ scale: 1.3, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${social.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: `0 10px 30px ${social.color}25`,
                  backdropFilter: 'blur(12px)'
                }}
              >
                {social.icon}
              </motion.button>

              {/* Hover Floating Data Popup */}
              <AnimatePresence>
                {activeCard === social.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="tech-popup"
                    style={{
                      border: `1px solid ${social.color}60`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {social.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800 }}>{social.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: social.color, fontWeight: 600 }}>{social.handle}</p>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {social.previewText}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem' }}>
                      {social.stats.map((st, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{st.label}</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: social.color, marginTop: '0.1rem' }}>{st.val}</div>
                        </div>
                      ))}
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
