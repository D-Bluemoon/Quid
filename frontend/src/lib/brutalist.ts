/** Brutalist palette — use for section accents and multi-color UI blocks */
export const brutal = {
  ink: "#0A0A0A",
  paper: "#F4F0E6",
  paperAlt: "#FFFDF5",
  yellow: "#FFE600",
  cyan: "#00E5FF",
  pink: "#FF2D6F",
  lime: "#B8FF00",
  orange: "#FF6B00",
  violet: "#7C3AED",
  blue: "#2563EB",
} as const;

export const brutalCardColors = [
  brutal.yellow,
  brutal.cyan,
  brutal.pink,
  brutal.lime,
  brutal.orange,
  brutal.violet,
] as const;

export const brutalShadow = "4px 4px 0 0 #0A0A0A";
export const brutalShadowLg = "8px 8px 0 0 #0A0A0A";
export const brutalBorder = "3px solid #0A0A0A";
