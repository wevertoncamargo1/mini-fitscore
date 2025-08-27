import { useEffect, useMemo, useState } from "react";
import InsightsIcon from "@mui/icons-material/Insights";
import { supabase } from "../lib/supabase";
import DashboardCard from "../components/dashboard/DashboardCard";
import ClassificationSelect from "../components/dashboard/ClassificationSelect";
import ScoreBadge from "../components/dashboard/ScoreBadge";

type Row = { id:string; name:string; email:string; score:number; classification:string; created_at:string; };

export default function DashboardPage() {
  const [raw, setRaw] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("Todos");
  const [view, setView] = useState<"table" | "grid">("table");
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); setErr(null);
        const { data, error } = await supabase
          .from("v_last_fitscore")
          .select("id,name,email,score,classification,created_at")
          .order("created_at", { ascending:false });
        if (error) throw error;
        setRaw((data || []) as Row[]);
      } catch {
        setErr("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byClass = useMemo(() => filter==="Todos" ? raw : raw.filter(r=>r.classification===filter), [raw, filter]);
  const filtered = useMemo(() => {
    if (!q.trim()) return byClass;
    const s = q.toLowerCase();
    return byClass.filter(r => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s));
  }, [byClass, q]);

  // Tabela
  const columns = [
    { key:"name",           label:"Nome" },
    { key:"email",          label:"E-mail" },
    { key:"score",          label:"FitScore" },
    { key:"classification", label:"Classificação" },
    { key:"created_at",     label:"Data" },
  ];
  const rows = filtered.map(r => ({
    name: r.name,
    email: r.email,
    score: <ScoreBadge score={r.score} />,
    classification: r.classification,
    created_at: new Date(r.created_at).toLocaleString(),
  }));

  // Grade (usa os mesmos dados, só muda a renderização em cards)
  const fields = columns; // pode customizar rótulos/ordem se quiser
  const items  = rows;    // reaproveita o mapeamento acima

  return (
    <div style={{ minHeight:"100vh", background:"#0b1a3a", padding:"1.5rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <DashboardCard
          icon={<InsightsIcon/>}
          title="Dashboard — Mini FitScore"
          rightSlot={<ClassificationSelect value={filter} onChange={setFilter} />}
          loading={loading}
          error={err}
          view={view}
          onToggleView={setView}
          onSearch={setQ}
          columns={columns}
          rows={rows}
          fields={fields}
          items={items}
        />
      </div>
    </div>
  );
}
