import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fitScoreSchema, type FitScoreForm } from "../schemas/fitScoreSchema";
import { computeFitScore } from "../lib/computeFitScore";
import { supabase } from "../lib/supabase";
import { useMemo, useState } from "react";
import {
  Snackbar,
  Alert,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from "@mui/material";
import { Controller } from "react-hook-form";

const BG_DARK = "#0b1a3a"; // fundo (azul escuro)
const BORDER_BLUE = "#3b82f6"; // borda do card (azul claro)

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });


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

  // opções 1..10
  const options = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + 1),
    []
  );
  // perto do topo do componente
  const requiredMsg = "Preencha este campo obrigatório";

  // helper para padronizar texto de erro
  const getErrorTextFor = (key: keyof FitScoreForm) => {
    const err = errors[key];
    if (!err) return undefined;
    // Para todos os NUMÉRICOS, força a mensagem amigável
    if (key !== "name" && key !== "email") return requiredMsg;
    // Para name/email, usa a mensagem do schema (ex.: "E-mail inválido")
    return (err.message as string) || requiredMsg;
  };

  async function checkEmailExists(email: string) {
    const emailNorm = email.trim().toLowerCase();
    if (!emailNorm) return false;
    setEmailChecking(true);
    const { count, error } = await supabase
      .from("candidates")
      .select("id", { count: "exact", head: true })
      .ilike("email", emailNorm); // case-insensitive
    setEmailChecking(false);
    if (error) return false; // silenciosamente não bloqueia em erro de rede
    return (count ?? 0) > 0;
  }



  // afirmações
  const perfQs: Array<[keyof FitScoreForm, string]> = [
    [
      "perf_exp",
      "Sou proativo(a) e tomo iniciativa para ajudar quando necessário.",
    ],
    [
      "perf_entregas",
      "Costumo entregar minhas tarefas dentro dos prazos combinados.",
    ],
    ["perf_habs", "Aprendo novas ferramentas e tecnologias com facilidade."],
    [
      "perf_extra",
      "Mantenho a qualidade técnica das minhas entregas de forma consistente.",
    ],
  ];

  const engQs: Array<[keyof FitScoreForm, string]> = [
    ["eng_dispon", "Tenho disponibilidade e ritmo para me dedicar à empresa."],
    ["eng_prazos", "Lido bem com prazos curtos e demandas urgentes."],
    ["eng_pressao", "Mantenho produtividade mesmo sob pressão."],
    [
      "eng_extra",
      "Sustento um bom nível de energia ao longo da semana de trabalho.",
    ],
  ];

  const cultQs: Array<[keyof FitScoreForm, string]> = [
    [
      "cult_valores_1",
      "Atuo com sentimento de dono, cuidando do negócio como se fosse meu.",
    ],
    [
      "cult_valores_2",
      "Busco aprender continuamente e disseminar conhecimento (inclusive para juniors).",
    ],
  ];

  const onSubmit = async (values: FitScoreForm) => {
    setLoading(true);

    const { score, classification } = computeFitScore(values);

    const { data: candidate, error: errC } = await supabase
      .from("candidates")
      .upsert({ name: values.name, email: values.email }, { onConflict: "email" })
      .select("id")
      .single();

    if (errC || !candidate) {
      setSnackbar({ open: true, type: "error", message: "Temos um erro por aqui" });
      setLoading(false);
      return;
    }

    const { name, email, ...answers } = values;
    const { error: errR } = await supabase.from("fitscore_responses").insert({
      candidate_id: candidate.id,
      ...answers,
      score,
      classification,
    });

    if (errR) {
      setSnackbar({ open: true, type: "error", message: "Temos um erro por aqui" });
      setLoading(false);
      return;
    }

    // sucesso
    setSnackbar({
      open: true,
      type: "success",
      message: "Candidatura enviada com sucesso",
    });
    setLoading(false);

    // espera 3 segundos (tempo do snackbar) e depois mostra a tela de obrigado
    setTimeout(() => {
      setSubmitted(true);
    }, 3000);
    setLoading(false);
  };

  const nextStep = async () => {
    let fields: (keyof FitScoreForm)[] = [];
    if (step === 1) fields = ["name", "email"];
    if (step === 2) fields = perfQs.map((q) => q[0]);
    if (step === 3) fields = engQs.map((q) => q[0]);
    if (step === 4) fields = cultQs.map((q) => q[0]);

    // valida os campos desta etapa
    const ok = await trigger(fields as any, { shouldFocus: true });
    if (!ok) return;

    // se for a etapa 1, checa e-mail antes de avançar
    if (step === 1) {
      const formData = new FormData(document.querySelector("form") as HTMLFormElement);
      const email = String(formData.get("email") || "");
      const exists = await checkEmailExists(email);
      setEmailTaken(exists);
      if (exists) return; // bloqueia avanço
    }

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  function Combo({
    control,
    name,
    label,
    errorText,
  }: {
    control: any;
    name: keyof FitScoreForm;
    label: string;
    errorText?: string;
  }) {
    return (
      <FormControl fullWidth margin="normal" error={!!errorText}>
        <InputLabel>{label}</InputLabel>
        <Controller
          control={control}
          name={name as any}
          render={({ field }) => (
            <Select
              {...field}
              label={label}
              value={field.value ?? ""}          // começa vazio
              displayEmpty
              onChange={(e) => field.onChange(Number(e.target.value))} // envia número
            >
              <MenuItem value={-1} disabled>
                Selecione 1–10 (1 = Não concordo · 10 = Concordo plenamente)
              </MenuItem>
              {options.map((n) => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </Select>
          )}
        />
        {errorText && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    );
  }

  if (submitted) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: BG_DARK, display: "grid", placeItems: "center", p: 2 }}>
        <Box
          sx={{
            maxWidth: 640,
            width: "90%",
            bgcolor: "white",
            color: "#0b1a3a",
            borderRadius: 3,
            border: `2px solid ${BORDER_BLUE}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            p: { xs: 3, md: 4 },
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Obrigado por sua candidatura
          </Typography>
          <Typography variant="body1">
            Boa sorte! Em breve nosso time entrará em contato.
          </Typography>
        </Box>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG_DARK,
        display: "flex",
        alignItems: "flex-start",
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 760,
          mx: "auto",
          width: { xs: "85%", sm: "80%", md: "70%" }, // mais folga no mobile
          bgcolor: "white",
          color: "#0b1a3a",
          borderRadius: 3,
          border: `2px solid ${BORDER_BLUE}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          p: { xs: 2, sm: 3, md: 4 }, // 👈 padding responsivo
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
          Formulário FitScore
        </Typography>
        <Typography variant="body2" sx={{ color: "#334155", mb: 0 }}>
          Responda às perguntas abaixo para calcular seu FitScore.
        </Typography>
        <Typography variant="body2" sx={{ color: "#334155", mb: 0 }}>
          O formulário é dividido em etapas para facilitar o preenchimento.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {step === 1 && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Dados Básicos
              </Typography>
              <TextField
                label="Nome"
                fullWidth
                margin="normal"
                required
                error={!!errors.name}
                helperText={getErrorTextFor("name")}
                {...register("name")}
              />
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                margin="normal"
                required
                error={!!errors.email || emailTaken}
                helperText={
                  emailTaken
                    ? "Este e-mail já foi utilizado nesta avaliação."
                    : errors.email?.message
                }
                {...register("email")}
              />

            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Performance
              </Typography>
              {perfQs.map(([f, q]) => (
                <Combo
                  key={String(f)}
                  control={control}
                  name={f}
                  label={q}
                  errorText={getErrorTextFor(f)}
                />
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Energia
              </Typography>
              {engQs.map(([f, q]) => (
                <Combo
                  key={String(f)}
                  control={control}
                  name={f}
                  label={q}
                  errorText={getErrorTextFor(f)}
                />
              ))}
            </>
          )}

          {step === 4 && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Cultura
              </Typography>
              {cultQs.map(([f, q]) => (
                <Combo
                  key={String(f)}
                  control={control}
                  name={f}
                  label={q}
                  errorText={getErrorTextFor(f)}
                />
              ))}
            </>
          )}

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            {step > 1 ? (
              <Button
                variant="outlined"
                onClick={prevStep}
                sx={{ borderColor: BORDER_BLUE, color: BG_DARK }}
              >
                Voltar
              </Button>
            ) : (
              <span />
            )}

            {step < 4 && (
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={emailChecking}          // ← evita múltiplos cliques durante checagem
                sx={{ bgcolor: BG_DARK }}
              >
                {emailChecking ? "Verificando..." : "Próximo"}
              </Button>
            )}


            {step === 4 && (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ bgcolor: BG_DARK }}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // 3 segundos
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // canto inferior esquerdo
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>

  );
}
