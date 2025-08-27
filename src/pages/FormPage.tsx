import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fitScoreSchema, type FitScoreForm } from "../schemas/fitScoreSchema";
import { computeFitScore } from "../lib/computeFitScore";
import { useState } from "react";
import FormCard from "../components/ui/FormCard";
import StepBasicData from "../components/steps/StepBasicData";
import StepPerformance from "../components/steps/StepPerformance";
import StepEnergy from "../components/steps/StepEnergy";
import StepCulture from "../components/steps/StepCulture";
import StepNavigator from "../components/ui/StepNavigator";
import FeedbackSnackbar from "../components/ui/FeedbackSnackbar";
import { cultQs, engQs, perfQs } from "../config/questions";
import Screen from "../components/layout/Screen";
import { useMultiStepForm, type StepConfig } from "../hooks/useMultiStepForm";
import CenteredCard from "../components/ui/CenteredCard";
import { insertFitScoreResponse } from "../services/responses";
import { upsertCandidate } from "../services/candidates";
import { useEmailCheck } from "../hooks/useEmailCheck";

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  const {
    checking: emailChecking,
    taken: emailTaken,
    verify: verifyEmail,
  } = useEmailCheck();

  const steps: StepConfig[] = [
    {
      id: 1,
      validate: () => trigger(["name", "email"], { shouldFocus: true }),
      beforeNext: async () => {
        const formEl = document.querySelector("form") as HTMLFormElement;
        const email = String(new FormData(formEl).get("email") || "");
        return verifyEmail(email);
      },
    },
    {
      id: 2,
      validate: () =>
        trigger(perfQs.map(([k]) => k) as any, { shouldFocus: true }),
    },
    {
      id: 3,
      validate: () =>
        trigger(engQs.map(([k]) => k) as any, { shouldFocus: true }),
    },
    {
      id: 4,
      validate: () =>
        trigger(cultQs.map(([k]) => k) as any, { shouldFocus: true }),
    },
  ];

  const { step, maxStep, next, prev } = useMultiStepForm(steps);

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FitScoreForm>({
    resolver: zodResolver(fitScoreSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FitScoreForm) => {
    try {
      setLoading(true);
      const { score, classification } = computeFitScore(values);

      const { id } = await upsertCandidate(values.name, values.email);
      const { name, email, ...answers } = values;

      await insertFitScoreResponse(id, {
        ...(answers as any),
        score,
        classification,
      });

      try {
        await fetch(import.meta.env.VITE_N8N_WEBHOOK_CONFIRM!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            score,
            classification,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error("n8n confirm email error", e);
      }

      setSnackbar({
        open: true,
        type: "success",
        message: "Candidatura enviada com sucesso",
      });
      setTimeout(() => setSubmitted(true), 3000);
    } catch {
      setSnackbar({
        open: true,
        type: "error",
        message: "Temos um erro por aqui",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <CenteredCard
        title="Obrigado por sua candidatura"
        subtitle="Boa sorte! Em breve nosso time entrará em contato."
      />
    );
  }

  return (
    <Screen>
      <FormCard>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {step === 1 && (
            <StepBasicData
              register={register}
              errors={errors}
              emailTaken={emailTaken}
            />
          )}

          {step === 2 && <StepPerformance control={control} errors={errors} />}

          {step === 3 && <StepEnergy control={control} errors={errors} />}

          {step === 4 && <StepCulture control={control} errors={errors} />}

          <StepNavigator
            step={step}
            maxStep={maxStep}
            loading={loading}
            nextDisabled={emailChecking}
            onPrev={prev}
            onNext={next}
            onSubmit={handleSubmit(onSubmit)}
          />
        </form>
      </FormCard>
      <FeedbackSnackbar
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Screen>
  );
}
