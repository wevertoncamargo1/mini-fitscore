import { Box, Typography, IconButton, TextField } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import type { ReactNode } from "react";

export type ViewMode = "table" | "grid";

export default function DashboardHeader({
  icon, title, onSearch, rightSlot, view, onToggleView,
}: {
  icon?: ReactNode;
  title: string;
  onSearch?: (q: string) => void;
  rightSlot?: ReactNode;           // ex.: <ClassificationSelect .../>
  view: ViewMode;
  onToggleView: (next: ViewMode) => void;
}) {
  return (
    <Box sx={{ display:"flex", gap:2, alignItems:"center", justifyContent:"space-between", mb:2, flexWrap:"wrap" }}>
      <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
        {icon}
        <Typography variant="h6" fontWeight={700}>{title}</Typography>
      </Box>

      <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexWrap:"wrap" }}>
        {onSearch && (
          <TextField
            size="small"
            placeholder="Buscar por nome ou e-mail…"
            onChange={(e)=>onSearch(e.target.value)}
          />
        )}
        {rightSlot}
        <IconButton
          title="Ver tabela"
          color={view === "table" ? "primary" : "default"}
          onClick={()=>onToggleView("table")}
        >
          <TableRowsIcon />
        </IconButton>
        <IconButton
          title="Ver grade"
          color={view === "grid" ? "primary" : "default"}
          onClick={()=>onToggleView("grid")}
        >
          <ViewModuleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
