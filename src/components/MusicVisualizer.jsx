import { motion, AnimatePresence } from "framer-motion";
import { MdMusicNote } from "react-icons/md";
import { MUSIC_TRACK } from "../config/backgroundMusic";

const BAR_COUNT = 5;

export default function MusicVisualizer({ playing = false, reducedMotion = false }) {
  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          className="nav-music-viz"
          role="status"
          aria-live="polite"
          aria-label={`Now playing: ${MUSIC_TRACK.title} by ${MUSIC_TRACK.artist}`}
          initial={{ opacity: 0, scale: 0.9, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <MdMusicNote className="nav-music-viz-icon" size={14} aria-hidden />
          <span className="nav-music-viz-label">
            <span className="nav-music-viz-title">{MUSIC_TRACK.title}</span>
            <span className="nav-music-viz-artist">{MUSIC_TRACK.artist}</span>
          </span>
          <div
            className={`nav-music-viz-bars${reducedMotion ? " nav-music-viz-bars--static" : ""}`}
            aria-hidden
          >
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <span
                key={i}
                className="nav-music-viz-bar"
                style={reducedMotion ? undefined : { animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
