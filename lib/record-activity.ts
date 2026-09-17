import { createClient } from "@/lib/supabase/client";

export async function recordDailyActivity(userId: string) {
  const supabase = createClient();
  const activityDate = new Date().toISOString().slice(0, 10);

  await supabase.from("user_activity_days").upsert(
    {
      user_id: userId,
      activity_date: activityDate,
      activity_count: 1,
    },
    { onConflict: "user_id,activity_date" },
  );
}
