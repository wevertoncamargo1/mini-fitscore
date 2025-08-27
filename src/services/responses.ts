import { supabase } from "../lib/supabase";
import { type FitScoreForm } from "../schemas/fitScoreSchema";

export async function insertFitScoreResponse(
  candidateId: number,
  answers: Omit<FitScoreForm, "name" | "email"> & { score: number; classification: string }
) {
  const { error } = await supabase.from("fitscore_responses").insert({
    candidate_id: candidateId,
    ...answers,
  });
  if (error) throw error;
}
