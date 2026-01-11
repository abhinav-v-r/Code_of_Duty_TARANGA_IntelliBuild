import React from 'react';
import RiskBadge from './RiskBadge.jsx';

const FeedbackPanel = ({ lastSelectedOption, riskBandForScenario }) => {
  if (!lastSelectedOption) return null;

  const highlightColor = lastSelectedOption.isCorrect ? 'text-safe' : 'text-dangerous';

  return (
    <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-100">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="font-semibold">Why this action is {lastSelectedOption.isCorrect ? 'safe' : 'risky'}:</div>
        <RiskBadge band={lastSelectedOption.riskLevel || riskBandForScenario} />
      </div>
      <p className={`leading-relaxed ${highlightColor}`}>{lastSelectedOption.explanation}</p>
      <p className="mt-2 text-xs text-slate-400">
        Remember: This is only a simulation. In real life, always pause, read carefully and verify using official
        channels.
      </p>
    </div>
  );
};

export default FeedbackPanel;
