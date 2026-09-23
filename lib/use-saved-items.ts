"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type SavedItemMetadata = Record<string, string | number | boolean | null>;

export function useSavedItems(itemType: string) {
  const [userId, setUserId] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;
      setUserId(user?.id ?? null);

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("saved_items")
        .select("item_key")
        .eq("user_id", user.id)
        .eq("item_type", itemType);

      if (!active) return;
      setSavedKeys(new Set((data ?? []).map((row) => String(row.item_key))));
      setLoading(false);
    }

    void load();
    return () => {
      active = false;
    };
  }, [itemType]);

  const isSaved = useCallback(
    (itemKey: string) => savedKeys.has(itemKey),
    [savedKeys],
  );

  const toggleSaved = useCallback(
    async (itemKey: string, metadata: SavedItemMetadata) => {
      if (!userId) {
        window.location.href = "/login";
        return false;
      }

      if (savingKey) return savedKeys.has(itemKey);

      setSavingKey(itemKey);
      const supabase = createClient();
      const currentlySaved = savedKeys.has(itemKey);

      if (currentlySaved) {
        const { error } = await supabase
          .from("saved_items")
          .delete()
          .eq("user_id", userId)
          .eq("item_type", itemType)
          .eq("item_key", itemKey);

        if (!error) {
          setSavedKeys((current) => {
            const next = new Set(current);
            next.delete(itemKey);
            return next;
          });
          setSavingKey(null);
          return false;
        }
      } else {
        const { error } = await supabase.from("saved_items").upsert(
          {
            user_id: userId,
            item_type: itemType,
            item_key: itemKey,
            metadata,
          },
          { onConflict: "user_id,item_type,item_key" },
        );

        if (!error) {
          setSavedKeys((current) => new Set(current).add(itemKey));
          setSavingKey(null);
          return true;
        }
      }

      setSavingKey(null);
      return currentlySaved;
    },
    [itemType, savedKeys, savingKey, userId],
  );

  return useMemo(
    () => ({
      authenticated: Boolean(userId),
      isSaved,
      loading,
      savingKey,
      toggleSaved,
    }),
    [isSaved, loading, savingKey, toggleSaved, userId],
  );
}
