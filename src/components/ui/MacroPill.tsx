import { cn } from "@/lib/utils";

// MacroPill — atomic macro display: JetBrains Mono numeric value + unit on top,
// uppercase tracked label below. Used inline (Today snapshot card, Desktop
// Library right rail) where MacroGrid's 4-cell layout is overkill.
//
// Lifted from prototype ui.jsx MacroPill. The original had a thicker variant
// system (sm | md); kept here as a `size` prop.

interface MacroPillProps {
  label: string;
  value: number | string;
  unit?: string;
  /** Highlights the pill with the accent-soft background + accent-ink text. */
  accent?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function MacroPill({
  label,
  value,
  unit,
  accent = false,
  size = "md",
  className,
}: MacroPillProps) {
  const padding = size === "sm" ? "px-2.5 py-1.5" : "px-3.5 py-2.5";
  const valueSize = size === "sm" ? "text-[13px]" : "text-lg";
  const labelSize = size === "sm" ? "text-[9px]" : "text-[10px]";
  const unitSize = size === "sm" ? "text-[10px]" : "text-sm";

  return (
    <div
      className={cn(
        "inline-flex flex-col items-start gap-0.5 rounded-md min-w-14",
        padding,
        accent ? "bg-accent-soft text-accent-ink" : "bg-ink/[0.04] text-ink",
        className,
      )}
    >
      <span
        className={cn(
          "font-mono font-medium tabular-nums tracking-[-0.02em]",
          valueSize,
        )}
      >
        {value}
        {unit ? (
          <span className={cn("ml-0.5 opacity-50", unitSize)}>{unit}</span>
        ) : null}
      </span>
      <span
        className={cn(
          "font-sans font-semibold tracking-[0.08em] uppercase",
          labelSize,
          accent ? "text-accent-ink" : "text-ink-soft",
        )}
      >
        {label}
      </span>
    </div>
  );
}
