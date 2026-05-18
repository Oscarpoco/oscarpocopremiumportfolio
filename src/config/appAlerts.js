export const ALERTS_STORAGE_KEY = "portfolio-app-alerts-v1";

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
