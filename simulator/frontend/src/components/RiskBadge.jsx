import React from 'react';

const colorMap = {
  Safe: 'bg-safe/10 text-safe border-safe/40',
  Risky: 'bg-risky/10 text-risky border-risky/40',
  Dangerous: 'bg-dangerous/10 text-dangerous border-dangerous/40',
};

const labelMap = {
  Safe: 'Safe',
  Risky: 'Risky',
  Dangerous: 'Dangerous',
};

const RiskBadge = ({ band }) => {
  if (!band) return null;
  const color = colorMap[band] || 'bg-slate-800 text-slate-200 border-slate-700';
  const label = labelMap[band] || band;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${color}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {label}
    </span>
  );
};

export default RiskBadge;
