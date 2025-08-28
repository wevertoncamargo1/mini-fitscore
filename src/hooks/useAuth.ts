import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user ?? null); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = useCallback((email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }), []);

  const signUp = useCallback((name: string, email: string, phone: string, password: string) =>
    supabase.auth.signUp({ email, password, options: { data: { name, phone } } }), []);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

  return { user, loading, signIn, signUp, signOut };
}
