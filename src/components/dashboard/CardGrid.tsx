// src/components/dashboard/CardGrid.tsx
import Grid from "@mui/material/Grid"; // ⬅️ Grid v1 (default import)
import { Paper, Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type CardField = { key: string; label: string };
export type CardItem  = Record<string, ReactNode>;

export default function CardGrid({
  fields,
  items,
}: {
  fields: CardField[];
  items: CardItem[];
}) {
  return (
    <Grid container spacing={1.5}>
      {items.map((it, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Paper sx={{ p: 1.5, borderRadius: 2 }}>
            {fields.map((f) => (
              <Box key={f.key} sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                <Typography sx={{ fontWeight: 600, minWidth: 110 }}>
                  {f.label}:
                </Typography>
                <Box sx={{ flex: 1 }}>{it[f.key]}</Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
