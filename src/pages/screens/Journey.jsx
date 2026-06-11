import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  MdDownload,
  MdPlayArrow,
  MdClose,
  MdCheckCircle,
  MdTrendingUp,
  MdRefresh,
  MdCalendarToday,
  MdSchool,
  MdWork,
  MdEmojiEvents,
  MdFlag,
} from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { FaWalking } from "react-icons/fa";
import { journeySteps, getStepColor } from "../Database/JourneyData";
import "../styles/About.css";
import "../styles/Journey.css";

const DESKTOP_MQ = "(min-width: 769px)";
const JOURNEY_STORAGE_KEY = "portfolio-journey-v1";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 22, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.98 },
};

const introVariants = {
  initial: { opacity: 0, y: 24, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.96 },
};

function motionTransition(reduced, preset = "spring") {
  if (reduced) return { duration: 0 };
  if (preset === "tween") {
    return { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] };
  }
  return { type: "spring", stiffness: 120, damping: 16 };
}

function loadJourneyProgress(totalSteps) {
  try {
    const raw = localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (raw) {
      const { started, stepIndex } = JSON.parse(raw);
      const safeIndex = Number.isFinite(stepIndex) ? stepIndex : 0;
      return {
        started: Boolean(started),
        stepIndex: Math.min(Math.max(0, safeIndex), totalSteps),
      };
    }
  } catch {
    /* ignore */
  }
  return { started: false, stepIndex: 0 };
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_MQ).matches
      : true
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

function useJourneyProgress() {
  const totalSteps = journeySteps.length;
  const saved = useMemo(() => loadJourneyProgress(totalSteps), [totalSteps]);
  const [started, setStarted] = useState(saved.started);
  const [stepIndex, setStepIndex] = useState(saved.stepIndex);

  const isComplete = started && stepIndex >= totalSteps;
  const currentStep = started && !isComplete ? journeySteps[stepIndex] : null;

  const progressPct = started
    ? Math.min(100, Math.round((stepIndex / totalSteps) * 100))
    : 0;

  useEffect(() => {
    localStorage.setItem(
      JOURNEY_STORAGE_KEY,
      JSON.stringify({ started, stepIndex })
    );
  }, [started, stepIndex]);

  const handleStart = useCallback(() => {
    setStarted(true);
    setStepIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, totalSteps));
  }, [totalSteps]);

  const handleBack = useCallback(() => {
    setStepIndex((i) => {
      if (i <= 0) {
        setStarted(false);
        return 0;
      }
      return i - 1;
    });
  }, []);

  const handleRestart = useCallback(() => {
    setStarted(false);
    setStepIndex(0);
    localStorage.removeItem(JOURNEY_STORAGE_KEY);
  }, []);

  const handleGoToStep = useCallback((index) => {
    setStarted(true);
    setStepIndex(Math.max(0, Math.min(index, totalSteps)));
  }, [totalSteps]);

  return {
    started,
    stepIndex,
    totalSteps,
    isComplete,
    currentStep,
    progressPct,
    handleStart,
    handleNext,
    handleBack,
    handleRestart,
    handleGoToStep,
  };
}

function JourneyShell({ handleDownload, children, className = "", headerCenter = null }) {
  return (
    <div className={`journey-container ${className}`.trim()}>
      <div
        className={`about-header ${headerCenter ? "about-header--with-center" : ""}`}
      >
        <div className="header-left">
          <h1>Journey</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">Journey</span>
          </div>
        </div>
        {headerCenter && (
          <div className="header-center">{headerCenter}</div>
        )}
        <div className="header-actions">
          <button
            type="button"
            className="action-button download-btn primary"
            onClick={handleDownload}
          >
            <MdDownload className="action-icon" />
            <span className="mobileSideBar button-action">Download CV</span>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

function StepIcon({ step, size = 22 }) {
  const Icon = step.icon;
  return <Icon size={size} aria-hidden />;
}

function JourneyProgressHeader({ started, isComplete, stepIndex, totalSteps, progressPct, reducedMotion }) {
  const label = isComplete
    ? "Journey complete"
    : started
      ? `Stop ${stepIndex + 1} of ${totalSteps}`
      : "Ready to start";

  return (
    <div className="header-progress" aria-live="polite">
      <span className="header-progress-label">
        <GiPathDistance size={18} aria-hidden />
        {label}
      </span>
      <div className="header-progress-track" aria-hidden>
        <motion.div
          className="header-progress-fill"
          initial={false}
          animate={{ width: `${isComplete ? 100 : progressPct}%` }}
          transition={motionTransition(reducedMotion, "tween")}
        />
      </div>
      <span className="header-progress-pct">
        {isComplete ? 100 : progressPct}%
      </span>
    </div>
  );
}

function JourneyIntro({ onStart, reducedMotion, hint = "Click to begin" }) {
  return (
    <motion.div
      key="intro"
      className="journey-intro journey-panel-dotted"
      variants={introVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTransition(reducedMotion)}
    >
      <div className="journey-intro-icon-ring">
        <span className="journey-intro-pulse" />
        <span className="journey-intro-pulse journey-intro-pulse--2" />
        <span className="journey-intro-icon">
          <GiPathDistance size={36} />
        </span>
      </div>
      <h2 className="journey-intro-title">Walk my career road</h2>
      <p className="journey-intro-desc">
        Education, pivots, and experience — one stop at a time.
      </p>
      <motion.button
        type="button"
        className="journey-start-btn"
        onClick={onStart}
        aria-label="Start journey"
        whileHover={reducedMotion ? undefined : { scale: 1.06 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        transition={motionTransition(reducedMotion)}
      >
        <MdPlayArrow size={26} />
      </motion.button>
      <p className="journey-start-hint">{hint}</p>
    </motion.div>
  );
}

function JourneyStepCard({
  step,
  stepIndex,
  reducedMotion,
  onBack,
  onNext,
}) {
  const color = getStepColor(step);

  return (
    <motion.article
      key={step.id}
      className={`journey-card journey-card--${step.status} journey-panel-dotted`}
      style={{ "--card-accent": color }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTransition(reducedMotion)}
      tabIndex={-1}
    >
      <div className="journey-card-connector" aria-hidden />
      <div
        className="journey-card-accent"
        style={{ background: color }}
      />
      <span className="journey-card-checkpoint">
        Checkpoint {stepIndex + 1}
      </span>
      <div className="journey-card-body">
        <header className="journey-card-top">
          <span
            className="journey-card-icon"
            style={{
              background: `color-mix(in srgb, ${color} 8%, transparent)`,
              color,
              borderColor: `color-mix(in srgb, ${color} 33%, transparent)`,
            }}
          >
            <StepIcon step={step} size={22} />
          </span>
          <div className="journey-card-meta">
            <span className={`journey-type journey-type--${step.type}`}>
              {step.type === "education" ? (
                <>
                  <MdSchool size={14} /> Education
                </>
              ) : (
                <>
                  <MdWork size={14} /> Experience
                </>
              )}
            </span>
            <h3>{step.title}</h3>
            <p className="journey-card-role">{step.role}</p>
            <p className="journey-card-tagline">{step.note}</p>
          </div>
        </header>

        <section className="journey-card-details" aria-label="Checkpoint details">
          <div className="journey-card-details-meta">
            <span className="journey-detail">
              <MdCalendarToday size={15} />
              {step.year}
            </span>
            {step.status === "failed" && (
              <span className="journey-badge journey-badge--fail">
                <MdClose size={14} />
                Course not completed
              </span>
            )}
            {step.status === "current" && (
              <span className="journey-badge journey-badge--live">
                <MdTrendingUp size={14} />
                In progress
              </span>
            )}
            {step.status === "completed" && (
              <span className="journey-badge journey-badge--done">
                <MdCheckCircle size={14} />
                Completed
              </span>
            )}
          </div>
          {step.details && (
            <p className="journey-card-description">{step.details}</p>
          )}
        </section>
      </div>

      <div className="journey-card-divider" aria-hidden />

      <footer className="journey-card-footer">
        <motion.button
          type="button"
          className="journey-back-btn"
          onClick={onBack}
          whileHover={reducedMotion ? undefined : { x: -2 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          <IoIosArrowBack size={18} />
          <span>{stepIndex === 0 ? "Exit" : "Back"}</span>
        </motion.button>
        <motion.button
          type="button"
          className="journey-next-btn"
          onClick={onNext}
          whileHover={reducedMotion ? undefined : { x: 2 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          <span>Continue</span>
          <IoIosArrowForward size={18} />
        </motion.button>
      </footer>
    </motion.article>
  );
}

function JourneyFinale({ reducedMotion, onRestart, onNavigate, handleDownload }) {
  return (
    <motion.article
      key="finale"
      className="journey-card journey-card--finale journey-panel-dotted"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={motionTransition(reducedMotion)}
    >
      <div className="journey-card-connector" aria-hidden />
      <div className="journey-card-accent" style={{ background: "var(--primary)" }} />
      <span className="journey-card-checkpoint">Journey complete</span>
      <header className="journey-card-top journey-card-top--center">
        <span className="journey-card-icon journey-card-icon--finale">
          <MdEmojiEvents size={28} />
        </span>
        <h3>Still building the road ahead</h3>
        <p className="journey-finale-text">
          Every stop shaped the developer you see today. Thanks for walking
          through my journey.
        </p>
      </header>
      <div className="journey-card-divider" aria-hidden />
      <footer className="journey-card-footer journey-card-footer--finale">
        <div className="journey-finale-actions">
          <motion.button
            type="button"
            className="journey-finale-link-btn"
            onClick={() => onNavigate?.("Experience")}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          >
            <MdWork size={16} />
            <span>Experience</span>
          </motion.button>
          <motion.button
            type="button"
            className="journey-finale-link-btn"
            onClick={() => onNavigate?.("Education")}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          >
            <MdSchool size={16} />
            <span>Education</span>
          </motion.button>
          <motion.button
            type="button"
            className="journey-finale-link-btn"
            onClick={handleDownload}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          >
            <MdDownload size={16} />
            <span>Download CV</span>
          </motion.button>
        </div>
        <motion.button
          type="button"
          className="journey-restart-btn"
          onClick={onRestart}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          <MdRefresh size={18} />
          <span>Play again</span>
        </motion.button>
      </footer>
    </motion.article>
  );
}

function JourneyContentPanel({
  started,
  isComplete,
  currentStep,
  stepIndex,
  reducedMotion,
  onStart,
  onBack,
  onNext,
  onRestart,
  onNavigate,
  handleDownload,
  startHint,
}) {
  return (
    <motion.div className="journey-content" variants={itemVariants}>
      <AnimatePresence>
        {started && (currentStep || isComplete) && (
          <motion.div
            key="bridge"
            className="journey-content-bridge"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition(reducedMotion)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!started && (
          <JourneyIntro
            onStart={onStart}
            reducedMotion={reducedMotion}
            hint={startHint}
          />
        )}

        {started && currentStep && !isComplete && (
          <JourneyStepCard
            step={currentStep}
            stepIndex={stepIndex}
            reducedMotion={reducedMotion}
            onBack={onBack}
            onNext={onNext}
          />
        )}

        {isComplete && (
          <JourneyFinale
            reducedMotion={reducedMotion}
            onRestart={onRestart}
            onNavigate={onNavigate}
            handleDownload={handleDownload}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function JourneyDesktopTrack({
  started,
  isComplete,
  stepIndex,
  currentStep,
  reducedMotion,
  onGoToStep,
  lineFillPct,
  travelerLeft,
}) {
  return (
    <motion.div
      className="journey-track-panel journey-panel-dotted"
      variants={itemVariants}
    >
      <div className="journey-track-header">
        <span className="journey-track-title">Career path</span>
        <AnimatePresence mode="wait">
          {started && !isComplete && currentStep && (
            <motion.span
              key={currentStep.id}
              className="journey-track-sub"
              style={{ color: getStepColor(currentStep) }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={motionTransition(reducedMotion)}
            >
              {currentStep.year}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="journey-track-scroll journey-scroll">
        <div className="journey-track">
          <div className="journey-track-lines" aria-hidden>
            <div className="journey-track-line" />
            <motion.div
              className="journey-track-line-fill"
              initial={false}
              animate={{ width: `${lineFillPct}%` }}
              transition={motionTransition(reducedMotion, "tween")}
            />
          </div>

          <motion.div
            className={`journey-traveler ${started ? "journey-traveler--active" : ""}`}
            initial={false}
            animate={{
              left: started
                ? `calc(${travelerLeft} - var(--journey-icon-size, 34px) / 2)`
                : "0",
              opacity: started ? 1 : 0,
              scale: started ? 1 : 0.8,
            }}
            transition={motionTransition(reducedMotion, "tween")}
          >
            <FaWalking size={16} />
          </motion.div>

          <motion.div className="journey-nodes" variants={containerVariants}>
            <motion.div
              className={[
                "journey-node",
                "journey-node--start",
                started
                  ? "journey-node--passed"
                  : "journey-node--active journey-node--upcoming",
              ].join(" ")}
              variants={itemVariants}
              animate={{
                y: started ? 0 : -3,
                scale: started ? 1 : 1.05,
              }}
              transition={motionTransition(reducedMotion)}
            >
              <motion.span
                className="journey-node-icon journey-node-icon--start"
                layout
                animate={{ scale: started ? 1 : 1.08 }}
                transition={motionTransition(reducedMotion)}
              >
                <MdFlag size={16} />
              </motion.span>
              <span className="journey-node-label">Start</span>
            </motion.div>

            {journeySteps.map((stop, i) => {
              const isPassed = started && stepIndex > i;
              const isActive = started && stepIndex === i && !isComplete;
              const isUpcoming = !isPassed && !isActive;
              const isCurrentRole = stop.status === "current";
              const Icon = stop.icon;
              const color = getStepColor(stop);
              const yearLabel = stop.year.includes("–")
                ? stop.year.replace(" – Present", "+").replace(" – ", "–")
                : stop.year;
              const canJump = !started || i <= stepIndex;

              return (
                <motion.button
                  key={stop.id}
                  type="button"
                  className={[
                    "journey-node",
                    "journey-node--clickable",
                    isPassed ? "journey-node--passed" : "",
                    isActive ? "journey-node--active" : "",
                    isUpcoming ? "journey-node--upcoming" : "",
                    isCurrentRole ? "journey-node--role-current" : "",
                    !canJump ? "journey-node--locked" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ "--node-color": color }}
                  variants={itemVariants}
                  animate={{
                    y: isActive ? -3 : 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={motionTransition(reducedMotion)}
                  onClick={() => canJump && onGoToStep(i)}
                  disabled={!canJump}
                  aria-label={`${stop.title}, ${stop.year}${isActive ? ", current stop" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <motion.span
                    className="journey-node-icon"
                    layout
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={motionTransition(reducedMotion)}
                  >
                    <Icon size={16} />
                  </motion.span>
                  <span className="journey-node-year">{yearLabel}</span>
                  {isCurrentRole && (
                    <motion.span
                      className="journey-node-tag"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={motionTransition(reducedMotion)}
                    >
                      Current
                    </motion.span>
                  )}
                </motion.button>
              );
            })}

            <motion.button
              type="button"
              className={[
                "journey-node",
                "journey-node--finish",
                "journey-node--clickable",
                isComplete
                  ? "journey-node--passed journey-node--active"
                  : "journey-node--upcoming journey-node--locked",
              ].join(" ")}
              variants={itemVariants}
              animate={{
                y: isComplete ? -3 : 0,
                scale: isComplete ? 1.05 : 1,
              }}
              transition={motionTransition(reducedMotion)}
              onClick={() => isComplete && onGoToStep(journeySteps.length)}
              disabled={!isComplete}
              aria-label="Journey end"
            >
              <motion.span
                className="journey-node-icon"
                layout
                animate={{ scale: isComplete ? 1.08 : 1 }}
                transition={motionTransition(reducedMotion)}
              >
                <MdCheckCircle size={16} />
              </motion.span>
              <span className="journey-node-label">End</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function JourneyMobileTimeline({
  started,
  isComplete,
  stepIndex,
  onGoToStep,
}) {
  return (
    <div className="journey-mobile-timeline journey-panel-dotted">
      <span className="journey-mobile-timeline-title">Career path</span>
      <ol className="journey-mobile-steps journey-scroll" aria-label="Career milestones">
        {journeySteps.map((stop, i) => {
          const isPassed = started && stepIndex > i;
          const isActive = started && stepIndex === i && !isComplete;
          const canJump = !started || i <= stepIndex;
          const Icon = stop.icon;

          return (
            <li key={stop.id}>
              <button
                type="button"
                className={[
                  "journey-mobile-step",
                  isPassed ? "journey-mobile-step--passed" : "",
                  isActive ? "journey-mobile-step--active" : "",
                  !canJump ? "journey-mobile-step--locked" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--node-color": getStepColor(stop) }}
                onClick={() => canJump && onGoToStep(i)}
                disabled={!canJump}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="journey-mobile-step-icon">
                  <Icon size={16} />
                </span>
                <span className="journey-mobile-step-copy">
                  <span className="journey-mobile-step-year">{stop.year}</span>
                  <span className="journey-mobile-step-name">{stop.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Journey({ handleDownload, navigateToSection }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const boardRef = useRef(null);
  const progress = useJourneyProgress();

  const {
    started,
    stepIndex,
    totalSteps,
    isComplete,
    currentStep,
    progressPct,
    handleStart,
    handleNext,
    handleBack,
    handleRestart,
    handleGoToStep,
  } = progress;

  const trackSlots = totalSteps + 2;

  const lineFillPct = useMemo(() => {
    if (!started) return 0;
    if (isComplete) return 100;
    return ((stepIndex + 1) / trackSlots) * 100;
  }, [started, isComplete, stepIndex, trackSlots]);

  const travelerLeft = useMemo(() => {
    if (!started) return "0%";
    if (isComplete) return "100%";
    return `${((stepIndex + 1) / trackSlots) * 100}%`;
  }, [started, isComplete, stepIndex, trackSlots]);

  useEffect(() => {
    if (!started) return;

    const onKeyDown = (e) => {
      if (e.target.closest("button, input, textarea, select, a")) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!isComplete) handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [started, isComplete, handleNext, handleBack]);

  const headerProgress = (
    <JourneyProgressHeader
      started={started}
      isComplete={isComplete}
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      progressPct={progressPct}
      reducedMotion={reducedMotion}
    />
  );

  const contentPanelProps = {
    started,
    isComplete,
    currentStep,
    stepIndex,
    reducedMotion,
    onStart: handleStart,
    onBack: handleBack,
    onNext: handleNext,
    onRestart: handleRestart,
    onNavigate: navigateToSection,
    handleDownload,
  };

  if (!isDesktop) {
    return (
      <JourneyShell
        handleDownload={handleDownload}
        headerCenter={started ? headerProgress : null}
      >
        <motion.div
          className="journey-mobile-board"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(reducedMotion)}
        >
          {started && (
            <JourneyMobileTimeline
              started={started}
              isComplete={isComplete}
              stepIndex={stepIndex}
              onGoToStep={handleGoToStep}
            />
          )}
          <JourneyContentPanel
            {...contentPanelProps}
            startHint="Tap to begin"
          />
        </motion.div>
      </JourneyShell>
    );
  }

  return (
    <JourneyShell handleDownload={handleDownload} headerCenter={headerProgress}>
      <motion.div
        ref={boardRef}
        className={`journey-board ${!started ? "journey-board--idle" : ""} ${reducedMotion ? "journey-board--reduced" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <JourneyDesktopTrack
          started={started}
          isComplete={isComplete}
          stepIndex={stepIndex}
          currentStep={currentStep}
          reducedMotion={reducedMotion}
          onGoToStep={handleGoToStep}
          lineFillPct={lineFillPct}
          travelerLeft={travelerLeft}
        />

        <JourneyContentPanel
          {...contentPanelProps}
          startHint="Click to begin"
        />
      </motion.div>
    </JourneyShell>
  );
}

export default Journey;
