
import { createClient } from "@supabase/supabase-js";

// Use hardcoded values to ensure it works in all environments
// These values are already public in your project
const supabaseUrl = "https://qolvoivjbkyyxfrixpob.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvbHZvaXZqYmt5eXhmcml4cG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMTg5ODEsImV4cCI6MjA1ODg5NDk4MX0.f4b4_6SmOE6V9n1URHrHJoZjxa7X17IyRHlo95DzFvI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
