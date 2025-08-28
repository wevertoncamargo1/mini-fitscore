import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import type { ReactNode } from "react";
import DashboardHeader, { type ViewMode } from "./DashboardHeader";
import DataTable, { type Column, type RowData } from "./DataTable";
import CardGrid, { type CardField, type CardItem } from "./CardGrid";

export default function DashboardCard({
  icon, title, rightSlot, loading, error, emptyMessage = "Nenhum registro encontrado.",
  view, onToggleView, onSearch,
  columns, rows,
  fields, items,
}: {
  icon?: ReactNode;
  title: string;
  rightSlot?: ReactNode;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  view: ViewMode;
  onToggleView: (v: ViewMode) => void;
  onSearch?: (q: string) => void;
  columns: Column[];
  rows: RowData[];
  fields: CardField[];
  items: CardItem[];
}) {
  return (
    <Paper sx={{ p:2.5, borderRadius:3, border:"2px solid #3b82f6" }}>
      <DashboardHeader
        icon={icon}
        title={title}
        onSearch={onSearch}
        rightSlot={rightSlot}
        view={view}
        onToggleView={onToggleView}
      />

      {loading ? (
        <Box sx={{ display:"grid", placeItems:"center", py:6 }}><CircularProgress/></Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (view === "table" ? (
        rows.length ? <DataTable columns={columns} rows={rows}/> : <Typography>{emptyMessage}</Typography>
      ) : (
        items.length ? <CardGrid fields={fields} items={items}/> : <Typography>{emptyMessage}</Typography>
      ))}
    </Paper>
  );
}
