import { Box, type BoxProps } from "@mui/material";
import type { ReactNode } from "react";

type ScreenProps = {
  children: ReactNode;
  /** cor de fundo (padrão: azul escuro do app) */
  bg?: string;
  /** alinhamento vertical do conteúdo (flex-start | center | flex-end) */
  align?: "flex-start" | "center" | "flex-end";
  /** padding vertical (padrão: 6) — aceita number ou objeto responsivo do MUI */
  py?: BoxProps["py"];
} & Omit<BoxProps, "children">;

const DEFAULT_BG = "#0b1a3a";

export default function Screen({
  children,
  bg = DEFAULT_BG,
  align = "flex-start",
  py = 6,
  ...rest
}: ScreenProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: bg,
        display: "flex",
        alignItems: align,
        py,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
