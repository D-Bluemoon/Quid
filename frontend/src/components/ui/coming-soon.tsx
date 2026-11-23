import type { ComponentType } from "react";
import { UPCOMING_FEATURES, type UpcomingFeatureId } from "@/lib/upcoming-features";

/**
 * Placeholder UI for features that aren't built yet. Both components render
 * nothing once the feature's status in `lib/upcoming-features.ts` is "live",
 * so the real implementation can replace them without layout leftovers.
 */

export function ComingSoonBadge({
  feature,
  className = "",
  showLabel = true,
}: {
  feature: UpcomingFeatureId;
  className?: string;
  /** When false, only the "Soon" pill is shown (for tight rows). */
  showLabel?: boolean;
}) {
  const config = UPCOMING_FEATURES[feature];
  if (config.status === "live") return null;

  return (
    <span
      title={`${config.label}: ${config.summary}`}
      data-upcoming-feature={feature}
      className={`inline-flex items-center gap-1.5 border-2 border-dashed border-foreground/60 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {showLabel && <span>{config.label}</span>}
      <span className="bg-brutal-yellow px-1 text-brutal-ink">Soon</span>
    </span>
  );
}

/** A non-interactive sidebar entry, styled like the sidebar links around it. */
export function ComingSoonNavItem({
  feature,
  icon: Icon,
}: {
  feature: UpcomingFeatureId;
  icon: ComponentType<{ size?: number }>;
}) {
  const config = UPCOMING_FEATURES[feature];
  if (config.status === "live") return null;

  return (
    <span
      title={config.summary}
      data-upcoming-feature={feature}
      className="flex cursor-not-allowed items-center gap-2 border-l-[4px] border-transparent py-2 pl-3 text-xs font-bold uppercase tracking-wide text-muted-foreground/70"
    >
      <Icon size={18} />
      <span>{config.label}</span>
      <span
        aria-hidden="true"
        className="ml-auto mr-1 bg-brutal-yellow px-1 text-[9px] font-black text-brutal-ink"
      >
        Soon
      </span>
      <span className="sr-only">(coming soon, not available yet)</span>
    </span>
  );
}
