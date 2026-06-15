import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { FaGithub } from "react-icons/fa";
import "react-activity-calendar/tooltips.css";
import "./GitHubContributionGraph.css";

const GITHUB_USERNAME = "Oscarpoco";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CONTRIBUTION_MONTHS = 16;

const CALENDAR_THEME = {
  light: ["var(--bg-tertiary)", "var(--primary)"],
  dark: ["var(--bg-tertiary)", "var(--primary-light)"],
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthYear(date) {
  return `${date.toLocaleString(undefined, { month: "short" })} ${date.getFullYear()}`;
}

function getContributionWindow(monthCount = CONTRIBUTION_MONTHS) {
  const now = new Date();
  const endYear = now.getFullYear();
  const endMonth = now.getMonth();
  const endDay = new Date(endYear, endMonth + 1, 0).getDate();
  const endDate = formatDate(new Date(endYear, endMonth, endDay));

  const start = new Date(endYear, endMonth - (monthCount - 1), 1);
  const startDate = formatDate(start);
  const rangeLabel = `${formatMonthYear(start)} — ${formatMonthYear(now)}`;

  const years = [];
  for (let year = start.getFullYear(); year <= endYear; year += 1) {
    years.push(year);
  }

  return { startDate, endDate, rangeLabel, years };
}

function filterContributionsToWindow(contributions, window) {
  return contributions.filter(
    (entry) => entry.date >= window.startDate && entry.date <= window.endDate
  );
}

function buildContributionsApiUrl(year) {
  return `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`;
}

async function fetchContributionsForYears(years) {
  const responses = await Promise.all(
    years.map((year) =>
      fetch(buildContributionsApiUrl(year), { cache: "no-store" }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
    )
  );

  return responses.flatMap((data) => data.contributions ?? []);
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function GitHubContributionGraph({ darkMode = false }) {
  const [contributions, setContributions] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [rangeWindow, setRangeWindow] = useState(() => getContributionWindow());

  const lastFetchDayRef = useRef(null);
  const colorScheme = darkMode ? "dark" : "light";

  const calendarLabels = useMemo(
    () => ({
      legend: {
        less: "Quiet",
        more: "Active",
      },
    }),
    []
  );

  const calendarTooltips = useMemo(
    () => ({
      activity: {
        placement: "top",
        withArrow: false,
        text: (activity) =>
          `${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${activity.date}`,
      },
    }),
    []
  );

  const fetchContributions = useCallback(async ({ background = false } = {}) => {
    if (!background) {
      setLoading(true);
    }

    const contributionWindow = getContributionWindow();

    try {
      const merged = await fetchContributionsForYears(contributionWindow.years);
      const filtered = filterContributionsToWindow(merged, contributionWindow);
      const rangeTotal = filtered.reduce((sum, entry) => sum + entry.count, 0);

      setRangeWindow(contributionWindow);
      setContributions(filtered);
      setTotalCount(rangeTotal);
      setLastSyncedAt(new Date());
      setError(false);
      lastFetchDayRef.current = getTodayKey();
    } catch {
      if (!background) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();

    const dailyInterval = window.setInterval(() => {
      fetchContributions({ background: true });
    }, ONE_DAY_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const today = getTodayKey();
      if (lastFetchDayRef.current !== today) {
        fetchContributions({ background: true });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(dailyInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchContributions]);

  const syncedLabel = lastSyncedAt
    ? lastSyncedAt.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div
      className={`github-contribution-graph ${loading ? "github-contribution-graph--loading" : ""}`}
      role="region"
      aria-label="GitHub contribution activity"
    >
      <div className="github-contribution-graph__header">
        <div className="github-contribution-graph__legend">
          <span className="github-contribution-graph__legend-icon" aria-hidden>
            <FaGithub />
          </span>
          <span>Contribution activity</span>
        </div>

        <div className="github-contribution-graph__header-meta">
          <span className="github-contribution-graph__range-badge">
            {rangeWindow.rangeLabel}
          </span>
          {!loading && !error && totalCount !== null && (
            <span className="github-contribution-graph__total-badge">
              {totalCount.toLocaleString()} contributions
            </span>
          )}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-contribution-graph__profile-link"
          >
            @{GITHUB_USERNAME}
          </a>
        </div>
      </div>

      <div className="github-contribution-graph__canvas">
        <div className="github-contribution-graph__calendar-wrap">
          {error ? (
            <p className="github-contribution-graph__status">
              Could not load contribution data.{" "}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </p>
          ) : (
            <ActivityCalendar
              className="github-contribution-graph__calendar"
              data={contributions}
              loading={loading}
              colorScheme={colorScheme}
              theme={CALENDAR_THEME}
              labels={calendarLabels}
              tooltips={calendarTooltips}
              showTotalCount={false}
              blockSize={13}
              blockMargin={3}
              blockRadius={3}
              fontSize={12}
              showWeekdayLabels={["mon", "wed", "fri"]}
              style={{ color: "var(--text-tertiary)" }}
            />
          )}
        </div>

        {loading && !error && (
          <div className="github-contribution-graph__shimmer" aria-hidden />
        )}
      </div>

      {!loading && !error && (
        <div className="github-contribution-graph__footer">
          <p className="github-contribution-graph__footer-copy">
            Live contribution heatmap across the last {CONTRIBUTION_MONTHS} months (
            {rangeWindow.rangeLabel}).
            {syncedLabel ? ` Last updated ${syncedLabel}.` : ""}
          </p>
          <span className="github-contribution-graph__live-badge">Live</span>
        </div>
      )}
    </div>
  );
}

export default GitHubContributionGraph;
