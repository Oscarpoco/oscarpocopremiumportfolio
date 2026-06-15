import { memo, useMemo } from "react";
import {
  MdAcUnit,
  MdLocalFlorist,
  MdSpa,
  MdCode,
  MdTerminal,
  MdStorage,
  MdApi,
  MdBugReport,
  MdSportsSoccer,
  MdEmojiEvents,
  MdStadium,
} from "react-icons/md";
import { FaReact, FaFutbol } from "react-icons/fa";
import { BiCodeAlt } from "react-icons/bi";
import { TbTrophy } from "react-icons/tb";
import "./FallingParticles.css";

const PARTICLE_COUNT = 22;

const ICON_SETS = {
  snow: [MdAcUnit],
  flowers: [MdLocalFlorist, MdSpa],
  dev: [MdCode, MdTerminal, FaReact, BiCodeAlt, MdStorage, MdApi, MdBugReport],
  worldcup: [FaFutbol, MdSportsSoccer, MdEmojiEvents, TbTrophy, MdStadium],
};

function pickIcon(type, index) {
  const set = ICON_SETS[type] || ICON_SETS.snow;
  return set[index % set.length];
}

function createParticles(type) {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: `${type}-${i}`,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i * 0.7) % 12}s`,
    duration: `${10 + (i % 8)}s`,
    size: 14 + (i % 4) * 4,
    drift: i % 2 === 0 ? -28 : 28,
    opacity: 0.35 + (i % 5) * 0.1,
    Icon: pickIcon(type, i),
  }));
}

function FallingParticles({ effect = "none" }) {
  const particles = useMemo(
    () => (effect && effect !== "none" ? createParticles(effect) : []),
    [effect]
  );

  if (!particles.length) return null;

  return (
    <div
      className={`falling-particles falling-particles--${effect}`}
      aria-hidden
    >
      {particles.map(({ id, left, delay, duration, size, drift, opacity, Icon }) => (
        <span
          key={id}
          className="falling-particle"
          style={{
            left,
            animationDelay: delay,
            animationDuration: duration,
            "--particle-size": `${size}px`,
            "--particle-drift": `${drift}px`,
            opacity,
          }}
        >
          <Icon size={size} />
        </span>
      ))}
    </div>
  );
}

export default memo(FallingParticles);
