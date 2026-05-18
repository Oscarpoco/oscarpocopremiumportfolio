export const ALERTS_STORAGE_KEY = "portfolio-app-alerts-v1";

/** Auto-close updates popup if user has not dismissed it manually */
export const UPDATES_AUTO_CLOSE_MS = 2570;

export function isWelcomeAlertDismissed() {
  try {
    const raw = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.welcomeDismissed);
  } catch {
    return false;
  }
}

export function dismissWelcomeAlert() {
  localStorage.setItem(
    ALERTS_STORAGE_KEY,
    JSON.stringify({ welcomeDismissed: true, dismissedAt: Date.now() })
  );
}
