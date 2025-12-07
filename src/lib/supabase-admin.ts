import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

export const sbAdmin = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY, // bypasses RLS; keep on server only
    {
        auth: { persistSession: false },
        db: { schema: 'api' }
    }
);

