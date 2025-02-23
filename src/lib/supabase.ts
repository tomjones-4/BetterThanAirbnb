
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = "https://njztpokajguvfxyejukk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qenRwb2thamd1dmZ4eWVqdWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyODg2NDgsImV4cCI6MjA1NTg2NDY0OH0.BZUVJ1ycBvzi5LHypeSlDIlsxlZS436lT6LzNsmu2Yo";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
