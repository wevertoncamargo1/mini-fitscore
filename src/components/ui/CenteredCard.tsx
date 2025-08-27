import { Box, Typography } from "@mui/material";
import { type ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function CenteredCard({ title, subtitle, children }: Props) {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Box
        sx={{
          maxWidth: 640,
          width: "90%",
          bgcolor: "white",
          color: "#0b1a3a",
          borderRadius: 3,
          border: `2px solid #3b82f6`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          p: { xs: 3, md: 4 },
          textAlign: "center",
        }}
      >
        {title && (
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="body1" sx={{ mb: children ? 2 : 0 }}>
            {subtitle}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}
