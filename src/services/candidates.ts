import { supabase } from "../lib/supabase";

export async function checkEmailExists(email: string) {
  const emailNorm = email.trim().toLowerCase();
  if (!emailNorm) return false;
  const { count } = await supabase
    .from("candidates")
    .select("id", { count: "exact", head: true })
    .ilike("email", emailNorm);
  return (count ?? 0) > 0;
}

export async function upsertCandidate(name: string, email: string) {
  const { data, error } = await supabase
    .from("candidates")
    .upsert({ name, email }, { onConflict: "email" })
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("candidate upsert failed");
  return data; // { id }
}
