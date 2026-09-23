"use client";

import { useSavedItems, type SavedItemMetadata } from "@/lib/use-saved-items";
import { useLanguage } from "@/components/language-provider";

export default function SaveItemButton({
  itemType,
  itemKey,
  metadata,
  compact = false,
}: {
  itemType: string;
  itemKey: string;
  metadata: SavedItemMetadata;
  compact?: boolean;
}) {
  const { text } = useLanguage();
  const { authenticated, isSaved, loading, savingKey, toggleSaved } =
    useSavedItems(itemType);

  const saved = isSaved(itemKey);
  const saving = savingKey === itemKey;

  return (
    <button
      type="button"
      className={compact ? "save-item-button compact" : "save-item-button"}
      disabled={loading || saving}
      aria-pressed={saved}
      onClick={() => void toggleSaved(itemKey, metadata)}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      {saving
        ? text("Saving…", "Enregistrement…")
        : saved
          ? text("Saved", "Enregistré")
          : authenticated
            ? text("Save", "Enregistrer")
            : text("Sign in to save", "Se connecter pour enregistrer")}
    </button>
  );
}
