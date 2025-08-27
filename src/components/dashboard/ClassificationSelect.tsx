import { Select, MenuItem } from "@mui/material";

const OPTIONS = ["Todos","Fit Altíssimo","Fit Aprovado","Fit Questionável","Fora do Perfil"];

export default function ClassificationSelect({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  return (
    <Select size="small" value={value} onChange={(e)=>onChange(String(e.target.value))}>
      {OPTIONS.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
    </Select>
  );
}
