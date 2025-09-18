import { createClient } from "@supabase/supabase-js";
//Credentials of the supabase
export const supabase = createClient(
  "https://vdqjvxqaqefknslezuem.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcWp2eHFhcWVma25zbGV6dWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxODQwOTgsImV4cCI6MjA3Mzc2MDA5OH0.FcFCv6CIXw-hls_KeLaxsIXPOryUajYQ5Jr0oODPFVc"
);
