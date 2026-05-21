import type { ReactNode } from "react";

// Ring — circular SVG progress indicator. Lifted from the Omelette prototype
// (ui.jsx Ring component) and TS-converted. Used by Library Today snapshot,
// Food Log day hero, Nutrition tab per-serving display, and Pulse macros.
//
// Stroke colors take CSS color strings (default: `rgb(var(--accent))` and
// `rgb(var(--rule))`) rather than Tailwind class names because the SVG
// strokeDashoffset math is computed in JS and bundling the color resolution
// alongside it keeps the call site readable.
//
// Children render centered inside the ring via absolute-positioned grid; the
// usual content is a JetBrains Mono numeric or a label+number stack.

interface RingProps {
  /** Progress percentage 0-100. Values outside the range are clamped. */
  pct: number;
  /** Outer diameter in px. Default 72. */
  size?: number;
  /** Stroke thickness in px. Default 8. */
  stroke?: number;
  /** Stroke color for the filled arc. Any CSS color. Default --accent. */
  color?: string;
  /** Stroke color for the empty track. Any CSS color. Default --rule. */
  track?: string;
  /** Centered content. */
  children?: ReactNode;
  /** Accessible label describing what the ring represents. */
  ariaLabel?: string;
}

export function Ring({
  pct,
  size = 72,
  stroke = 8,
  color = "rgb(var(--accent))",
  track = "rgb(var(--rule))",
  children,
  ariaLabel,
}: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, pct));
  const off = c * (1 - clamped / 100);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={track}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 320ms ease" }}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 grid place-items-center">
          {children}
        </div>
      ) : null}
    </div>
  );
}
