import React from 'react';

const Section = ({ title, children }) => (
  <div className="space-y-1">
    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {title}
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-100">
      {children}
    </div>
  </div>
);

const deviceLabelByType = {
  email: 'Email on your phone',
  website: 'Bank / shopping website',
  upi: 'UPI payment screen',
  sms: 'SMS / WhatsApp message',
};

const deviceKindByType = {
  email: 'desktop',
  website: 'desktop',
  upi: 'phone',
  sms: 'phone',
};

const StepCard = ({ step }) => {
  if (!step) return null;
  const { type, title, message } = step;

  const device = deviceKindByType[type] || 'desktop';
  const deviceLabel = deviceLabelByType[type] || 'On-screen message';

  const frameClass =
    device === 'phone'
      ? 'relative mx-auto w-full max-w-sm rounded-[2.25rem] border border-slate-800 bg-slate-950/80 px-3 py-4 shadow-2xl shadow-black/60'
      : 'relative w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5 shadow-xl shadow-black/50';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span className="uppercase tracking-wide">Simulated screen</span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] text-slate-200">
          {deviceLabel}
        </span>
      </div>

      <div className={frameClass}>
        {device === 'phone' && (
          <div className="mb-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>12:30</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-6 rounded-full bg-slate-600" />
              <span className="h-3 w-3 rounded-full bg-slate-600" />
            </div>
          </div>
        )}

        {device === 'desktop' && (
          <div className="mb-3 flex items-center gap-2 text-[10px] text-slate-500">
            <div className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500/70" />
              <span className="h-2 w-2 rounded-full bg-amber-500/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
            </div>
            <span className="truncate">{deviceLabel}</span>
          </div>
        )}

        <h2 className="mb-2 text-sm font-semibold text-slate-100 sm:text-base">{title}</h2>

        {type === 'email' && (
          <div className="space-y-3 text-sm">
            <Section title="From">
              <div className="font-mono text-xs">
                {message.fromName} &lt;{message.fromAddress}&gt;
              </div>
            </Section>
            <Section title="To">
              <div className="font-mono text-xs">{message.to}</div>
            </Section>
            <Section title="Subject">
              <div className="font-semibold text-amber-300">{message.subject}</div>
            </Section>
            <Section title="Email body">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-100">
                {message.body}
              </pre>
            </Section>
          </div>
        )}

        {type === 'website' && (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 text-xs font-mono flex items-center gap-2">
              <span
                className={`inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold ${
                  message.padlock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}
              >
                {message.padlock ? 'HTTPS' : 'NOT SECURE'}
              </span>
              <span className="truncate">{message.url}</span>
            </div>
            <Section title="What you see on screen">
              <p className="leading-relaxed text-slate-100">{message.content}</p>
            </Section>
          </div>
        )}

        {type === 'upi' && (
          <div className="space-y-3 text-sm">
            <Section title="UPI alert on screen">
              <p className="font-semibold text-slate-100">From: {message.from}</p>
              <p className="mt-1 leading-relaxed text-slate-100">{message.text}</p>
              {message.note && (
                <p className="mt-2 text-xs text-slate-400">{message.note}</p>
              )}
            </Section>
          </div>
        )}

        {type === 'sms' && (
          <div className="space-y-3 text-sm">
            <Section title="Sender">
              <p className="font-mono text-xs">{message.from}</p>
            </Section>
            <Section title="Message text">
              <p className="leading-relaxed text-slate-100">{message.text}</p>
              {message.note && (
                <p className="mt-2 text-xs text-slate-400">{message.note}</p>
              )}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;
