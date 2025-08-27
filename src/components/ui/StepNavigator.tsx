import { Box, Button } from "@mui/material";

type Props = {
  step: number;
  maxStep: number;
  loading?: boolean;
  nextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function StepNavigator({
  step, maxStep, loading, nextDisabled, onPrev, onNext, onSubmit
}: Props) {
  const isLast = step === maxStep;
  return (
    <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "space-between" }}>
      {step > 1 ? (
        <Button variant="outlined" onClick={onPrev}>Voltar</Button>
      ) : <span />}

      {!isLast ? (
        <Button variant="contained" onClick={onNext} disabled={!!nextDisabled}>
          {nextDisabled ? "Verificando..." : "Próximo"}
        </Button>
      ) : (
        <Button variant="contained" onClick={onSubmit} disabled={!!loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      )}
    </Box>
  );
}
