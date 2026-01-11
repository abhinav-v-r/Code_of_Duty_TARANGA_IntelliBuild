import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSimulationEngine } from '../hooks/useSimulationEngine.js';
import StepCard from '../components/StepCard.jsx';
import DecisionButton from '../components/DecisionButton.jsx';
import FeedbackPanel from '../components/FeedbackPanel.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

const SimulatorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:4000/api/scenarios/${id}`);
        if (!res.ok) throw new Error('Failed to load scenario');
        const data = await res.json();
        setScenario(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const engine = useSimulationEngine(scenario || { steps: [] });
  const { currentStep, currentStepIndex, totalSteps, selectOption, lastSelectedOption, isComplete } = engine;

  useEffect(() => {
    if (isComplete && scenario) {
      // Navigate to result page with minimal state
      navigate(`/results/${scenario.id}`, { state: { engine } });
    }
  }, [isComplete, scenario, navigate]);

  if (loading) {
    return <div className="text-sm text-slate-300">Loading scenario…</div>;
  }

  if (error || !scenario) {
    return (
      <div className="space-y-3 text-sm text-slate-300">
        <p>Could not load this scenario.</p>
        <p className="text-red-400 text-xs">{error}</p>
        <button className="btn-secondary" onClick={() => navigate('/scams')}>
          Back to scam list
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <button className="text-xs text-slate-400 hover:text-slate-200" onClick={() => navigate('/scams')}>
          ← Back to scam list
        </button>
        <h1 className="text-2xl font-bold text-slate-50">{scenario.title}</h1>
        <p className="text-sm text-slate-300 max-w-2xl">{scenario.description}</p>
      </header>

      <ProgressBar current={currentStepIndex} total={totalSteps} />

      <StepCard step={currentStep} />

      <div className="space-y-3 mt-4">
        <div className="text-xs uppercase tracking-wide text-slate-400">What would you do?</div>
        <div className="grid gap-2">
          {currentStep?.options?.map((opt) => (
            <DecisionButton key={opt.id} option={opt} onSelect={selectOption} />
          ))}
        </div>
      </div>

      <FeedbackPanel lastSelectedOption={lastSelectedOption} riskBandForScenario={engine.riskBand} />
    </div>
  );
};

export default SimulatorPage;
