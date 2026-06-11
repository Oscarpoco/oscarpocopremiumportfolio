import React, { useState, useEffect, useMemo, useCallback } from "react";

// STYLING
import "../styles/About.css";
import "../styles/Testimonials.css";

// ICONS
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import {
  MdDownload,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdComment,
  MdForum,
  MdCalendarToday,
} from "react-icons/md";
import { BsListUl, BsGridFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// DATABASE
import { testimonials as dummyTestimonials } from "../Database/TestimonialsData";
import { fetchFirebaseTestimonials } from "../../services/testimonialsService";
import TestimonialCommentForm from "../../components/TestimonialCommentForm";

const LIST_PAGE_SIZE = 12;

function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

function getTestimonialDate(item) {
  if (typeof item?.date === "string" && item.date.trim()) {
    return { label: item.date.trim(), dateTime: undefined };
  }

  if (item?.createdAt) {
    const parsed = new Date(item.createdAt);
    if (!Number.isNaN(parsed.getTime())) {
      return {
        label: parsed.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        dateTime: parsed.toISOString(),
      };
    }
  }

  return null;
}

function TestimonialDate({ item, className = "" }) {
  const formatted = getTestimonialDate(item);
  if (!formatted) return null;

  return (
    <span className={`testimonial-date ${className}`.trim()}>
      <MdCalendarToday aria-hidden />
      <time dateTime={formatted.dateTime}>{formatted.label}</time>
    </span>
  );
}

function StarRating({ rating, compact = false }) {
  return (
    <span
      className={compact ? "testimonial-list-rating" : "testimonial-rating"}
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`rating-star ${i < rating ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function Testimonials({ darkMode, toggleTheme, handleDownload }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [viewMode, setViewMode] = useState("carousel");
  const [listPage, setListPage] = useState(1);
  const [firebaseTestimonials, setFirebaseTestimonials] = useState([]);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(true);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const allTestimonials = useMemo(
    () => [...dummyTestimonials, ...[...firebaseTestimonials].reverse()],
    [firebaseTestimonials]
  );

  const communityCount = firebaseTestimonials.length;
  const totalCount = allTestimonials.length;
  const activeItem = allTestimonials[activeTestimonial];

  const totalListPages = Math.max(1, Math.ceil(totalCount / LIST_PAGE_SIZE));

  const paginatedTestimonials = useMemo(() => {
    const start = (listPage - 1) * LIST_PAGE_SIZE;
    return allTestimonials.slice(start, start + LIST_PAGE_SIZE);
  }, [allTestimonials, listPage]);

  const listRangeStart = totalCount === 0 ? 0 : (listPage - 1) * LIST_PAGE_SIZE + 1;
  const listRangeEnd = Math.min(listPage * LIST_PAGE_SIZE, totalCount);

  const loadFirebaseTestimonials = useCallback(async () => {
    setIsLoadingFirebase(true);
    const fetched = await fetchFirebaseTestimonials();
    setFirebaseTestimonials(fetched);
    setIsLoadingFirebase(false);
    return fetched;
  }, []);

  useEffect(() => {
    loadFirebaseTestimonials();
  }, [loadFirebaseTestimonials]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (viewMode !== "carousel" || allTestimonials.length === 0) return;

    const interval = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % allTestimonials.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [viewMode, allTestimonials.length]);

  useEffect(() => {
    if (listPage > totalListPages) {
      setListPage(totalListPages);
    }
  }, [listPage, totalListPages]);

  useEffect(() => {
    if (activeTestimonial >= allTestimonials.length) {
      setActiveTestimonial(Math.max(0, allTestimonials.length - 1));
    }
  }, [activeTestimonial, allTestimonials.length]);

  const goToTestimonial = (index) => {
    setActiveTestimonial(index);
  };

  const goToNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % allTestimonials.length);
  };

  const goToPrev = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length
    );
  };

  const handleCommentSubmitted = async () => {
    const fetched = await loadFirebaseTestimonials();
    const mergedLength = dummyTestimonials.length + fetched.length;
    setActiveTestimonial(Math.max(0, mergedLength - 1));
    setViewMode("carousel");
  };

  const openTestimonialInCarousel = (index) => {
    setActiveTestimonial(index);
    setViewMode("carousel");
  };

  const goToListPage = (page) => {
    setListPage(Math.min(Math.max(1, page), totalListPages));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div
      className={`about-container ${darkMode ? "dark-theme" : ""}`}
      id="testimonials-wrapper"
    >
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </motion.button>

      <div className={`about-header ${isScrolled ? "scrolled" : ""}`}>
        <motion.div
          className="header-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Testimonials</h1>
          <div className="breadcrumb">
            <span>Portfolio</span>
            <IoIosArrowForward className="breadcrumb-icon" />
            <span className="current-page">What They Say</span>
          </div>
        </motion.div>

        <motion.div
          className="header-actions"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            type="button"
            className="action-button"
            whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
            onClick={() => setIsCommentFormOpen(true)}
          >
            <MdComment className="action-icon" />
            <span className="mobileSideBar button-action">Comment</span>
          </motion.button>

          <motion.button
            type="button"
            className="action-button download-btn primary"
            whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
            onClick={handleDownload}
          >
            <MdDownload className="action-icon" />
            <span className="mobileSideBar button-action">Download CV</span>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="testimonials-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="testimonials-section-top">
          <div className="section-header">
            <h2 className="section-title">Client Testimonials</h2>
          </div>

          <motion.div className="testimonials-stats" variants={itemVariants}>
            <div className="testimonials-stat-card">
              <span className="testimonials-stat-value">{totalCount}</span>
              <span className="testimonials-stat-label">Total testimonials</span>
            </div>
            <div className="testimonials-stat-card testimonials-stat-card--accent">
              <span className="testimonials-stat-value">{communityCount}</span>
              <span className="testimonials-stat-label">From the community</span>
            </div>
            {isLoadingFirebase && (
              <span className="testimonials-stat-loading">Syncing comments...</span>
            )}
          </motion.div>
        </div>

        <motion.div className="testimonials-voice-banner" variants={itemVariants}>
          <div className="testimonials-voice-copy">
            <span className="testimonials-voice-eyebrow">
              <MdForum size={16} aria-hidden />
              Your voice belongs here
            </span>
            <h3>Got a story? Drop it on the wall.</h3>
            <p>
              Colleague, client, mentor, or collaborator — if Oscar made an impact,
              say it out loud. One honest comment can help someone else say yes.
            </p>
          </div>
          <motion.button
            type="button"
            className="action-button primary"
            onClick={() => setIsCommentFormOpen(true)}
            whileHover={{ y: -5, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ y: 0, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" }}
          >
            <MdComment className="action-icon" />
            <span>Comment</span>
          </motion.button>
        </motion.div>

        <motion.div className="testimonials-view-bar" variants={itemVariants}>
          <div className="testimonials-view-toggle">
            <button
              type="button"
              className={`testimonials-view-btn ${
                viewMode === "carousel" ? "testimonials-view-btn--active" : ""
              }`}
              onClick={() => setViewMode("carousel")}
            >
              <BsGridFill aria-hidden />
              <span>Spotlight</span>
            </button>
            <button
              type="button"
              className={`testimonials-view-btn ${
                viewMode === "list" ? "testimonials-view-btn--active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <BsListUl aria-hidden />
              <span>All comments</span>
              <span className="testimonials-view-count">{totalCount}</span>
            </button>
          </div>
          {viewMode === "list" && (
            <span className="testimonials-list-summary">
              {listRangeStart}–{listRangeEnd} of {totalCount}
            </span>
          )}
        </motion.div>

        {viewMode === "carousel" && activeItem && (
          <motion.div className="testimonials-slider" variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                className="testimonial-card"
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="quote-icon">"</div>

                <div className="testimonial-header">
                  <div className="testimonial-info">
                    <div className="testimonial-name-row">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {activeItem.name}
                      </motion.h3>
                      {activeItem.source === "firebase" && (
                        <span className="testimonial-community-badge">Community</span>
                      )}
                    </div>
                    <motion.p
                      className="testimonial-role"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeItem.role}
                    </motion.p>
                    {activeItem.company && (
                      <motion.div
                        className="testimonial-company"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <FaBuilding className="company-icon" />
                        {activeItem.company}
                      </motion.div>
                    )}
                    <TestimonialDate item={activeItem} className="testimonial-date--header" />
                  </div>
                </div>

                <motion.div
                  className="testimonial-rating"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <StarRating rating={activeItem.rating} />
                </motion.div>

                <motion.p
                  className="testimonial-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  "{activeItem.content}"
                </motion.p>

                <motion.div
                  className="project-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="detail-item">
                    <span className="detail-label">
                      <FaBriefcase style={{ marginRight: "0.5rem" }} />
                      Project
                    </span>
                    <span className="detail-value">{activeItem.project}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">
                      <FaClock style={{ marginRight: "0.5rem" }} />
                      Duration
                    </span>
                    <span className="detail-value">{activeItem.duration}</span>
                  </div>

                  {(() => {
                    const posted = getTestimonialDate(activeItem);
                    if (!posted) return null;
                    return (
                      <div className="detail-item">
                        <span className="detail-label">
                          <MdCalendarToday style={{ marginRight: "0.5rem" }} />
                          Posted
                        </span>
                        <span className="detail-value">{posted.label}</span>
                      </div>
                    );
                  })()}

                  {activeItem.technologies?.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Technologies</span>
                      <div className="tech-tags">
                        {activeItem.technologies.map((tech, index) => (
                          <motion.span
                            key={`${tech}-${index}`}
                            className="tech-tag"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {viewMode === "carousel" && (
        <div className="testimonial-navigation">
          <motion.button
            type="button"
            className="nav-button"
            onClick={goToPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={allTestimonials.length <= 1}
          >
            <FaChevronLeft />
          </motion.button>

          <div className="testimonial-progress">
            <div className="testimonial-dots">
              {allTestimonials.map((item, index) => (
                <motion.span
                  key={item.id}
                  className={`dot ${activeTestimonial === index ? "active" : ""}`}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    activeTestimonial === index ? { scale: 1.3 } : { scale: 1 }
                  }
                />
              ))}
            </div>
            <span className="progress-text">
              {activeTestimonial + 1} / {allTestimonials.length}
            </span>
          </div>

          <motion.button
            type="button"
            className="nav-button"
            onClick={goToNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={allTestimonials.length <= 1}
          >
            <FaChevronRight />
          </motion.button>
        </div>
        )}

        {viewMode === "list" && (
          <motion.div
            className="testimonials-list-section"
            variants={itemVariants}
          >
            {totalCount === 0 ? (
              <p className="testimonials-list-empty">
                No comments yet. Be the first to share your experience.
              </p>
            ) : (
              <>
                <ul className="testimonials-list">
                  {paginatedTestimonials.map((item, pageIndex) => {
                    const globalIndex = (listPage - 1) * LIST_PAGE_SIZE + pageIndex;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="testimonial-list-item"
                          onClick={() => openTestimonialInCarousel(globalIndex)}
                        >
                          <div className="testimonial-list-item__top">
                            <div className="testimonial-list-item__identity">
                              <span className="testimonial-list-item__name">
                                {item.name}
                              </span>
                              {item.source === "firebase" && (
                                <span className="testimonial-community-badge">
                                  Community
                                </span>
                              )}
                            </div>
                            <StarRating rating={item.rating} compact />
                          </div>
                          <div className="testimonial-list-item__meta">
                            <span>{item.role}</span>
                            {item.company && (
                              <>
                                <span aria-hidden>·</span>
                                <span>{item.company}</span>
                              </>
                            )}
                            {item.project && (
                              <>
                                <span aria-hidden>·</span>
                                <span>{item.project}</span>
                              </>
                            )}
                            {getTestimonialDate(item) && (
                              <>
                                <span aria-hidden>·</span>
                                <TestimonialDate
                                  item={item}
                                  className="testimonial-date--list"
                                />
                              </>
                            )}
                          </div>
                          <p className="testimonial-list-item__content">
                            {truncateText(item.content, 140)}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {totalListPages > 1 && (
                  <nav
                    className="testimonials-list-pagination"
                    aria-label="Testimonials pages"
                  >
                    <button
                      type="button"
                      className="testimonials-page-btn"
                      onClick={() => goToListPage(listPage - 1)}
                      disabled={listPage <= 1}
                    >
                      <FaChevronLeft aria-hidden />
                      Prev
                    </button>

                    {totalListPages <= 9 ? (
                      <div className="testimonials-page-numbers">
                        {Array.from({ length: totalListPages }, (_, i) => i + 1).map(
                          (page) => (
                            <button
                              key={page}
                              type="button"
                              className={`testimonials-page-num ${
                                page === listPage ? "testimonials-page-num--active" : ""
                              }`}
                              onClick={() => goToListPage(page)}
                              aria-current={page === listPage ? "page" : undefined}
                            >
                              {page}
                            </button>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="testimonials-page-status">
                        Page {listPage} of {totalListPages}
                      </span>
                    )}

                    <button
                      type="button"
                      className="testimonials-page-btn"
                      onClick={() => goToListPage(listPage + 1)}
                      disabled={listPage >= totalListPages}
                    >
                      Next
                      <FaChevronRight aria-hidden />
                    </button>
                  </nav>
                )}
              </>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="testimonial-cta"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3>Ready to work together?</h3>
        <p>Let's create something amazing</p>
        <motion.a
          href="mailto:oscarkylepoco@gmail.com"
          className="cta-button"
          whileHover={{ y: -8 }}
          whileTap={{ y: 0 }}
        >
          Get In Touch
        </motion.a>
      </motion.div>

      <motion.div
        className="social-links"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.a
          href="https://github.com/Oscarpoco"
          className="social-link"
          whileHover={{ y: -8, rotate: 5 }}
          whileTap={{ y: 0 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/oscar-poco-71528016b/"
          className="social-link"
          whileHover={{ y: -8, rotate: 5 }}
          whileTap={{ y: 0 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </motion.a>
        <motion.a
          href="https://x.com/PocoOscar"
          className="social-link"
          whileHover={{ y: -8, rotate: 5 }}
          whileTap={{ y: 0 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </motion.a>
      </motion.div>

      <TestimonialCommentForm
        open={isCommentFormOpen}
        onClose={() => setIsCommentFormOpen(false)}
        onSubmitted={handleCommentSubmitted}
        darkMode={darkMode}
      />
    </div>
  );
}

export default Testimonials;
