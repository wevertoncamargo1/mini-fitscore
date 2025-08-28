import { type ReactNode } from 'react';

export default function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0b1a3a', padding: '1.5rem' }}>
      <div style={{ maxWidth: 420, margin: '8vh auto' }}>
        <div style={{
          background: '#0f2047', borderRadius: 16, padding: '28px 24px',
          boxShadow: '0 10px 30px rgba(0,0,0,.35)', color: '#fff'
        }}>
          <h2 style={{ margin: 0, marginBottom: 12, fontWeight: 600 }}>{title}</h2>
          <p style={{ marginTop: 0, opacity: .8, marginBottom: 16 }}>
            Acesse o dashboard do Mini FitScore
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
