import React from 'react';

const ProgressBar = ({ current, total }) => {
  if (!total) return null;
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>
          Step {current + 1} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-safe transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
