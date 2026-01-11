import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSimulationContext } from '../context/SimulationContext.jsx';

const Layout = ({ children }) => {
  const { bestScore, completedScenarios } = useSimulationContext();
  const location = useLocation();

  // Check if we're in an active lab simulation
  const isInLab = location.pathname.includes('/labs/') && !location.pathname.includes('/debrief');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - hidden during active simulation for immersion */}
      {!isInLab && (
        <header className="border-b border-cyan-500/10 bg-cyber-800/80 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-lg group-hover:bg-cyan-500/30 transition-colors" />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-xl font-bold shadow-lg">
                  CG
                </span>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                  CyberGuardian.AI
                </div>
                <div className="text-xs text-slate-400">
                  Hands-On Scam Simulation Lab
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                to="/labs"
                className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/labs')
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Labs
              </Link>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    <span className="font-semibold text-white">{completedScenarios.length}</span> labs completed
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-700/50 border border-cyan-500/20">
                  <span className="text-slate-300">Best Score:</span>
                  <span className="font-bold text-emerald-400">{bestScore}</span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isInLab ? '' : ''}`}>
        <div className={`mx-auto ${isInLab ? 'max-w-7xl px-4 py-4' : 'max-w-6xl px-4 py-8 sm:py-12'}`}>
          {children}
        </div>
      </main>

      {/* Footer - hidden during active simulation */}
      {!isInLab && (
        <footer className="border-t border-cyan-500/10 bg-cyber-800/50">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
              <span>Learn to spot scams in a safe environment • No real money involved</span>
            </div>
            <span className="hidden sm:inline text-slate-600">
              India-focused scenarios • Educational purpose only
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
