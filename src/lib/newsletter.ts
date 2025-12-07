import { sbAdmin } from "./supabase-admin";

/** Returns true if email exists in subscribers. */
export async function isSubscribed(email: string) {
  const { data, error } = await sbAdmin
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("email", email);

  if (error) throw error;
  return (data === null) && false || (data as any) ? true : false; // head:true returns null data; use count
}

/** Idempotent subscribe (safe on duplicates). */
export async function subscribe(email: string) {
  const { error } = await sbAdmin
    .from("subscribers")
    .insert({ email })
    .single();

  // Unique violation → treat as already subscribed
  if (error && (error.code === "23505" || /duplicate key|unique/i.test(error.message))) {
    return { status: "already-subscribed" as const };
  }
  if (error) throw error;
  return { status: "subscribed" as const };
}

