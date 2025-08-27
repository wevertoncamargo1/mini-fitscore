import { Box, Typography, Divider } from "@mui/material";
import { type ReactNode } from "react";

const BG_DARK = "#0b1a3a"; 
const BORDER_BLUE = "#3b82f6";

export default function FormCard({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        maxWidth: 760,
        mx: "auto",
        width: { xs: "85%", sm: "80%", md: "70%" },
        bgcolor: "white",
        color: BG_DARK,
        borderRadius: 3,
        border: `2px solid ${BORDER_BLUE}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        p: { xs: 2, sm: 3, md: 4 },
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

      {children}
    </Box>
  );
}
