// Shared Supabase client for use anywhere in the app (browser or server).
// Uses the public "anon" key, which is safe to expose to the browser -
// row-level security in schema.sql is what actually protects the data.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
