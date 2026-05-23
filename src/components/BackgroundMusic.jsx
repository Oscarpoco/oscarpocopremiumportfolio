import { useEffect, useRef } from "react";
import { MUSIC_TRACK, MUSIC_VOLUME } from "../config/backgroundMusic";

/**
 * Plays background music via the browser Audio API (off the main thread).
 * Audio is created lazily on first enable so it does not block initial load.
 */
export default function BackgroundMusic({ enabled = false }) {
  const audioRef = useRef(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      audioRef.current?.pause();
      return undefined;
    }

    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(MUSIC_TRACK.src);
      audio.loop = true;
      audio.volume = MUSIC_VOLUME;
      audio.preload = "none";
      audioRef.current = audio;

      audio.addEventListener("error", () => {
        if (import.meta.env.DEV) {
          console.warn(
            `[BackgroundMusic] Could not load "${MUSIC_TRACK.src}". Add your track to public/audio/DaMabusa.mp3`
          );
        }
      });
    }

    let cancelled = false;

    const startPlayback = () => {
      if (cancelled || !enabledRef.current) return;
      audio.play().catch(() => {
        /* Autoplay blocked until user interacts — settings toggle counts */
      });
    };

    if (audio.readyState >= 2) {
      startPlayback();
    } else {
      audio.addEventListener("canplay", startPlayback, { once: true });
      audio.load();
    }

    return () => {
      cancelled = true;
      audio.removeEventListener("canplay", startPlayback);
      if (!enabledRef.current) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [enabled]);

  useEffect(
    () => () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    },
    []
  );

  return null;
}
