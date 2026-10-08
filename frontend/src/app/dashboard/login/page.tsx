"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { setApiAuthToken } from "../../../lib/api";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token || null;
      if (token) {
        setApiAuthToken(token);
        router.replace("/dashboard");
      }
    });
  }, [router]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setApiAuthToken(data.session?.access_token || null);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-forest">
      <div className="max-w-md mx-auto px-4 py-12">
        <Link href="/" className="text-sm text-moss hover:underline">
          ← Back to site
        </Link>
        <h1 className="font-serif text-3xl font-bold mt-4 mb-2">Professor login</h1>
        <p className="text-bark text-sm mb-6">
          Sign in to manage portfolio content.
        </p>

        <form onSubmit={signIn} className="bg-white border border-bark/10 rounded-lg p-5 shadow-sm space-y-3">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <label className="block">
            <span className="text-sm text-bark">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-bark/20 rounded px-3 py-2"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm text-bark">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-bark/20 rounded px-3 py-2"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

