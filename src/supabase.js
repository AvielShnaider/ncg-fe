import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pdhrillyhuctigidbrap.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkaHJpbGx5aHVjdGlnaWRicmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NzM2OTQsImV4cCI6MjAzMjI0OTY5NH0.VnrU65-DfxbXo6Ci80948kgMP2iYKU4ExitLrKYO7gk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
