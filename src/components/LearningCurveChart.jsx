import React, { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LEARNING_CURVE_DATA,
  LEARNING_CURVE_META,
} from "../pages/Database/LearningCurveData";
import "./LearningCurveChart.css";

const CHART = {
  width: 820,
  height: 300,
  pad: { top: 28, right: 28, bottom: 52, left: 52 },
};

function buildPaths(data, maxValue) {
  const plotW = CHART.width - CHART.pad.left - CHART.pad.right;
  const plotH = CHART.height - CHART.pad.top - CHART.pad.bottom;
  const count = data.length;

  const points = data.map((point, index) => {
    const x =
      CHART.pad.left + (count === 1 ? plotW / 2 : (index / (count - 1)) * plotW);
    const y =
      CHART.pad.top + plotH - (point.value / maxValue) * plotH;
    return { ...point, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    CHART.pad.top + plotH
  } L ${points[0].x} ${CHART.pad.top + plotH} Z`;

  return { points, linePath, areaPath, plotH, plotW };
}

function LearningCurveChart({ reduceMotion = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(null);

  const { points, linePath, areaPath, plotH } = useMemo(
    () => buildPaths(LEARNING_CURVE_DATA, LEARNING_CURVE_META.maxValue),
    []
  );

  const yTicks = [0, 25, 50, 75, 100];
  const animate = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      className="learning-curve-chart"
      role="img"
      aria-label={`${LEARNING_CURVE_META.title}. Growth from 2022 to present.`}
    >
      <div className="learning-curve-chart__header">
        <div className="learning-curve-chart__legend">
          <span className="learning-curve-chart__legend-line" aria-hidden />
          <span>{LEARNING_CURVE_META.yAxisLabel}</span>
        </div>
        <span className="learning-curve-chart__range">2022 — Present</span>
      </div>

      <div className="learning-curve-chart__canvas-wrap">
        <svg
          className="learning-curve-chart__svg"
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="learningCurveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="learningCurveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary-light, var(--primary))" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y =
              CHART.pad.top +
              plotH -
              (tick / LEARNING_CURVE_META.maxValue) * plotH;
            return (
              <g key={tick} className="learning-curve-chart__grid-row">
                <line
                  x1={CHART.pad.left}
                  y1={y}
                  x2={CHART.width - CHART.pad.right}
                  y2={y}
                  className="learning-curve-chart__grid-line"
                />
                <text
                  x={CHART.pad.left - 10}
                  y={y + 4}
                  className="learning-curve-chart__axis-label"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <motion.path
            d={areaPath}
            className="learning-curve-chart__area"
            fill="url(#learningCurveFill)"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />

          <motion.path
            d={linePath}
            className="learning-curve-chart__line"
            fill="none"
            stroke="url(#learningCurveStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={
              animate ? { pathLength: 0, opacity: 0.4 } : { pathLength: 1, opacity: 1 }
            }
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {points.map((point, index) => (
            <g key={point.label}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={activeIndex === index ? 8 : 5}
                className={`learning-curve-chart__dot ${
                  activeIndex === index ? "learning-curve-chart__dot--active" : ""
                }`}
                initial={animate ? { scale: 0, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 260 }}
              />
              <text
                x={point.x}
                y={CHART.height - 16}
                className="learning-curve-chart__x-label"
                textAnchor={
                  index === 0
                    ? "start"
                    : index === points.length - 1
                      ? "end"
                      : "middle"
                }
              >
                {point.label === "Present" ? "Now" : point.year}
              </text>
            </g>
          ))}
        </svg>

        <div className="learning-curve-chart__markers">
          {points.map((point, index) => (
            <button
              key={point.label}
              type="button"
              className={`learning-curve-chart__marker ${
                activeIndex === index ? "learning-curve-chart__marker--active" : ""
              }`}
              style={{
                left: `${(point.x / CHART.width) * 100}%`,
                top: `${(point.y / CHART.height) * 100}%`,
              }}
              aria-label={`${point.label}: ${point.milestone}`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
            />
          ))}
        </div>

        {activeIndex !== null && (
          <div
            className="learning-curve-chart__tooltip"
            style={{
              left: `${(points[activeIndex].x / CHART.width) * 100}%`,
              top: `${(points[activeIndex].y / CHART.height) * 100}%`,
            }}
          >
            <strong>{points[activeIndex].label}</strong>
            <span className="learning-curve-chart__tooltip-value">
              Index {points[activeIndex].value}
            </span>
            <span>{points[activeIndex].milestone}</span>
          </div>
        )}
      </div>

      <ul className="learning-curve-chart__milestones">
        {LEARNING_CURVE_DATA.map((point) => (
          <li key={point.label}>
            <span className="learning-curve-chart__milestones-date">{point.label}</span>
            <span>{point.milestone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LearningCurveChart;
