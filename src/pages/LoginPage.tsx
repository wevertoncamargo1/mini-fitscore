import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options:{ emailRedirectTo: window.location.origin } });
    setSending(false);
    if (!error) setSent(true);
    else alert("Falha ao enviar link. Tente novamente.");
  };

  return (
    <Box sx={{ minHeight:"100vh", display:"grid", placeItems:"center", bgcolor:"#0b1a3a", p:2 }}>
      <Box sx={{ width:"90%", maxWidth:420, bgcolor:"white", p:3, borderRadius:3, border:"2px solid #3b82f6" }}>
        <Typography variant="h5" fontWeight={700} mb={1}>Entrar</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Digite seu e-mail e enviaremos um link de acesso.
        </Typography>
        {sent ? (
          <Typography>Verifique seu e-mail. Abra o link para continuar.</Typography>
        ) : (
          <form onSubmit={handleLogin}>
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth disabled={sending}>
              {sending ? "Enviando..." : "Enviar link de acesso"}
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}
