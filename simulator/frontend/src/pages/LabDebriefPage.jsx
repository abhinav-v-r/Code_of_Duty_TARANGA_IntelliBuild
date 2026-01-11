import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LabDebriefPage = () => {
  const { labId, sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIfNeeded = async () => {
      if (data) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:4000/api/sessions/${sessionId}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to load debrief');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    loadIfNeeded();
  }, [data, sessionId]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">Analyzing your simulation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <div className="text-rose-400 text-sm">{error}</div>
      </div>
    );
  }

  const { debrief } = data;

  // Calculate risk level color
  const getRiskColor = (score) => {
    if (score >= 70) return 'text-rose-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getRiskBgColor = (score) => {
    if (score >= 70) return 'from-rose-500';
    if (score >= 40) return 'from-amber-500';
    return 'from-emerald-500';
  };

  // Get badge based on score
  const getBadge = (score) => {
    if (score >= 70) return { name: 'High Risk', emoji: '⚠️', description: 'You fell for several traps' };
    if (score >= 40) return { name: 'Moderate Risk', emoji: '⚡', description: 'You showed some caution' };
    if (score >= 20) return { name: 'Cautious User', emoji: '🛡️', description: 'You avoided most traps' };
    return { name: 'Scam Survivor', emoji: '🏆', description: 'Excellent scam awareness!' };
  };

  const badge = getBadge(debrief.riskScore);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <header className="space-y-4">
        <button
          onClick={() => navigate('/labs')}
          className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to labs
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Simulation Debrief</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Here's what would have happened if this was a real scam scenario
          </p>
        </div>
      </header>

      {/* Score Card + Badge */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Risk Score */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide">Risk Exposure</h2>
            <span className={`badge ${debrief.riskScore >= 70 ? 'badge-dangerous' :
                debrief.riskScore >= 40 ? 'badge-risky' : 'badge-safe'
              }`}>
              {debrief.riskBand}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Score Circle */}
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={debrief.riskScore >= 70 ? '#ef4444' : debrief.riskScore >= 40 ? '#f59e0b' : '#10b981'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(debrief.riskScore / 100) * 264} 264`}
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${getRiskColor(debrief.riskScore)}`}>
                  {debrief.riskScore}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-slate-400">
                Your risk score is <span className={`font-semibold ${getRiskColor(debrief.riskScore)}`}>
                  {debrief.riskScore}/100
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Higher score = More likely to fall for the scam
              </p>
            </div>
          </div>
        </div>

        {/* Badge Earned */}
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide">Your Result</h2>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-700 to-cyber-800 border border-cyan-500/20 flex items-center justify-center text-3xl">
              {badge.emoji}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{badge.name}</div>
              <div className="text-sm text-slate-400">{badge.description}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your Action Timeline
          </h2>
          <span className="text-xs text-slate-500">{debrief.timeline.length} actions recorded</span>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />

          <div className="space-y-4 pl-10">
            {debrief.timeline.map((item, idx) => {
              // Determine if this action was risky
              const isMistake = debrief.mistakes.some(m =>
                m.trapId.includes(item.type) || item.label.toLowerCase().includes('click') || item.label.toLowerCase().includes('submit')
              );

              return (
                <div key={`${item.type}-${idx}`} className="relative animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  {/* Dot */}
                  <div className={`absolute -left-10 w-3 h-3 rounded-full border-2 ${isMistake
                      ? 'bg-rose-500 border-rose-400'
                      : 'bg-cyber-700 border-cyan-500/50'
                    }`} />

                  <div className={`p-3 rounded-xl ${isMistake ? 'bg-rose-500/10 border border-rose-500/20' : 'bg-cyber-800/50'}`}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-white">{item.label}</span>
                      <span className="text-xs text-slate-500 flex-shrink-0">
                        +{item.offsetSeconds}s
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mistakes & Missed Red Flags */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Mistakes */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Mistakes Made
          </h2>

          {debrief.mistakes.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-300">
                🎉 Great job! You avoided the main traps in this simulation.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {debrief.mistakes.map((mistake) => (
                <div
                  key={mistake.trapId}
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-white">{mistake.description}</span>
                    <span className="badge badge-dangerous text-xs flex-shrink-0">
                      +{mistake.severity} risk
                    </span>
                  </div>
                  {debrief.redFlagHints && debrief.redFlagHints[mistake.trapId] && (
                    <p className="text-xs text-slate-400">
                      💡 {debrief.redFlagHints[mistake.trapId]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Red Flags Missed */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Red Flags to Notice
          </h2>

          {debrief.missedRedFlags.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-300">
                ✅ You noticed the important warning signs. Keep it up!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {debrief.missedRedFlags.map((flag) => (
                <div
                  key={flag.trapId}
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                >
                  <p className="text-sm text-white">{flag.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Real-World Consequences */}
      <section className="card p-6 space-y-4 border-rose-500/20">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          What Would Have Happened in Real Life
        </h2>

        <div className="grid gap-3">
          {debrief.realWorldConsequences.map((consequence, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10"
            >
              <span className="text-rose-400 text-lg">⚠️</span>
              <p className="text-sm text-slate-300">{consequence}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="card p-6 space-y-4 border-emerald-500/20">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          How to Protect Yourself
        </h2>

        <div className="grid gap-3">
          {debrief.preventionTips.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
            >
              <span className="text-emerald-400 font-bold">{idx + 1}.</span>
              <p className="text-sm text-slate-300">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Summary */}
      <section className="card p-8 text-center space-y-4 bg-gradient-to-br from-cyan-500/5 to-transparent border-cyan-500/20">
        <h2 className="text-xl font-bold text-white">Key Takeaway</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          {debrief.riskScore >= 70
            ? "This simulation showed how easy it is to fall for well-crafted scams. The urgency, authority, and realistic details are designed to bypass your critical thinking. Always slow down and verify independently."
            : debrief.riskScore >= 40
              ? "You showed some awareness but still engaged with risky elements. Remember: legitimate organizations will never pressure you to act immediately or ask for sensitive information through unusual channels."
              : "Excellent awareness! You recognized the warning signs and didn't fall for the trap. Keep practicing these skills — scammers are constantly evolving their tactics."
          }
        </p>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate(`/labs/${labId}`)}
          className="btn-primary px-8"
        >
          Replay This Lab
        </button>
        <button
          onClick={() => navigate('/labs')}
          className="btn-secondary px-8"
        >
          Try Another Lab
        </button>
      </section>
    </div>
  );
};

export default LabDebriefPage;
