import { type FieldErrors } from "react-hook-form";
import { type FitScoreForm } from "../schemas/fitScoreSchema";

const REQUIRED_MSG = "Preencha este campo obrigatório";

export function getErrorTextFor(
  errors: FieldErrors<FitScoreForm>,
  key: keyof FitScoreForm
): string | undefined {
  const err = errors[key];
  if (!err) return undefined;

  if (key !== "name" && key !== "email") return REQUIRED_MSG;
  return (err.message as string) || REQUIRED_MSG;
}
