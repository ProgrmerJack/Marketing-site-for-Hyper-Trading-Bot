import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzxqfsqhkrwuqfqldocf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHFmc3Foa3J3dXFmcWxkb2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDEyMDMsImV4cCI6MjA4MDA3NzIwM30.p44s1BTYLdpN_hYnvmG9pKImvI6xTokoIPPYIyZvR8s';

// Using 'api' schema as required by Supabase PostgREST
// Ensure the 'contacts' table exists in your Supabase database
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'api'
  }
});
