/** Brutalist palette — use for section accents and multi-color UI blocks */
export const brutal = {
  ink: "var(--brutal-ink)",
  paper: "var(--brutal-paper)",
  paperAlt: "var(--brutal-paper-alt)",
  yellow: "var(--brutal-yellow)",
  cyan: "var(--brutal-cyan)",
  pink: "var(--brutal-pink)",
  lime: "var(--brutal-lime)",
  orange: "var(--brutal-orange)",
  violet: "var(--brutal-violet)",
  blue: "var(--brutal-blue)",
} as const;

export const brutalCardColors = [
  brutal.yellow,
  brutal.cyan,
  brutal.pink,
  brutal.lime,
  brutal.orange,
  brutal.violet,
] as const;

export const brutalShadow = "var(--brutal-shadow)";
export const brutalShadowLg = "var(--brutal-shadow-lg)";
export const brutalBorder = "var(--brutal-border)";
