export const COOKIE_STORAGE_KEY = "portfolio-cookie-consent-v1";

export function hasCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

export function acceptCookieConsent() {
  localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
}
