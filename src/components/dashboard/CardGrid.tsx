import React from 'react';

type Field = { key: string; label: string };
type Item = Record<string, React.ReactNode>;

type CardGridProps = {
  fields: Field[];
  items: Item[];
  loading?: boolean;
  emptyMessage?: string;
};

export default function CardGrid({
  fields,
  items,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado.',
}: CardGridProps) {
  if (loading) return <div style={{ color: '#fff' }}>Carregando…</div>;
  if (!items.length) return <div style={{ color: '#fff' }}>{emptyMessage}</div>;

  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ background: '#0d1f49', border: '1px solid #203261', borderRadius: 12, padding: 12 }}>
          {fields.map(f => {
            const val = item[f.key] as React.ReactNode; // <- aceita componente também
            return (
              <div key={f.key} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{val ?? '—'}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
