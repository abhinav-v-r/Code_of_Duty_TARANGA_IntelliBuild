import { useMemo, useState } from 'react';

export function useSimulationEngine(scenario) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [decisions, setDecisions] = useState([]); // { stepId, optionId, riskImpact, riskLevel, isCorrect, redFlagKeys }
  const [isComplete, setIsComplete] = useState(false);
  const [lastSelectedOption, setLastSelectedOption] = useState(null);

  const totalRisk = useMemo(
    () => decisions.reduce((sum, d) => sum + (d.riskImpact || 0), 0),
    [decisions]
  );

  const awarenessScore = useMemo(() => {
    const raw = 100 - totalRisk;
    if (raw < 0) return 0;
    if (raw > 100) return 100;
    return Math.round(raw);
  }, [totalRisk]);

  const riskBand = useMemo(() => {
    if (awarenessScore >= 80) return 'Safe';
    if (awarenessScore >= 50) return 'Risky';
    return 'Dangerous';
  }, [awarenessScore]);

  const currentStep = scenario?.steps?.[currentStepIndex] ?? null;

  const selectOption = (option) => {
    if (!currentStep || !option) return;

    const decision = {
      stepId: currentStep.id,
      optionId: option.id,
      riskImpact: option.riskImpact ?? 0,
      riskLevel: option.riskLevel,
      isCorrect: !!option.isCorrect,
      redFlagKeys: option.redFlagKeys || [],
      explanation: option.explanation,
      label: option.label,
    };

    setDecisions((prev) => {
      const others = prev.filter((d) => d.stepId !== currentStep.id);
      return [...others, decision];
    });
    setLastSelectedOption(option);

    const isLastStep = currentStepIndex >= (scenario.steps?.length || 0) - 1;
    if (isLastStep) {
      setIsComplete(true);
    } else {
      setCurrentStepIndex((idx) => idx + 1);
    }
  };

  const reset = () => {
    setCurrentStepIndex(0);
    setDecisions([]);
    setIsComplete(false);
    setLastSelectedOption(null);
  };

  const missedRedFlags = useMemo(() => {
    const flags = new Set();
    (scenario?.steps || []).forEach((step) => {
      (step.options || []).forEach((opt) => {
        if (!opt.isCorrect && (opt.redFlagKeys || []).length) {
          opt.redFlagKeys.forEach((key) => flags.add(key));
        }
      });
    });
    // Remove flags the user successfully acted on (safe choices)
    decisions
      .filter((d) => d.isCorrect)
      .forEach((d) => {
        (d.redFlagKeys || []).forEach((key) => flags.delete(key));
      });
    return Array.from(flags);
  }, [scenario, decisions]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: scenario?.steps?.length || 0,
    decisions,
    isComplete,
    totalRisk,
    awarenessScore,
    riskBand,
    lastSelectedOption,
    missedRedFlags,
    selectOption,
    reset,
  };
}
