import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LabListPage = () => {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/labs');
        if (!res.ok) throw new Error('Failed to load labs');
        const data = await res.json();
        setLabs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  const getLabIcon = (type) => {
    switch (type) {
      case 'email-lab':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'fake-website-lab':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'upi-qr-lab':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getLabColors = (type) => {
    switch (type) {
      case 'email-lab':
        return {
          bg: 'from-rose-500/20 to-rose-600/10',
          border: 'border-rose-500/20',
          text: 'text-rose-400',
          hover: 'group-hover:border-rose-500/40',
        };
      case 'fake-website-lab':
        return {
          bg: 'from-emerald-500/20 to-emerald-600/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-400',
          hover: 'group-hover:border-emerald-500/40',
        };
      case 'upi-qr-lab':
        return {
          bg: 'from-amber-500/20 to-amber-600/10',
          border: 'border-amber-500/20',
          text: 'text-amber-400',
          hover: 'group-hover:border-amber-500/40',
        };
      default:
        return {
          bg: 'from-cyan-500/20 to-cyan-600/10',
          border: 'border-cyan-500/20',
          text: 'text-cyan-400',
          hover: 'group-hover:border-cyan-500/40',
        };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">Loading labs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <div className="text-rose-400 text-sm">{error}</div>
        <p className="text-slate-500 mt-2 text-xs">Make sure the backend server is running on port 4000</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Simulation Labs</h1>
            <p className="text-sm text-slate-400">Choose a scam scenario to explore</p>
          </div>
        </div>
      </header>

      {/* Instructions Banner */}
      <div className="card p-4 flex items-start gap-4 bg-gradient-to-r from-cyan-500/5 to-transparent border-cyan-500/20">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-sm">
          <p className="text-slate-300 font-medium">How this works</p>
          <p className="text-slate-400 mt-1">
            These are <span className="text-white">hands-on simulations</span>, not quizzes.
            You'll be placed in a realistic scam environment. Make choices as you would in real life —
            we'll track your actions silently. The debrief at the end reveals what would have happened.
          </p>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => {
          const colors = getLabColors(lab.type);
          return (
            <div
              key={lab.id}
              onClick={() => navigate(`/labs/${lab.id}`)}
              className={`card-hover group p-6 space-y-4 cursor-pointer transition-all duration-300 ${colors.hover}`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.text}`}>
                {getLabIcon(lab.type)}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className={`text-lg font-semibold text-white group-hover:${colors.text} transition-colors`}>
                  {lab.name}
                </h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                  {lab.summary}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className={`badge ${lab.difficulty === 'beginner' ? 'badge-safe' : 'badge-risky'}`}>
                    {lab.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>~5 min</span>
                </div>
              </div>

              {/* Enter Button */}
              <button className="w-full btn-secondary text-xs group-hover:bg-cyber-700/80 group-hover:border-cyan-500/30">
                Enter Lab →
              </button>
            </div>
          );
        })}
      </div>

      {/* Safety Note */}
      <div className="text-center text-xs text-slate-500 pt-4">
        <p>🔒 All simulations are 100% safe. No real data, money, or accounts are involved.</p>
      </div>
    </div>
  );
};

export default LabListPage;
