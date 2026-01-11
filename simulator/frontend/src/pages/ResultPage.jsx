import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RiskBadge from '../components/RiskBadge.jsx';
import ScoreBadge from '../components/ScoreBadge.jsx';
import { useSimulationContext } from '../context/SimulationContext.jsx';

const ResultPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { registerCompletion } = useSimulationContext();

  const engine = state?.engine;

  useEffect(() => {
    if (!engine) return;
    registerCompletion({ id, awarenessScore: engine.awarenessScore, riskScore: engine.totalRisk });
  }, [engine, id, registerCompletion]);

  const [scenario, setScenario] = React.useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/scenarios/${id}`);
        if (res.ok) {
          const data = await res.json();
          setScenario(data);
        }
      } catch {
        // ignore
      }
    };
    load();
  }, [id]);

  if (!engine) {
    return (
      <div className="space-y-3 text-sm text-slate-300">
        <p>This result page works best when opened right after finishing a simulation.</p>
        <button className="btn-primary" onClick={() => navigate('/scams')}>
          Go to scam list
        </button>
      </div>
    );
  }

  const { awarenessScore, totalRisk, riskBand, missedRedFlags } = engine;

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <button className="text-xs text-slate-400 hover:text-slate-200" onClick={() => navigate('/scams')}>
          ← Back to scam list
        </button>
        <h1 className="text-2xl font-bold text-slate-50">Your learning summary</h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          This is a safe practice environment. Use what you learned here to protect your money and identity in real
          life.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-[1.5fr_minmax(0,1fr)] items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <ScoreBadge score={awarenessScore} />
            <div className="space-y-1 text-sm">
              <div className="text-slate-300">
                Awareness score: <span className="font-semibold text-slate-50">{awarenessScore}/100</span>
              </div>
              <div className="text-xs text-slate-400">Total risk points accumulated: {totalRisk}</div>
              <RiskBadge band={riskBand} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-100 space-y-2">
            <h2 className="font-semibold">Scam psychology used on you</h2>
            <p className="text-slate-300 text-xs">
              Most scams play with your feelings – fear of losing access, urgency, greed, or respect for authority.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {(scenario?.psychologyTriggers || []).map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-slate-800 px-3 py-1 uppercase tracking-wide text-slate-200"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-100 space-y-3">
          <h2 className="font-semibold">Red flags you should watch for</h2>
          {missedRedFlags.length === 0 ? (
            <p className="text-xs text-safe">
              Great job – you caught the main red flags in this scenario. Keep practicing with other scam types.
            </p>
          ) : (
            <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
              {missedRedFlags.map((flag) => (
                <li key={flag}>{flag.replace(/-/g, ' ')}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-100 space-y-2">
        <h2 className="font-semibold">Real-world prevention tips</h2>
        <p className="text-xs text-slate-300">
          Apply these simple rules whenever you see similar messages in real life:
        </p>
        <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1">
          {(scenario?.preventionTips || []).map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => navigate('/scams')}>
          Try another scam
        </button>
        <button className="btn-secondary" onClick={() => navigate(`/simulate/${id}`)}>
          Replay this scenario
        </button>
      </section>
    </div>
  );
};

export default ResultPage;
