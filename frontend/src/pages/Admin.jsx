import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import { Users, FileText, ArrowLeft, Activity, ShieldAlert } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch('http://localhost:5000/api/admin/visits', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setVisits(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch visits', err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="section-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
        <ShieldAlert size={48} color="#ef4444" />
        <h2 style={{ fontSize: '2rem', color: '#ffffff' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)' }}>Administrator authentication token required to view recruiter telemetry.</p>
        <Link to="/" className="btn-glass-primary"><ArrowLeft size={18} /> Return to Portfolio</Link>
      </div>
    );
  }

  const totalDownloads = visits.reduce((sum, v) => sum + (v.resumesDownloaded ? v.resumesDownloaded.length : 0), 0);

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '4rem 0', color: '#ffffff' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>Recruiter Engagement Telemetry</h1>
            <p style={{ color: 'var(--text-muted)' }}>Real-time database records from MongoDB Atlas.</p>
          </div>
          <Link to="/" className="btn-glass-secondary"><ArrowLeft size={18} /> Back to Site</Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading database records...</p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
                  <Users size={20} color="#60a5fa" /> Total Page Interactions
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff' }}>
                  {visits.reduce((acc, curr) => acc + (curr.visits ? curr.visits.length : 0), 0)}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
                  <Activity size={20} color="#34d399" /> Registered Recruiters
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#34d399' }}>{visits.length}</div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-muted)' }}>
                  <FileText size={20} color="#a78bfa" /> Resumes Generated
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#a78bfa' }}>{totalDownloads}</div>
              </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem' }}>Recruiter Audit Logs</h2>
            <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recruiter Name</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Active</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tailored Resumes</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No recruiter sessions logged in MongoDB database yet.
                      </td>
                    </tr>
                  ) : (
                    visits.map((visit) => (
                      <tr key={visit._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1.2rem 1.5rem' }}>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{visit.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{visit.username}</div>
                        </td>
                        <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{visit.email}</td>
                        <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {visit.visits && visit.visits.length > 0
                            ? new Date(visit.visits[visit.visits.length - 1]).toLocaleString()
                            : 'N/A'}
                        </td>
                        <td style={{ padding: '1.2rem 1.5rem' }}>
                          {visit.resumesDownloaded && visit.resumesDownloaded.length > 0 ? (
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {visit.resumesDownloaded.map((r, i) => (
                                <span key={i} style={{ padding: '0.2rem 0.6rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '99px', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>
                                  {r.roleInterest}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>None</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
