export type FinanceStudioNotification = {
  id: string;
  type: "deployment" | "info";
  titleEn: string;
  titleFr: string;
  bodyEn: string;
  bodyFr: string;
  createdAt: string;
  read: boolean;
  version?: string;
};

export const NOTIFICATION_STORAGE_KEY = "finance-studio-notifications";
export const NOTIFICATION_EVENT = "finance-studio-notifications-changed";

export function readNotifications(): FinanceStudioNotification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeNotifications(items: FinanceStudioNotification[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(items.slice(0, 30)));
    window.dispatchEvent(new CustomEvent(NOTIFICATION_EVENT));
  } catch {
    // Notifications are optional UI state and must never crash the application.
  }
}

export function addDeploymentNotification(version: string) {
  const items = readNotifications();
  if (items.some((item) => item.type === "deployment" && item.version === version)) return;

  writeNotifications([
    {
      id: `deployment-${version}`,
      type: "deployment",
      titleEn: "New FinanceStudio version available",
      titleFr: "Nouvelle version de FinanceStudio disponible",
      bodyEn: "A new version has just been deployed while you were connected. Refresh the page to load the latest version. Your account and progress will stay connected.",
      bodyFr: "Une nouvelle version vient d’être déployée pendant que tu étais connecté(e). Actualise la page pour charger la dernière version. Ton compte et ta progression restent connectés.",
      createdAt: new Date().toISOString(),
      read: false,
      version,
    },
    ...items,
  ]);
}

export function markAllNotificationsRead() {
  writeNotifications(readNotifications().map((item) => ({ ...item, read: true })));
}

export function clearNotifications() {
  writeNotifications([]);
}
