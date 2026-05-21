import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// SerifIt — thin span wrapper that applies the Instrument Serif italic
// display font + tight letter-spacing. The font face IS italic (loaded
// with style: "italic" via next/font in src/app/layout.tsx) so a separate
// `italic` Tailwind utility is redundant.
//
// Lifted as a wrapper from prototype ui.jsx SerifIt. The value at call
// sites is intent legibility: `<SerifIt>{recipe.name}</SerifIt>` reads as
// "display this in the editorial typography" without the reader having
// to know that font-display happens to be Instrument Serif.

interface SerifItProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export function SerifIt({ className, children, ...rest }: SerifItProps) {
  return (
    <span
      className={cn("font-display tracking-[-0.01em]", className)}
      {...rest}
    >
      {children}
    </span>
  );
}
