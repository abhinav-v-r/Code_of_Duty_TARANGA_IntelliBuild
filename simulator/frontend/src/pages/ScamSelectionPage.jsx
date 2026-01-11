import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScamSelectionPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('http://localhost:4000/api/scenarios');
        if (!res.ok) throw new Error('Failed to load scenarios');
        const data = await res.json();
        setScenarios(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getTagColor = (type) => {
    if (!type) return 'bg-slate-800';
    if (type.includes('Phishing')) return 'bg-amber-500/10 text-amber-300 border-amber-500/40';
    if (type.includes('UPI')) return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40';
    if (type.includes('Website')) return 'bg-sky-500/10 text-sky-300 border-sky-500/40';
    if (type.includes('SMS') || type.includes('WhatsApp'))
      return 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/40';
    return 'bg-slate-800 text-slate-200 border-slate-700';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">Choose a scam to experience</h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Start with any scenario. We recommend doing all of them to become a Scam Survivor.
        </p>
      </div>

      {loading && <div className="text-sm text-slate-300">Loading scenarios…</div>}
      {error && (
        <div className="text-sm text-red-400">
          Could not load scenarios. Make sure the backend is running on <code>localhost:4000</code>.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {scenarios.map((scam) => (
          <button
            key={scam.id}
            type="button"
            onClick={() => navigate(`/simulate/${scam.id}`)}
            className="flex flex-col items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-primary/60 hover:bg-slate-900 transition"
          >
            <div className="flex items-center justify-between w-full gap-2">
              <h2 className="text-base font-semibold text-slate-50">{scam.title}</h2>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${getTagColor(
                  scam.scamType
                )}`}
              >
                {scam.scamType}
              </span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-3">{scam.description}</p>
            {scam.psychologyTriggers && (
              <div className="mt-1 flex flex-wrap gap-1 text-[10px] text-slate-400">
                {scam.psychologyTriggers.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-slate-800 px-2 py-0.5 uppercase tracking-wide"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScamSelectionPage;
