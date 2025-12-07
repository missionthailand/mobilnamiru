import { createClient } from "@supabase/supabase-js";
import { Database } from "@/supabase/generated.types";

const supabaseUrl = "https://vmxnwpwidjjhtddaibqm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZteG53cHdpZGpqaHRkZGFpYnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjcyMDcsImV4cCI6MjA4MDcwMzIwN30.-i-n04eE1G6NEfO8aTGub0yUs5YuvmZdLnItRVMfbUA";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
