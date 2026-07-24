import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ExternalLink, Download, Mail, Code, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { sound } from '../utils/sound';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am Chat Bot. Ask me about Siva Manikanta Galaba's email, resume, projects, GitHub, LinkedIn, or skills!",
      actionButtons: [
        { label: 'Download Resume', action: 'resume', icon: <Download size={14} /> },
        { label: 'DiagnoLabs Live', url: 'https://diagnolabs.netlify.app/', icon: <ExternalLink size={14} /> },
        { label: 'Email Siva', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> }
      ],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickQuestions = [
    'Email & Contact',
    'Download Resume',
    'DiagnoLabs Live',
    'DelishDash & CineWave',
    'GitHub & LinkedIn',
    'Skills & Tech Stack',
    'Education'
  ];

  const handleAction = (btn) => {
    sound.playClick();
    if (btn.action === 'resume') {
      window.open('/resume.html', '_blank');
    } else if (btn.action === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (btn.url) {
      window.open(btn.url, '_blank');
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMsg).trim();
    if (!query) return;

    sound.playClick();

    const userMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Advanced NLP Matcher
    setTimeout(() => {
      let aiText = '';
      let buttons = [];
      const q = query.toLowerCase();

      // 1. Email / Mail / Contact / Reach / Address
      if (
        q.includes('mail') ||
        q.includes('email') ||
        q.includes('gmail') ||
        q.includes('contact') ||
        q.includes('reach') ||
        q.includes('hire') ||
        q.includes('message') ||
        q.includes('write') ||
        q.includes('inbox')
      ) {
        aiText = "Siva Manikanta Galaba's official email address is galabasivamanikanta8@gmail.com. You can send him an email directly or click below to launch the contact form:";
        buttons = [
          { label: '✉️ Send Email to galabasivamanikanta8@gmail.com', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> },
          { label: '📝 Open Contact Form', action: 'contact', icon: <MessageSquare size={14} /> }
        ];
      }
      // 2. Resume / CV / Download
      else if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('bio')) {
        aiText = "Here is Siva Manikanta Galaba's official full-stack engineering resume. You can download it directly below:";
        buttons = [
          { label: '📥 Download Resume PDF', action: 'resume', icon: <Download size={14} /> },
          { label: '✉️ Email Siva Directly', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> }
        ];
      }
      // 3. DiagnoLabs
      else if (q.includes('diagnolabs') || q.includes('health') || q.includes('diagnostic') || q.includes('lab')) {
        aiText = "DiagnoLabs is Siva's flagship full-stack MERN healthcare diagnostic platform with real-time lab discovery, test booking, encrypted reports, and AI health advice.";
        buttons = [
          { label: '🔗 DiagnoLabs Live Site', url: 'https://diagnolabs.netlify.app/', icon: <ExternalLink size={14} /> },
          { label: '💻 GitHub Source Code', url: 'https://github.com/Galabasivamanikanta/DiagnoLabs', icon: <FaGithub size={14} /> }
        ];
      }
      // 4. DelishDash & CineWave
      else if (q.includes('delish') || q.includes('food') || q.includes('recipe')) {
        aiText = "DelishDash is a dynamic food & recipe discovery portal featuring menu category filters, live cart drawer, and interactive order modals.";
        buttons = [
          { label: '🔗 DelishDash Live Site', url: 'https://delishdash.ccbp.tech/', icon: <ExternalLink size={14} /> },
          { label: '💻 GitHub Repo', url: 'https://github.com/Galabasivamanikanta/delishdash', icon: <FaGithub size={14} /> }
        ];
      }
      else if (q.includes('cine') || q.includes('movie') || q.includes('show') || q.includes('cinema')) {
        aiText = "CineWave is a spotlight entertainment movie ticket booking hub inspired by BookMyShow with glassmorphic cards and movie showcases.";
        buttons = [
          { label: '🔗 CineWave Live Site', url: 'https://show-spotlight-spark.lovable.app/', icon: <ExternalLink size={14} /> },
          { label: '💻 GitHub Repo', url: 'https://github.com/Galabasivamanikanta/showtime-landing', icon: <FaGithub size={14} /> }
        ];
      }
      // 5. GitHub / LinkedIn / LeetCode / Social
      else if (q.includes('github') || q.includes('linkedin') || q.includes('leetcode') || q.includes('social') || q.includes('profile') || q.includes('code')) {
        aiText = "Here are Siva's verified coding profiles & professional networks:";
        buttons = [
          { label: 'GitHub Profile', url: 'https://github.com/Galabasivamanikanta', icon: <FaGithub size={14} /> },
          { label: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/siva-manikanta-galaba-3a769b33a/', icon: <FaLinkedin size={14} /> },
          { label: 'LeetCode Profile', url: 'https://leetcode.com/u/7Y5VP6eAhf/', icon: <SiLeetcode size={14} /> }
        ];
      }
      // 6. Skills & Tech Stack
      else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node') || q.includes('mongo') || q.includes('express') || q.includes('tailwind') || q.includes('ai') || q.includes('mcp') || q.includes('javascript') || q.includes('js')) {
        aiText = "Siva specializes in MERN Stack (React.js, Node.js, Express.js, MongoDB Atlas), JavaScript (ES6+), REST API architecture, Tailwind CSS, Google OAuth, and AI Chatbot & MCP tool concepts!";
        buttons = [
          { label: '📥 Download Resume', action: 'resume', icon: <Download size={14} /> },
          { label: '✉️ Email Siva', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> }
        ];
      }
      // 7. Education / Degree / College / University / NxtWave
      else if (q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('college') || q.includes('parul') || q.includes('amreddy') || q.includes('nxtwave') || q.includes('btech') || q.includes('diploma')) {
        aiText = "Education Milestones:\n• B.Tech in CSE (AI & ML) — Parul University, Vadodara, Gujarat\n• Diploma in EEE — A.M.Reddy Memorial College of Engineering and Technology (78.22%)\n• Upskilling with NxtWave CCBP 4.0 Technologies.";
        buttons = [
          { label: '✉️ Contact Siva', action: 'contact', icon: <Mail size={14} /> }
        ];
      }
      // 8. Greetings / Default Fallback
      else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('help') || q.includes('who')) {
        aiText = "Hello! I am your AI Chat Bot. I can provide Siva Manikanta Galaba's email (galabasivamanikanta8@gmail.com), resume, project links, or GitHub repos!";
        buttons = [
          { label: '✉️ Email Siva', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> },
          { label: '📥 Download Resume', action: 'resume', icon: <Download size={14} /> },
          { label: '🔗 DiagnoLabs Live', url: 'https://diagnolabs.netlify.app/', icon: <ExternalLink size={14} /> }
        ];
      }
      else {
        aiText = `For direct inquiries, you can email Siva Manikanta Galaba at galabasivamanikanta8@gmail.com or download his resume and project code below:`;
        buttons = [
          { label: '✉️ Email galabasivamanikanta8@gmail.com', url: 'mailto:galabasivamanikanta8@gmail.com', icon: <Mail size={14} /> },
          { label: '📥 Download Resume', action: 'resume', icon: <Download size={14} /> },
          { label: '🔗 DiagnoLabs Live', url: 'https://diagnolabs.netlify.app/', icon: <ExternalLink size={14} /> }
        ];
      }

      const aiMessage = {
        sender: 'ai',
        text: aiText,
        actionButtons: buttons,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      sound.playHover();
    }, 450);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          padding: '0.8rem 1.6rem',
          borderRadius: '99px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          border: 'none',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3)',
          cursor: 'pointer'
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? <X size={16} /> : <Bot size={16} />}
        </div>
        <span>{isOpen ? 'Close Chat' : 'Chat Bot'}</span>
        {!isOpen && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '385px',
              height: '520px',
              zIndex: 998,
              borderRadius: '26px',
              background: 'rgba(10, 10, 15, 0.94)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 70px rgba(0,0,0,0.9), 0 0 40px rgba(96, 165, 250, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.1rem 1.4rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59,130,246,0.4)' }}>
                  <Bot size={22} color="#ffffff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 900, margin: 0 }}>Chat Bot</h4>
                  <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} /> Natural NLP Engine Active
                  </div>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: 30, height: 30, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '1.2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'rgba(255, 255, 255, 0.06)',
                    border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line'
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.text}</p>

                  {/* Action Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
                      {msg.actionButtons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleAction(btn)}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '99px',
                            background: 'rgba(59, 130, 246, 0.2)',
                            border: '1px solid rgba(96, 165, 250, 0.45)',
                            color: '#ffffff',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          {btn.icon}
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', display: 'block', textAlign: 'right', marginTop: '0.4rem' }}>
                    {msg.time}
                  </span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div style={{ padding: '0.6rem 0.9rem', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {quickQuestions.map((q, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSendMessage(q)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '99px',
                    background: 'rgba(96, 165, 250, 0.08)',
                    border: '1px solid rgba(96, 165, 250, 0.25)',
                    color: '#60a5fa',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ padding: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.6rem', background: 'rgba(10, 10, 15, 0.95)' }}
            >
              <input
                type="text"
                placeholder="Ask about mail, resume, projects, links..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1.1rem',
                  borderRadius: '99px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
