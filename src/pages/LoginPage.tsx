import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthShell from '../components/auth/AuthShell';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || '/dashboard';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) setErr(error.message);
    else navigate(from, { replace: true });
  }

  return (
    <AuthShell title="Entrar">
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          style={ip} autoComplete="email"
        />
        <input
          placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)}
          style={ip} autoComplete="current-password"
        />
        {err && <div style={{ color:'#ffb4b4', fontSize:13 }}>{err}</div>}
        <button type="submit" disabled={busy}
          style={{ ...btn, opacity: busy ? .7 : 1 }}>{busy ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <div style={{ marginTop: 14, fontSize: 14, opacity: .9 }}>
        Não tem conta? <Link to="/register" style={{ color:'#9fd1ff' }}>Criar conta</Link>
      </div>
    </AuthShell>
  );
}

const ip: React.CSSProperties = {
  padding: '12px 14px', borderRadius: 10, border: '1px solid #2a3b6a',
  background: '#0d1f49', color: '#fff', outline: 'none'
};
const btn: React.CSSProperties = {
  padding: '12px 14px', borderRadius: 10, border: '0', cursor: 'pointer',
  background: '#2e72ff', color: '#fff', fontWeight: 600
};
