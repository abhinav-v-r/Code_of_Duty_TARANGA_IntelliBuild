import React, { createContext, useContext, useState, useCallback } from 'react';

const SimulationLabContext = createContext(null);

export const SimulationLabProvider = ({ children }) => {
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [currentLab, setCurrentLab] = useState(null);
  const [events, setEvents] = useState([]);

  const startSession = useCallback(async (labId, forceNew = false) => {
    // If forceNew is true or labId is different, always create a new session
    if (!forceNew && currentLab && currentLab.id === labId && currentSessionId) {
      // Return existing session data
      return { sessionId: currentSessionId, lab: currentLab };
    }

    // Clear previous session state first
    setCurrentSessionId(null);
    setCurrentLab(null);
    setEvents([]);

    const res = await fetch(`http://localhost:4000/api/labs/${labId}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error('Failed to start lab session');
    }
    const data = await res.json();
    setCurrentSessionId(data.sessionId);
    setCurrentLab(data.lab);
    setEvents([]);
    return data;
  }, [currentLab, currentSessionId]);

  const resetSession = useCallback(() => {
    setCurrentSessionId(null);
    setCurrentLab(null);
    setEvents([]);
  }, []);

  const logEvent = useCallback(
    async (type, payload = {}) => {
      if (!currentSessionId) return;
      const event = { type, payload, ts: Date.now() };
      setEvents((prev) => [...prev, event]);
      try {
        await fetch(`http://localhost:4000/api/sessions/${currentSessionId}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ events: [event] }),
        });
      } catch (e) {
        // For this lab, we ignore transient errors; events are still kept locally.
      }
    },
    [currentSessionId]
  );

  const endSession = useCallback(async () => {
    if (!currentSessionId) {
      throw new Error('No active session');
    }
    const res = await fetch(`http://localhost:4000/api/sessions/${currentSessionId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error('Failed to complete session');
    }
    const data = await res.json();

    // Reset session after completion so replay starts fresh
    setCurrentSessionId(null);
    setCurrentLab(null);
    setEvents([]);

    return data;
  }, [currentSessionId]);

  const value = {
    currentSessionId,
    currentLab,
    events,
    startSession,
    resetSession,
    logEvent,
    endSession,
  };

  return <SimulationLabContext.Provider value={value}>{children}</SimulationLabContext.Provider>;
};

export const useSimulationLab = () => {
  const ctx = useContext(SimulationLabContext);
  if (!ctx) {
    throw new Error('useSimulationLab must be used within SimulationLabProvider');
  }
  return ctx;
};
