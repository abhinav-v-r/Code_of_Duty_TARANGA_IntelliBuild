import React, { createContext, useContext, useState } from 'react';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [completedScenarios, setCompletedScenarios] = useState([]); // { id, awarenessScore, riskScore }

  const registerCompletion = (result) => {
    setCompletedScenarios((prev) => {
      const existing = prev.find((r) => r.id === result.id);
      if (existing) {
        return prev.map((r) => (r.id === result.id ? { ...existing, ...result } : r));
      }
      return [...prev, result];
    });
  };

  const bestScore = completedScenarios.reduce(
    (max, r) => (r.awarenessScore > max ? r.awarenessScore : max),
    0
  );

  const value = {
    completedScenarios,
    bestScore,
    registerCompletion,
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
};

export const useSimulationContext = () => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulationContext must be used within SimulationProvider');
  return ctx;
};
