import { createClient } from "@supabase/supabase-js";

// Estas dos variables se configuran en .env.local (local) y en Vercel (producción).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
