export const TUTORIAL_STORAGE_KEY = "portfolio-site-tutorial-v1";

export function isSiteTutorialComplete() {
  try {
    const raw = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed.completed);
  } catch {
    return false;
  }
}

export function completeSiteTutorial() {
  localStorage.setItem(
    TUTORIAL_STORAGE_KEY,
    JSON.stringify({ completed: true, completedAt: Date.now() })
  );
}
