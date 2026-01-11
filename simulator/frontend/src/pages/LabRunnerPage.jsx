import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSimulationLab } from '../labs/SimulationLabContext.jsx';
import PhishingEmailLabView from '../labs/PhishingEmailLabView.jsx';
import FakeWebsiteLabView from '../labs/FakeWebsiteLabView.jsx';
import UpiQrLabView from '../labs/UpiQrLabView.jsx';

const LabRunnerPage = () => {
  const { labId } = useParams();
  const navigate = useNavigate();
  const { currentLab, currentSessionId, startSession, logEvent, endSession } = useSimulationLab();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [initialized, setInitialized] = useState(false);

  // Start a fresh session when entering a lab
  useEffect(() => {
    // Skip if already initialized for this labId
    if (initialized) return;

    const initSession = async () => {
      try {
        setLoading(true);
        setError(null);
        // Always force a new session for fresh tracking
        await startSession(labId, true);
        setStartTime(Date.now());
        setInitialized(true);
      } catch (err) {
        setError(err.message || 'Could not start lab');
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, [labId, initialized, startSession]);

  // Reset initialized when labId changes
  useEffect(() => {
    setInitialized(false);
    setLoading(true);
    setStartTime(null);
    setElapsedTime(0);
  }, [labId]);

  // Timer effect
  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = async () => {
    try {
      logEvent('exit-lab', {});
      const result = await endSession();
      navigate(`/labs/${labId}/debrief/${result.sessionId}`, { state: result });
    } catch (err) {
      console.error('Error ending session:', err);
      navigate(`/labs`);
    }
  };

  const handleEvent = (type, payload) => {
    logEvent(type, payload);
  };

  if (loading || !currentLab) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <div className="space-y-1">
            <p className="text-slate-300 font-medium">Preparing Lab Environment</p>
            <p className="text-xs text-slate-500">Loading simulation assets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="card p-8 text-center max-w-md space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-rose-400 font-medium">Failed to Load Lab</p>
            <p className="text-sm text-slate-400 mt-1">{error}</p>
          </div>
          <button onClick={() => navigate('/labs')} className="btn-secondary">
            Return to Labs
          </button>
        </div>
      </div>
    );
  }

  let View;
  if (currentLab.type === 'email-lab') View = PhishingEmailLabView;
  else if (currentLab.type === 'fake-website-lab') View = FakeWebsiteLabView;
  else if (currentLab.type === 'upi-qr-lab') View = UpiQrLabView;

  if (!View) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="card p-8 text-center">
          <p className="text-slate-400">Unknown lab type: {currentLab.type}</p>
          <button onClick={() => navigate('/labs')} className="btn-secondary mt-4">
            Return to Labs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Lab Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/labs')}
            className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Exit
          </button>
          <div className="h-4 w-px bg-cyber-700" />
          <div>
            <h1 className="text-lg font-semibold text-white">{currentLab.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-800/50 border border-cyber-700/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-mono text-slate-300">{formatTime(elapsedTime)}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs text-rose-400">Recording</span>
          </div>
        </div>
      </header>

      <div className="text-center py-2">
        <p className="text-xs text-slate-500">
          Explore this environment as you would in real life. When done, click "Exit Lab" to see your results.
        </p>
      </div>

      <View lab={currentLab} onEvent={handleEvent} onExit={handleExit} />
    </div>
  );
};

export default LabRunnerPage;
