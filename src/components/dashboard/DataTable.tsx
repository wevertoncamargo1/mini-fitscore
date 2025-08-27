import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { ReactNode } from "react";

export type Column = { key: string; label: string };
export type RowData = Record<string, ReactNode>;

export default function DataTable({ columns, rows }: { columns: Column[]; rows: RowData[] }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius:2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(c => <TableCell key={c.key} sx={{ fontWeight:700 }}>{c.label}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, idx) => (
            <TableRow key={idx}>
              {columns.map(c => <TableCell key={c.key}>{r[c.key]}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
