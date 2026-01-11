import React from 'react';

const base =
  'w-full text-left flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm transition hover:border-primary/60 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/60';

const DecisionButton = ({ option, onSelect }) => {
  return (
    <button type="button" className={base} onClick={() => onSelect(option)}>
      <span className="flex-1 font-medium text-slate-100">{option.label}</span>
      <span className="text-xs text-slate-400" aria-hidden="true">
        Tap to choose →
      </span>
    </button>
  );
};

export default DecisionButton;
