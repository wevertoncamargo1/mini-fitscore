import { Snackbar, Alert } from "@mui/material";

export default function FeedbackSnackbar({
  open, type, message, onClose,
}: { open: boolean; type: "success" | "error"; message: string; onClose: () => void }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
