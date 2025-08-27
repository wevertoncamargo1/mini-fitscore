import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";

await supabase.auth.signOut();

type Row = { id:string; name:string; email:string; score:number; classification:string; created_at:string; };

export default function DashboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");

  useEffect(() => {
    (async () => {
      setLoading(true); setErr(null);
      const { data, error } = await supabase
        .from("v_last_fitscore")
        .select("id,name,email,score,classification,created_at")
        .order("created_at", { ascending:false });
      if (error) { setErr("Não foi possível carregar os dados."); setLoading(false); return; }
      setRows((data || []) as Row[]);
      setLoading(false);
    })();
  }, []);

  const list = rows.filter(r => filter==="Todos" ? true : r.classification === filter);

  return (
    <Box sx={{ minHeight:"100vh", bgcolor:"#0b1a3a", p:3 }}>
      <Box sx={{ maxWidth:1024, mx:"auto", bgcolor:"white", p:3, borderRadius:3, border:"2px solid #3b82f6" }}>
        <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:2 }}>
          <Typography variant="h5" fontWeight={700}>Dashboard — Mini FitScore</Typography>
          <Select size="small" value={filter} onChange={(e)=>setFilter(e.target.value)}>
            {["Todos","Fit Altíssimo","Fit Aprovado","Fit Questionável","Fora do Perfil"].map(s=>(
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </Box>

        {loading && <Typography>Carregando…</Typography>}
        {err && <Typography color="error">{err}</Typography>}
        {!loading && !err && list.length===0 && <Typography>Nenhum candidato encontrado.</Typography>}

        {!loading && !err && list.length>0 && (
          <Box sx={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr", gap:1, mb:1, fontWeight:700 }}>
            <div>Nome</div><div>E-mail</div><div>Score</div><div>Classificação</div><div>Data</div>
          </Box>
        )}
        {!loading && !err && list.map(r => (
          <Paper key={r.id} sx={{ p:1.5, mb:1, display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr", gap:1 }}>
            <div>{r.name}</div>
            <div>{r.email}</div>
            <div>{r.score}</div>
            <div>{r.classification}</div>
            <div>{new Date(r.created_at).toLocaleString()}</div>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
