"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import {
  clearNotifications,
  markAllNotificationsRead,
  NOTIFICATION_EVENT,
  readNotifications,
  type FinanceStudioNotification,
} from "@/lib/local-notifications";

function syncProfileBadge(unread: number) {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href="/account"]');
  links.forEach((link) => {
    link.classList.add("fs-profile-nav-link");
    let badge = link.querySelector<HTMLSpanElement>(".fs-notification-dot");
    if (unread > 0) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "fs-notification-dot";
        badge.setAttribute("aria-label", `${unread} unread notifications`);
        link.appendChild(badge);
      }
      badge.dataset.count = String(unread);
      badge.style.display = "block";
    } else if (badge) {
      badge.remove();
    }
  });
}

export default function NotificationCenter() {
  const pathname = usePathname();
  const { isFrench } = useLanguage();
  const [items, setItems] = useState<FinanceStudioNotification[]>([]);
  const [mount, setMount] = useState<HTMLElement | null>(null);

  const unread = useMemo(() => items.filter((item) => !item.read).length, [items]);

  useEffect(() => {
    const refresh = () => setItems(readNotifications());
    refresh();
    window.addEventListener(NOTIFICATION_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    syncProfileBadge(unread);
    const observer = new MutationObserver(() => syncProfileBadge(unread));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [unread, pathname]);

  useEffect(() => {
    if (pathname !== "/account") {
      setMount(null);
      return;
    }
    const shell = document.querySelector<HTMLElement>(".account-shell");
    if (!shell) return;
    let target = document.getElementById("fs-notification-center-mount");
    if (!target) {
      target = document.createElement("div");
      target.id = "fs-notification-center-mount";
      const hero = shell.querySelector(".account-hero");
      if (hero?.nextSibling) shell.insertBefore(target, hero.nextSibling);
      else shell.appendChild(target);
    }
    setMount(target);
  }, [pathname]);

  if (!mount) return null;

  return createPortal(
    <section className="fs-notification-center" aria-live="polite">
      <div className="fs-notification-heading">
        <div>
          <span className="mini-label">{isFrench ? "CENTRE DE NOTIFICATIONS" : "NOTIFICATION CENTER"}</span>
          <h2>{isFrench ? "Tes notifications" : "Your notifications"}</h2>
          <p>
            {isFrench
              ? "Les alertes de nouvelle version apparaissent uniquement si tu étais connecté(e) au moment du déploiement."
              : "New-version alerts appear only when you were signed in at the moment the deployment went live."}
          </p>
        </div>
        <div className="fs-notification-actions">
          {unread > 0 && (
            <button type="button" onClick={() => markAllNotificationsRead()}>
              {isFrench ? "Tout marquer comme lu" : "Mark all read"}
            </button>
          )}
          {items.length > 0 && (
            <button type="button" className="secondary" onClick={() => clearNotifications()}>
              {isFrench ? "Effacer" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="fs-notification-empty">
          {isFrench ? "Aucune notification pour le moment." : "No notifications right now."}
        </div>
      ) : (
        <div className="fs-notification-list">
          {items.map((item) => (
            <article className={item.read ? "read" : "unread"} key={item.id}>
              <span className="fs-notification-status" />
              <div>
                <strong>{isFrench ? item.titleFr : item.titleEn}</strong>
                <p>{isFrench ? item.bodyFr : item.bodyEn}</p>
                <small>{new Date(item.createdAt).toLocaleString(isFrench ? "fr-FR" : "en-US")}</small>
              </div>
              {item.type === "deployment" && (
                <button
                  type="button"
                  onClick={() => {
                    markAllNotificationsRead();
                    window.location.reload();
                  }}
                >
                  {isFrench ? "Actualiser maintenant" : "Refresh now"}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>,
    mount,
  );
}
