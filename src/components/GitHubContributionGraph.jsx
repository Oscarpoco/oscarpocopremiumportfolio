import React, { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { FaGithub } from "react-icons/fa";
import "react-activity-calendar/tooltips.css";
import "./GitHubContributionGraph.css";

const GITHUB_USERNAME = "Oscarpoco";
const CONTRIBUTIONS_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const CALENDAR_THEME = {
  light: ["var(--bg-tertiary)", "var(--primary)"],
  dark: ["var(--bg-tertiary)", "var(--primary-light)"],
};

function GitHubContributionGraph({ darkMode = false }) {
  const [contributions, setContributions] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    let cancelled = false;

    fetch(CONTRIBUTIONS_API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setContributions(data.contributions ?? []);
        setTotalCount(data.total?.lastYear ?? null);
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
          {!loading && !error && totalCount !== null && (
            <span className="github-contribution-graph__total-badge">
              {totalCount.toLocaleString()} this year
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
            Live contribution heatmap synced from my public GitHub profile.
          </p>
          <span className="github-contribution-graph__live-badge">Live</span>
        </div>
      )}
    </div>
  );
}

export default GitHubContributionGraph;
