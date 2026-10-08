import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // In dev, show a clear error early if someone tries to use auth/dashboard.
  // (Next will surface this during runtime on pages that import this client.)
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend env."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);