/**
 * Light, calm Veri-inspired system for older / middle-aged users.
 * Soft jade accent, quiet pastels, high contrast — no neon or dark mode.
 */
export const COLORS = {
  // Brand
  primary: '#3D6B5A',       // Deep jade — primary actions
  primarySoft: '#E8F2EE',   // Soft jade wash
  accent: '#C4784A',        // Warm terracotta — gentle highlight (not neon)
  accentSoft: '#F8EDE4',

  // Surfaces
  bg: '#F5F4F0',            // Warm light ground
  surface: '#FFFFFF',
  surfaceMuted: '#EEF1EF',
  border: '#D5DCD7',

  // Text
  text: '#1A2420',          // Near-black green for contrast
  textSecondary: '#4A5A52',
  textOnPrimary: '#FFFFFF',

  // Status (muted, readable)
  success: '#2F6B4F',
  successBg: '#E4F0EA',
  warning: '#9A6B2F',
  warningBg: '#F5EBD8',
  error: '#A33D3D',
  errorBg: '#F8E8E8',
  info: '#3A6A8A',
  infoBg: '#E6EEF4',

  // Metric tile tints (desaturated Veri bento)
  tileJade: '#D9E8E0',
  tileRose: '#F0E4E6',
  tileSky: '#E2EAF0',
  tileSand: '#F0E9DF',

  // Legacy aliases (keep screens compiling during migration)
  primaryGreen: '#3D6B5A',
  skyBlue: '#3A6A8A',
  warmOrange: '#C4784A',
  softYellow: '#F0E9DF',
  lavender: '#C9B8D4',
  bgLight: '#F5F4F0',
  textDark: '#1A2420',
  textMuted: '#4A5A52',
  white: '#FFFFFF',
  mintGreen: '#E4F0EA',
  peach: '#F8EDE4',
  teal: '#3D6B5A',
  lightLilac: '#EDE6F2',
};

export const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const ACCESSIBILITY = {
  minTouchTargetHeight: 56,
  fontSize: {
    title: 30,
    heading: 22,
    body: 18,
    caption: 16,
  },
  lineHeight: {
    title: 38,
    heading: 30,
    body: 28,
    caption: 24,
  },
  borderRadius: {
    sm: 12,
    md: 20,
    lg: 28,
    pill: 999,
  },
};

// Shared shadow tokens — soft, layered, no hard offsets
export const SHADOWS = {
  sm: {
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#475569',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 20,
    elevation: 8,
  },
  colored: (hex: string) => ({
    shadowColor: hex,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  }),
};
