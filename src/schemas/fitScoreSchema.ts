import { z } from "zod";

export const fitScoreSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),

  // Performance (4)
  perf_exp: z.number().min(0).max(10),
  perf_entregas: z.number().min(0).max(10),
  perf_habs: z.number().min(0).max(10),
  perf_extra: z.number().min(0).max(10), // nova pergunta

  // Energia (4)
  eng_dispon: z.number().min(0).max(10),
  eng_prazos: z.number().min(0).max(10),
  eng_pressao: z.number().min(0).max(10),
  eng_extra: z.number().min(0).max(10), // nova pergunta

  // Cultura (2)
  cult_valores_1: z.number().min(0).max(10),
  cult_valores_2: z.number().min(0).max(10),
});

export type FitScoreForm = z.infer<typeof fitScoreSchema>;
