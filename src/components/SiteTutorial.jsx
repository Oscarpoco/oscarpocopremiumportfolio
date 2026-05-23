import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  isSiteTutorialComplete,
  completeSiteTutorial,
} from "../config/tutorialPreferences";
import "./SiteTutorial.css";

const SPOTLIGHT_PAD = 10;

const ALL_STEPS = [
  {
    id: "sidebar",
    target: '[data-tutorial="sidebar"]',
    title: "Navigate the portfolio",
    body: (
      <>
        <strong>Click any section here</strong> to move between Dashboard,
        Skills, Experience, and the rest of the site.
      </>
    ),
    placement: "right",
    advanceOnClick: true,
  },
  {
    id: "section-indicator",
    target: '[data-tutorial="section-indicator"]',
    title: "Know where you are",
    body: (
      <>
        This label shows the <strong>section you are viewing</strong> as you
        explore the portfolio.
      </>
    ),
    placement: "bottom",
    minWidth: 993,
  },
  {
    id: "theme",
    target: '[data-tutorial="theme"]',
    title: "Switch appearance",
    body: (
      <>
        <strong>Click here</strong> to toggle between light and dark mode
        anytime.
      </>
    ),
    placement: "bottom",
    minWidth: 769,
  },
  {
    id: "settings",
    target: '[data-tutorial="settings"]',
    title: "Customize your view",
    body: (
      <>
        <strong>Open Settings</strong> to change color palettes, particles, and
        other display preferences.
      </>
    ),
    placement: "bottom",
    minWidth: 769,
  },
  {
    id: "profile",
    target: '[data-tutorial="profile"]',
    title: "One-page portfolio",
    body: (
      <>
        <strong>Click your profile area</strong> to open the compact one-page
        portfolio view.
      </>
    ),
    placement: "bottom",
    minWidth: 769,
  },
  {
    id: "global-theme",
    target: '[data-tutorial="global-theme"]',
    title: "Quick theme toggle",
    body: (
      <>
        On smaller screens, use this <strong>floating button</strong> to switch
        light and dark mode quickly.
      </>
    ),
    placement: "top",
    maxWidth: 768,
  },
  {
    id: "osbot",
    target: '[data-tutorial="osbot"]',
    title: "Meet OSBOT",
    body: (
      <>
        <strong>Tap OSBOT</strong> for the AI assistant (still under
        construction). You are all set — enjoy exploring!
      </>
    ),
    placement: "top",
  },
];

function getViewportWidth() {
  return typeof window !== "undefined" ? window.innerWidth : 1200;
}

function filterStepsForViewport(width) {
  return ALL_STEPS.filter((step) => {
    if (step.minWidth != null && width < step.minWidth) return false;
    if (step.maxWidth != null && width > step.maxWidth) return false;
    const el = document.querySelector(step.target);
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function computePositions(rect, placement, tooltipSize) {
  const margin = 14;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tw = tooltipSize.width || 320;
  const th = tooltipSize.height || 180;

  let top;
  let left;
  let arrowTop;
  let arrowLeft;
  let arrowPlacement = placement;

  switch (placement) {
    case "right":
      left = rect.right + margin;
      top = rect.top + rect.height / 2 - th / 2;
      arrowPlacement = "left";
      arrowLeft = left - 20;
      arrowTop = rect.top + rect.height / 2 - 10;
      break;
    case "left":
      left = rect.left - tw - margin;
      top = rect.top + rect.height / 2 - th / 2;
      arrowPlacement = "right";
      arrowLeft = rect.left - margin;
      arrowTop = rect.top + rect.height / 2 - 10;
      break;
    case "top":
      left = rect.left + rect.width / 2 - tw / 2;
      top = rect.top - th - margin;
      arrowPlacement = "bottom";
      arrowLeft = rect.left + rect.width / 2 - 10;
      arrowTop = rect.top - margin;
      break;
    case "bottom":
    default:
      left = rect.left + rect.width / 2 - tw / 2;
      top = rect.bottom + margin;
      arrowPlacement = "top";
      arrowLeft = rect.left + rect.width / 2 - 10;
      arrowTop = rect.bottom + margin - 20;
      break;
  }

  left = clamp(left, 12, vw - tw - 12);
  top = clamp(top, 12, vh - th - 12);

  return { top, left, arrowTop, arrowLeft, arrowPlacement };
}

export default function SiteTutorial({ ready = false, darkMode = false, onComplete }) {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [storageReady, setStorageReady] = useState(false);
  const [alreadyComplete, setAlreadyComplete] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);
  const [layout, setLayout] = useState({
    spotlight: null,
    tooltip: { top: 0, left: 0 },
    arrow: null,
  });

  const tooltipRef = useRef(null);
  const finishRef = useRef(onComplete);

  useEffect(() => {
    finishRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setAlreadyComplete(isSiteTutorialComplete());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(getViewportWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const steps = useMemo(
    () => (storageReady && open ? filterStepsForViewport(viewportWidth) : []),
    [storageReady, open, viewportWidth]
  );

  const currentStep = steps[stepIndex] ?? null;

  const finishTutorial = useCallback(() => {
    completeSiteTutorial();
    setAlreadyComplete(true);
    setOpen(false);
    finishRef.current?.();
  }, []);

  useEffect(() => {
    if (!storageReady || alreadyComplete || !ready) return;
    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, [storageReady, alreadyComplete, ready]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const updateLayout = useCallback(() => {
    if (!currentStep) return;

    const target = document.querySelector(currentStep.target);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const spotlight = {
      top: rect.top - SPOTLIGHT_PAD,
      left: rect.left - SPOTLIGHT_PAD,
      width: rect.width + SPOTLIGHT_PAD * 2,
      height: rect.height + SPOTLIGHT_PAD * 2,
    };

    const tooltipSize = tooltipRef.current
      ? {
          width: tooltipRef.current.offsetWidth,
          height: tooltipRef.current.offsetHeight,
        }
      : { width: 320, height: 180 };

    const pos = computePositions(rect, currentStep.placement, tooltipSize);

    setLayout({
      spotlight,
      tooltip: { top: pos.top, left: pos.left },
      arrow: {
        top: pos.arrowTop,
        left: pos.arrowLeft,
        placement: pos.arrowPlacement,
      },
    });
  }, [currentStep]);

  useEffect(() => {
    if (!open || !currentStep) return;

    updateLayout();

    const scrollRoot = document.querySelector(".Child-dashboard");
    const onScroll = () => updateLayout();
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);
    scrollRoot?.addEventListener("scroll", onScroll);

    const ro = new ResizeObserver(() => updateLayout());
    const target = document.querySelector(currentStep.target);
    if (target) ro.observe(target);

    return () => {
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
      scrollRoot?.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [open, currentStep, stepIndex, updateLayout]);

  useEffect(() => {
    if (!open) return;
    if (steps.length === 0) {
      finishTutorial();
      return;
    }
    if (stepIndex >= steps.length) {
      setStepIndex(steps.length - 1);
    }
  }, [open, steps.length, stepIndex, finishTutorial]);

  useEffect(() => {
    if (!open || !currentStep) return;
    const stillPresent = steps.some((s) => s.id === currentStep.id);
    if (!stillPresent && steps.length > 0) {
      setStepIndex(0);
    }
  }, [open, currentStep, steps, viewportWidth]);

  useEffect(() => {
    if (!open || !currentStep?.advanceOnClick) return;

    const target = document.querySelector(currentStep.target);
    if (!target) return;

    const onTargetClick = (e) => {
      const navItem = e.target.closest(".navigation-item");
      if (!navItem) return;
      window.setTimeout(() => {
        setStepIndex((i) => {
          if (i >= steps.length - 1) return i;
          return i + 1;
        });
      }, 280);
    };

    target.addEventListener("click", onTargetClick);
    return () => target.removeEventListener("click", onTargetClick);
  }, [open, currentStep, steps.length]);

  const goNext = () => {
    if (stepIndex >= steps.length - 1) {
      finishTutorial();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const mounted = typeof document !== "undefined";
  if (!mounted || !storageReady || alreadyComplete) return null;

  const showLayer = open && currentStep && layout.spotlight;

  return createPortal(
    <AnimatePresence>
      {showLayer ? (
        <motion.div
          key="site-tutorial-layer"
          className={`site-tutorial-layer ${darkMode ? "dark-theme" : ""}`}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="site-tutorial-spotlight site-tutorial-pulse"
            style={{
              top: layout.spotlight.top,
              left: layout.spotlight.left,
              width: layout.spotlight.width,
              height: layout.spotlight.height,
            }}
            aria-hidden
          />

          {layout.arrow ? (
            <div
              className={`site-tutorial-arrow site-tutorial-arrow--${layout.arrow.placement}`}
              style={{ top: layout.arrow.top, left: layout.arrow.left }}
              aria-hidden
            />
          ) : null}

          <motion.div
            ref={tooltipRef}
            className="site-tutorial-tooltip"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-tutorial-title"
            style={{
              top: layout.tooltip.top,
              left: layout.tooltip.left,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onAnimationComplete={updateLayout}
          >
            <div className="site-tutorial-tooltip-header">
              <span className="site-tutorial-step-badge">
                Step {stepIndex + 1} of {steps.length}
              </span>
              <button
                type="button"
                className="site-tutorial-skip"
                onClick={finishTutorial}
              >
                Skip tour
              </button>
            </div>

            <h2 id="site-tutorial-title">{currentStep.title}</h2>
            <p>{currentStep.body}</p>

            <div className="site-tutorial-actions">
              <div className="site-tutorial-dots" aria-hidden>
                {steps.map((step, i) => (
                  <span
                    key={step.id}
                    className={`site-tutorial-dot${i === stepIndex ? " site-tutorial-dot--active" : ""}`}
                  />
                ))}
              </div>

              <div className="site-tutorial-nav-buttons">
                <button
                  type="button"
                  className="site-tutorial-btn"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="site-tutorial-btn site-tutorial-btn--primary"
                  onClick={goNext}
                >
                  {stepIndex >= steps.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
