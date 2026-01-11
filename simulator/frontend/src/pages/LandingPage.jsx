import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-800/50 border border-cyan-500/20 text-xs text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>TryHackMe-Style Interactive Training</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Experience Real Scams</span>
            <br />
            <span className="text-gradient">In a Safe Environment</span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CyberGuardian.AI puts you inside realistic phishing emails, fake websites, and UPI scams.
            Make choices, explore freely, and discover what would have happened —
            <span className="text-white font-medium"> only after you exit</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2"
              onClick={() => navigate('/labs')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Enter Simulation Lab
            </button>
            <button
              className="btn-secondary text-base"
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { value: '3', label: 'Simulation Labs', icon: '🎮' },
          { value: '15+', label: 'Trap Scenarios', icon: '⚠️' },
          { value: '100%', label: 'Safe Learning', icon: '🛡️' },
          { value: '₹0', label: 'Real Money Risk', icon: '💰' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How It Works</h2>
          <p className="text-slate-400 mt-2">No quizzes. No instant feedback. Real learning.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="card-hover p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/20 flex items-center justify-center text-2xl">
              1
            </div>
            <h3 className="text-lg font-semibold text-white">Enter the Environment</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              You're placed in a realistic scam scenario — a suspicious email, a fake shopping site,
              or a WhatsApp chat. The environment looks and feels real.
            </p>
          </div>

          <div className="card-hover p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-2xl">
              2
            </div>
            <h3 className="text-lg font-semibold text-white">Explore Freely</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Click links, enter credentials, scan QR codes — do whatever you'd normally do.
              No warnings, no hints. We silently track every action you take.
            </p>
          </div>

          <div className="card-hover p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/20 flex items-center justify-center text-2xl">
              3
            </div>
            <h3 className="text-lg font-semibold text-white">Learn From Debrief</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Only when you exit, we reveal your mistakes, missed red flags,
              real-world consequences, and how to protect yourself next time.
            </p>
          </div>
        </div>
      </section>

      {/* Labs Preview */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Available Labs</h2>
          <p className="text-slate-400 mt-2">Three realistic scam environments to explore</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="card-hover p-6 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-rose-300 transition-colors">
                Phishing Email Lab
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                Realistic inbox with bank KYC emails, suspicious links, and a fake login page.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="badge badge-info">Beginner</span>
              <span className="text-slate-500">~5 min</span>
            </div>
          </div>

          <div className="card-hover p-6 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Fake Website Lab
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                A shopping site with 90% discounts, copied reviews, and a payment page trap.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="badge badge-info">Beginner</span>
              <span className="text-slate-500">~5 min</span>
            </div>
          </div>

          <div className="card-hover p-6 space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                UPI/QR Scam Lab
              </h3>
              <p className="text-sm text-slate-400 mt-2">
                WhatsApp-style chat with a scammer sending a "refund" QR code that steals your money.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="badge badge-info">Beginner</span>
              <span className="text-slate-500">~5 min</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn-primary text-base px-8"
            onClick={() => navigate('/labs')}
          >
            Start Training Now
          </button>
        </div>
      </section>

      {/* Target Audience */}
      <section className="card p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Who Is This For?</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-3">👨‍👩‍👧</div>
            <h3 className="font-semibold text-white">Family Members</h3>
            <p className="text-sm text-slate-400 mt-1">
              Parents, grandparents, and anyone new to digital payments
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="font-semibold text-white">Bank Employees</h3>
            <p className="text-sm text-slate-400 mt-1">
              Train staff to recognize scams and educate customers
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold text-white">Students</h3>
            <p className="text-sm text-slate-400 mt-1">
              Learn safe online habits before entering the real world
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
