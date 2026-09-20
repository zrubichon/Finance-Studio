import { createClient } from "@/lib/supabase/client";

export async function recordDailyActivity(userId?: string) {
  const supabase = createClient();
  let effectiveUserId = userId;

  if (!effectiveUserId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    effectiveUserId = user?.id;
  }

  if (!effectiveUserId) return;

  const activityDate = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabase
    .from("user_activity_days")
    .select("activity_count")
    .eq("user_id", effectiveUserId)
    .eq("activity_date", activityDate)
    .maybeSingle();

  await supabase.from("user_activity_days").upsert(
    {
      user_id: effectiveUserId,
      activity_date: activityDate,
      activity_count: Number(existing?.activity_count ?? 0) + 1,
    },
    { onConflict: "user_id,activity_date" },
  );
}
