"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { setApiAuthToken } from "../../lib/api";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const session = data.session;
      if (!session) {
        setApiAuthToken(null);
        router.replace("/dashboard/login");
        return;
      }
      setApiAuthToken(session.access_token);
      setEmail(session.user.email || "");
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session) {
        setApiAuthToken(null);
        router.replace("/dashboard/login");
        return;
      }
      setApiAuthToken(session.access_token);
      setEmail(session.user.email || "");
      setReady(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    setApiAuthToken(null);
    router.replace("/dashboard/login");
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream text-forest flex items-center justify-center">
        <div className="text-moss">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-forest">
      <header className="bg-white border-b border-bark/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="hover:text-moss transition text-sm">
            ← Back to site
          </Link>
          <div className="flex items-center gap-3">
            {email && <span className="text-xs text-bark hidden sm:block">{email}</span>}
            <button
              type="button"
              onClick={logout}
              className="text-sm text-moss hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
