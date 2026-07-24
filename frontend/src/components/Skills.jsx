import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Server, Brain, CheckCircle } from 'lucide-react';

export default function Skills() {
  const skillsData = [
    {
      category: 'Frontend Engineering',
      icon: <Laptop color="#60a5fa" size={24} />,
      items: [
        { name: 'React.js & React Router', percent: 90, status: 'Active / Mastered' },
        { name: 'JavaScript (ES6+) & Async JS', percent: 92, status: 'Active / Mastered' },
        { name: 'HTML5, CSS3 & Responsive Design', percent: 95, status: 'Active / Mastered' }
      ]
    },
    {
      category: 'Backend & Systems',
      icon: <Server color="#34d399" size={24} />,
      items: [
        { name: 'Node.js & Express API Design', percent: 90, status: 'Active / Mastered' },
        { name: 'RESTful API Architecture', percent: 95, status: 'Active / Mastered' },
        { name: 'JWT & Google OAuth Security', percent: 88, status: 'Active / Mastered' }
      ]
    },
    {
      category: 'Database, AI & Automation',
      icon: <Brain color="#a78bfa" size={24} />,
      items: [
        { name: 'MongoDB & Mongoose Schema Modeling', percent: 85, status: 'Active / Mastered' },
        { name: 'Relational SQL Databases', percent: 80, status: 'Proficient' },
        { name: 'Gen AI & Prompt Engineering', percent: 78, status: 'Active / Upskilling' },
        { name: 'Automation & MCP Concepts', percent: 75, status: 'Exploring / Upskilling' }
      ]
    }
  ];

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Skills & Competencies</h2>
        <p className="section-subtitle">
          Detailed metrics of core engineering competencies, proficiency percentages, and active learning roadmap status.
        </p>

        <div className="grid-2-col gap-2xl">
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ padding: '2.5rem' }}
            >
              <div className="flex-row items-center gap-md" style={{ marginBottom: '2rem' }}>
                <div className="flex-center" style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
                  {skillGroup.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 800 }}>{skillGroup.category}</h3>
              </div>

              <div className="flex-col gap-xl">
                {skillGroup.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: '#ffffff', fontWeight: 600 }}>{item.name}</span>
                      <span style={{ color: '#60a5fa', fontWeight: 700 }}>{item.percent}%</span>
                    </div>

                    {/* Progress Track */}
                    <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                          borderRadius: 99,
                          boxShadow: '0 0 10px #60a5fa'
                        }}
                      />
                    </div>

                    <div className="flex-row items-center gap-sm" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>
                      <CheckCircle size={12} color="#34d399" /> {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
