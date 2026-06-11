import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdSend, MdStar, MdStarBorder } from "react-icons/md";
import { submitTestimonial } from "../services/testimonialsService";
import "../pages/styles/About.css";
import "./TestimonialCommentForm.css";

const INITIAL_FORM = {
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  project: "",
  duration: "",
  technologies: "",
};

export default function TestimonialCommentForm({
  open,
  onClose,
  onSubmitted,
  darkMode = false,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setForm(INITIAL_FORM);
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitTestimonial(form);
      setStatus("success");
      onSubmitted?.();
      window.setTimeout(() => {
        onClose();
      }, 1400);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error?.message || "Could not save your comment. Please try again."
      );
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`testimonial-form-layer ${darkMode ? "dark-theme" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="testimonial-form-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimonial-form-title"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="testimonial-form-close"
              onClick={onClose}
              aria-label="Close comment form"
            >
              <MdClose size={22} />
            </button>

            <div className="testimonial-form-header">
              <span className="testimonial-form-badge">Share your experience</span>
              <h2 id="testimonial-form-title">Leave a testimonial</h2>
              <p>
                Worked with Oscar? Your words help others know what it is like
                to collaborate with him.
              </p>
            </div>

            {status === "success" ? (
              <div className="testimonial-form-success">
                <MdStar size={28} />
                <h3>Thank you!</h3>
                <p>Your comment was added to the wall of praise.</p>
              </div>
            ) : (
              <form className="testimonial-form" onSubmit={handleSubmit}>
                <div className="testimonial-form-grid">
                  <label className="testimonial-form-field">
                    <span>Your name *</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={updateField("name")}
                      placeholder="Thandiwe Mokoena"
                      required
                      maxLength={80}
                    />
                  </label>

                  <label className="testimonial-form-field">
                    <span>Role *</span>
                    <input
                      type="text"
                      value={form.role}
                      onChange={updateField("role")}
                      placeholder="UI/UX Designer"
                      required
                      maxLength={80}
                    />
                  </label>

                  <label className="testimonial-form-field">
                    <span>Company</span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={updateField("company")}
                      placeholder="Joburg Digital Studio"
                      maxLength={100}
                    />
                  </label>

                  <label className="testimonial-form-field">
                    <span>Project</span>
                    <input
                      type="text"
                      value={form.project}
                      onChange={updateField("project")}
                      placeholder="E-Commerce Mobile App"
                      maxLength={100}
                    />
                  </label>

                  <label className="testimonial-form-field">
                    <span>Duration</span>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={updateField("duration")}
                      placeholder="3 months"
                      maxLength={40}
                    />
                  </label>

                  <label className="testimonial-form-field">
                    <span>Technologies</span>
                    <input
                      type="text"
                      value={form.technologies}
                      onChange={updateField("technologies")}
                      placeholder="React, Node.js, Firebase"
                      maxLength={120}
                    />
                  </label>
                </div>

                <label className="testimonial-form-field testimonial-form-field--full">
                  <span>Your comment *</span>
                  <textarea
                    value={form.content}
                    onChange={updateField("content")}
                    placeholder="Share what stood out about working together..."
                    required
                    rows={5}
                    maxLength={800}
                  />
                </label>

                <div className="testimonial-form-rating">
                  <span>Rating *</span>
                  <div className="testimonial-form-stars">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`testimonial-form-star ${
                          value <= form.rating ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, rating: value }))
                        }
                        aria-label={`Rate ${value} out of 5`}
                      >
                        {value <= form.rating ? (
                          <MdStar size={24} />
                        ) : (
                          <MdStarBorder size={24} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {status === "error" && (
                  <p className="testimonial-form-error" role="alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="action-button primary testimonial-form-submit"
                  disabled={status === "submitting"}
                >
                  <MdSend size={18} />
                  <span>
                    {status === "submitting" ? "Sending..." : "Post comment"}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
