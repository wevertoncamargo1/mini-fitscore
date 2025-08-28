import { useCallback, useState } from "react";

export type StepConfig = {
  id: number;                            
  validate?: () => Promise<boolean> | boolean; 
  beforeNext?: () => Promise<boolean> | boolean; 
};

export function useMultiStepForm(steps: StepConfig[], start = 1) {
  const [step, setStep] = useState(start);
  const maxStep = steps.length;
  const current = steps.find(s => s.id === step);

  const next = useCallback(async () => {
    if (!current) return;

    if (current.validate) {
      const ok = await current.validate();
      if (!ok) return false;
    }
    if (current.beforeNext) {
      const ok = await current.beforeNext();
      if (!ok) return false;
    }

    setStep(s => Math.min(s + 1, maxStep));
    return true;
  }, [current, maxStep]);

  const prev = useCallback(() => {
    setStep(s => Math.max(s - 1, 1));
  }, []);

  const reset = useCallback(() => setStep(start), [start]);

  return {
    step,
    maxStep,
    isFirst: step === 1,
    isLast: step === maxStep,
    next,
    prev,
    reset,
  };
}
