import React from 'react';

function getTitle(score) {
  if (score >= 80) return 'Scam Survivor';
  if (score >= 50) return 'Cautious Clicker';
  return 'Scam Newbie';
}

function getColor(score) {
  if (score >= 80) return 'bg-safe/15 text-safe border-safe/40';
  if (score >= 50) return 'bg-risky/15 text-risky border-risky/40';
  return 'bg-dangerous/15 text-dangerous border-dangerous/40';
}

const ScoreBadge = ({ score }) => {
  const title = getTitle(score ?? 0);
  const color = getColor(score ?? 0);

  return (
    <div
      className={`inline-flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-sm font-medium ${color}`}
    >
      <span className="text-xs uppercase tracking-wide text-slate-300">Your level</span>
      <span className="text-base">{title}</span>
    </div>
  );
};

export default ScoreBadge;
