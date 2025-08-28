export function mapSupabaseAuthError(error?: { message?: string; status?: number }) {
  const msg = (error?.message || "").toLowerCase();

  if (msg.includes("user already registered") || msg.includes("already registered") || error?.status === 400) {
    return "Este e-mail já está cadastrado.";
  }
  if (msg.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos.";
  }
  if (msg.includes("password")) {
    return "A senha não atende aos requisitos mínimos.";
  }
  if (msg.includes("email") && msg.includes("invalid")) {
    return "E-mail inválido. Verifique e tente novamente.";
  }
  return "Não foi possível completar a ação. Tente novamente.";
}
