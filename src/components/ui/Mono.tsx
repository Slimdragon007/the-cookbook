import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Mono — thin span wrapper for JetBrains Mono with tabular-nums + tight
// letter-spacing. Use anywhere a number sits next to another number Julie
// might compare across rows (macros, log times, ranks in Pulse top-recipes).
//
// Lifted from prototype ui.jsx Mono. Same intent-legibility rationale as
// SerifIt: `<Mono>{kcal}</Mono>` reads as "this is a measurement-grade
// number" without coupling call sites to which monospaced font is loaded.

interface MonoProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function Mono({ className, children, ...rest }: MonoProps) {
  return (
    <span
      className={cn("font-mono tabular-nums tracking-[-0.02em]", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
