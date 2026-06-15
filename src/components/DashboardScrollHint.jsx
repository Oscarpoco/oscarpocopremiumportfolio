import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

function DashboardScrollHint({ show, label = "Scroll Down" }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <div className="dashboard-scroll-hint-anchor" aria-hidden>
          <motion.div
            key="dashboard-scroll-hint"
            className="dashboard-scroll-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.28 }}
          >
            <IoIosArrowDown className="dashboard-scroll-hint-icon" />
            {label}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default DashboardScrollHint;
