import { Typography } from "@mui/material";
export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Typography variant="h6" sx={{ mb: 1 }}>{children}</Typography>;
}
