import type { FitScoreForm } from "../schemas/fitScoreSchema";

export function computeFitScore(values: FitScoreForm) {
  const perf = (values.perf_exp + values.perf_entregas + values.perf_habs + values.perf_extra) / 4 / 10;
  const eng  = (values.eng_dispon + values.eng_prazos + values.eng_pressao + values.eng_extra) / 4 / 10;
  const cult = (values.cult_valores_1 + values.cult_valores_2) / 2 / 10;

  const score = Math.round(100 * (0.4 * perf + 0.3 * eng + 0.3 * cult));

  let classification = "";
  if (score >= 80) classification = "Fit Altíssimo";
  else if (score >= 60) classification = "Fit Aprovado";
  else if (score >= 40) classification = "Fit Questionável";
  else classification = "Fora do Perfil";

  return { score, classification };
}
