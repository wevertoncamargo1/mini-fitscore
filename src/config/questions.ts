import { type FitScoreForm } from "../schemas/fitScoreSchema";

export const perfQs: Array<[keyof FitScoreForm, string]> = [
  ["perf_exp",      "Sou proativo(a) e tomo iniciativa para ajudar quando necessário."],
  ["perf_entregas", "Costumo entregar minhas tarefas dentro dos prazos combinados."],
  ["perf_habs",     "Aprendo novas ferramentas e tecnologias com facilidade."],
  ["perf_extra",    "Mantenho a qualidade técnica das minhas entregas de forma consistente."],
];

export const engQs: Array<[keyof FitScoreForm, string]> = [
  ["eng_dispon",   "Tenho disponibilidade e ritmo para me dedicar à empresa."],
  ["eng_prazos",   "Lido bem com prazos curtos e demandas urgentes."],
  ["eng_pressao",  "Mantenho produtividade mesmo sob pressão."],
  ["eng_extra",    "Sustento um bom nível de energia ao longo da semana de trabalho."],
];

export const cultQs: Array<[keyof FitScoreForm, string]> = [
  ["cult_valores_1", "Atuo com sentimento de dono, cuidando do negócio como se fosse meu."],
  ["cult_valores_2", "Busco aprender continuamente e disseminar conhecimento (inclusive para juniors)."],
];
