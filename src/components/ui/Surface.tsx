"use client";

import type { ElementType, ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Surface — card wrapper with three switchable treatments. Lifted from
// prototype ui.jsx Surface. The prototype let the active treatment be
// switched at runtime via document.documentElement.dataset.cardStyle for the
// dev-toolbar's "Cards" toggle; this production version exposes the
// treatment via prop only (the runtime switcher is not shipped — it was
// developer chrome). Future ADR could revisit if Julie asks for it.
//
// bordered (default): card bg + rule border, no shadow. The reskin's
//   canonical surface treatment — used by every existing screen.
// glass: translucent card bg + frosted backdrop blur. Used sparingly:
//   sticky tab bars on long scroll surfaces, ChatDrawer header.
// flat: barely-tinted ink overlay over paper. Used for inset/nested
//   sub-surfaces that need to recede vs. a parent bordered surface.

type SurfaceTreatment = "bordered" | "glass" | "flat";

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  treatment?: SurfaceTreatment;
  children?: ReactNode;
}

const treatments: Record<SurfaceTreatment, string> = {
  bordered: "bg-card border border-rule",
  glass:
    "bg-card/70 border border-ink/[0.06] backdrop-blur-glass backdrop-saturate-glass shadow-glass",
  flat: "bg-ink/[0.03] border border-transparent",
};

export function Surface({
  as,
  treatment = "bordered",
  className,
  children,
  ...rest
}: SurfaceProps) {
  const Component = as || "div";
  return (
    <Component
      className={cn("rounded", treatments[treatment], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
