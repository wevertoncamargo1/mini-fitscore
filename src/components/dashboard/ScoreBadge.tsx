import { Box } from "@mui/material";

export default function ScoreBadge({ score }: { score: number }) {
  const bg = score >= 80 ? "#16a34a" : score >= 60 ? "#2563eb" : score >= 40 ? "#f59e0b" : "#dc2626";
  return (
    <Box sx={{ display:"inline-block", px:1, py:0.5, borderRadius:1, color:"#fff", fontWeight:700, fontSize:"0.875rem", bgcolor: bg }}>
      {score}
    </Box>
  );
}
