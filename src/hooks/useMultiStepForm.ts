import { useCallback, useState } from "react";

export type StepConfig = {
  id: number;                             // 1..N
  validate?: () => Promise<boolean> | boolean; // validação da etapa (ex: trigger([...]))
  beforeNext?: () => Promise<boolean> | boolean; // checagens extras (ex: e-mail único)
};

export function useMultiStepForm(steps: StepConfig[], start = 1) {
  const [step, setStep] = useState(start);
  const maxStep = steps.length;
  const current = steps.find(s => s.id === step);

  const next = useCallback(async () => {
    if (!current) return;

    // valida a etapa atual, se definido
    if (current.validate) {
      const ok = await current.validate();
      if (!ok) return false;
    }
    // checagens adicionais (ex.: e-mail) antes de avançar
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
