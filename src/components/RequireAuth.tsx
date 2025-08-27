import { useEffect, useState, type PropsWithChildren } from "react";
import { supabase } from "../lib/supabase";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthed(!!data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setAuthed(!!sess);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Carregando…</div>;
  if (!authed) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
