import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  MdDownload,
  MdPlayArrow,
  MdComputer,
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
import { BsArrowRight } from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { journeySteps } from "../Database/JourneyData";
import "../styles/About.css";
import "../styles/Journey.css";

const DESKTOP_MQ = "(min-width: 769px)";

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

function Journey({ handleDownload }) {
  const isDesktop = useIsDesktop();
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const totalSteps = journeySteps.length;
  const isComplete = started && stepIndex >= totalSteps;
  const currentStep = started && !isComplete ? journeySteps[stepIndex] : null;

  const progressPct = started
    ? Math.min(100, Math.round((stepIndex / totalSteps) * 100))
    : 0;

  /** Start + milestones + end — line stops at node centers, not through circles */
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
  }, []);

  if (!isDesktop) {
    return (
      <JourneyShell handleDownload={handleDownload}>
        <motion.div
          className="journey-mobile-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition(reducedMotion)}
        >
          <motion.div
            className="journey-mobile-icon-wrap"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={motionTransition(reducedMotion)}
          >
            <MdComputer size={40} />
          </motion.div>
          <h2>Journey is desktop-only</h2>
          <p>
            This interactive roadmap is built for a wide screen. Open the portfolio on a
            laptop or desktop to walk through Oscar&apos;s path.
          </p>
        </motion.div>
      </JourneyShell>
    );
  }

  const headerProgress = (
    <div className="header-progress">
      <span className="header-progress-label">
        <GiPathDistance size={18} aria-hidden />
        {started
          ? `Stop ${stepIndex + 1} of ${totalSteps}`
          : isComplete
            ? "Journey complete"
            : "Ready to start"}
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

  return (
    <JourneyShell handleDownload={handleDownload} headerCenter={headerProgress}>
      <motion.div
        className={`journey-board ${!started ? "journey-board--idle" : ""} ${reducedMotion ? "journey-board--reduced" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
                  style={{ color: currentStep.color }}
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
                const yearLabel = stop.year.includes("–")
                  ? stop.year.replace(" – Present", "+").replace(" – ", "–")
                  : stop.year;

                return (
                  <motion.div
                    key={stop.id}
                    className={[
                      "journey-node",
                      isPassed ? "journey-node--passed" : "",
                      isActive ? "journey-node--active" : "",
                      isUpcoming ? "journey-node--upcoming" : "",
                      isCurrentRole ? "journey-node--role-current" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--node-color": stop.color }}
                    variants={itemVariants}
                    animate={{
                      y: isActive ? -3 : 0,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={motionTransition(reducedMotion)}
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
                  </motion.div>
                );
              })}

              <motion.div
                className={[
                  "journey-node",
                  "journey-node--finish",
                  isComplete
                    ? "journey-node--passed journey-node--active"
                    : "journey-node--upcoming",
                ].join(" ")}
                variants={itemVariants}
                animate={{
                  y: isComplete ? -3 : 0,
                  scale: isComplete ? 1.05 : 1,
                }}
                transition={motionTransition(reducedMotion)}
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

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
                onClick={handleStart}
                aria-label="Start journey"
                whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                transition={motionTransition(reducedMotion)}
              >
                <MdPlayArrow size={26} />
              </motion.button>
              <p className="journey-start-hint">Tap to begin</p>
              </motion.div>
            )}

            {started && currentStep && !isComplete && (
              <motion.article
                key={currentStep.id}
                className={`journey-card journey-card--${currentStep.status} journey-panel-dotted`}
                style={{ "--card-accent": currentStep.color }}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={motionTransition(reducedMotion)}
              >
              <div className="journey-card-connector" aria-hidden />
              <div
                className="journey-card-accent"
                style={{ background: currentStep.color }}
              />
              <span className="journey-card-checkpoint">
                Checkpoint {stepIndex + 1}
              </span>
              <div className="journey-card-body">
                <header className="journey-card-top">
                <span
                  className="journey-card-icon"
                  style={{
                    background: `${currentStep.color}14`,
                    color: currentStep.color,
                    borderColor: `${currentStep.color}55`,
                  }}
                >
                  <StepIcon step={currentStep} size={22} />
                </span>
                <div className="journey-card-meta">
                  <span className={`journey-type journey-type--${currentStep.type}`}>
                    {currentStep.type === "education" ? (
                      <>
                        <MdSchool size={14} /> Education
                      </>
                    ) : (
                      <>
                        <MdWork size={14} /> Experience
                      </>
                    )}
                  </span>
                  <h3>{currentStep.title}</h3>
                  <p className="journey-card-role">{currentStep.role}</p>
                    <p className="journey-card-tagline">{currentStep.note}</p>
                </div>
              </header>

                <section className="journey-card-details" aria-label="Checkpoint details">
                  <div className="journey-card-details-meta">
                    <span className="journey-detail">
                  <MdCalendarToday size={15} />
                  {currentStep.year}
                </span>
                {currentStep.status === "failed" && (
                  <span className="journey-badge journey-badge--fail">
                    <MdClose size={14} />
                    Course not completed
                  </span>
                )}
                {currentStep.status === "current" && (
                  <span className="journey-badge journey-badge--live">
                    <MdTrendingUp size={14} />
                    In progress
                  </span>
                )}
                {currentStep.status === "completed" && (
                  <span className="journey-badge journey-badge--done">
                    <MdCheckCircle size={14} />
                    Completed
                  </span>
                )}
                  </div>
                  <p className="journey-card-description">
                    {currentStep.details || currentStep.note}
                  </p>
                </section>
              </div>

              <div className="journey-card-divider" aria-hidden />

              <footer className="journey-card-footer">
                <motion.button
                  type="button"
                  className="journey-back-btn"
                  onClick={handleBack}
                  whileHover={reducedMotion ? undefined : { x: -2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  <IoIosArrowBack size={18} />
                  <span>{stepIndex === 0 ? "Exit" : "Back"}</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="journey-next-btn"
                  onClick={handleNext}
                  whileHover={reducedMotion ? undefined : { x: 2 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  <span>Continue</span>
                  <IoIosArrowForward size={18} />
                </motion.button>
              </footer>
              </motion.article>
            )}

            {isComplete && (
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
              <footer className="journey-card-footer journey-card-footer--center">
                <motion.button
                  type="button"
                  className="journey-restart-btn"
                  onClick={handleRestart}
                  whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  <MdRefresh size={18} />
                  <span>Play again</span>
                </motion.button>
              </footer>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </JourneyShell>
  );
}

export default Journey;
