import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell";
import { useAuth } from "../hooks/useAuth";
import FeedbackSnackbar from "../components/ui/FeedbackSnackbar";
import {mapSupabaseAuthError} from "../components/auth/mapSupabaseAuthError"

export default function RegisterPage() {
    const { signUp } = useAuth();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackType, setSnackType] = useState<"success" | "error">("success");
    const [snackMsg, setSnackMsg] = useState("");

    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        const { error } = await signUp(name.trim(), email.trim(), phone.trim(), password);
        setBusy(false);

        if (error) {
            const custom = mapSupabaseAuthError(error);
            setSnackType("error");
            setSnackMsg(custom);
            setSnackOpen(true);
            return;
        }

        setSnackType("success");
        setSnackMsg("Usuário criado com sucesso!");
        setSnackOpen(true);

        setTimeout(() => navigate("/login"), 1500);
    }

    return (
        <AuthShell title="Criar conta">
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} style={ip} />
                <input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} style={ip} />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={ip} />
                <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={ip} />
                <button type="submit" disabled={busy} style={{ ...btn, opacity: busy ? .7 : 1 }}>
                    {busy ? "Criando..." : "Criar conta"}
                </button>
            </form>

            <div style={{ marginTop: 14, fontSize: 14, opacity: .9 }}>
                Já tem conta? <Link to="/login" style={{ color: "#9fd1ff" }}>Entrar</Link>
            </div>

            <FeedbackSnackbar
                open={snackOpen}
                type={snackType}
                message={snackMsg}
                onClose={() => setSnackOpen(false)}
            />
        </AuthShell>
    );
}

const ip: React.CSSProperties = {
    padding: "12px 14px", borderRadius: 10, border: "1px solid #2a3b6a",
    background: "#0d1f49", color: "#fff", outline: "none"
};
const btn: React.CSSProperties = {
    padding: "12px 14px", borderRadius: 10, border: "0", cursor: "pointer",
    background: "#2e72ff", color: "#fff", fontWeight: 600
};
