export const COLORS = {
  // Primary Palette
  primaryGreen: '#2E7D32',
  primaryGreenLight: '#4CAF50',  // Lighter green for hover/active
  skyBlue: '#4DA3D9',
  skyBlueLight: '#E3F2FD',       // Light blue tint for backgrounds
  warmOrange: '#F2994A',
  softYellow: '#FDE68A',
  lavender: '#A78BFA',
  lavenderLight: '#F3F0FF',      // Lavender tint for backgrounds

  // Neutral Palette
  bgLight: '#F7F8FC',            // Slightly warmer background
  surface: '#F1F5F9',
  surfaceElevated: '#FFFFFF',    // Pure white for top-level cards
  border: '#E2E8F0',             // Softer border
  borderSubtle: '#F1F5F9',       // Ultra-subtle border
  textDark: '#1A202C',           // Slightly richer dark
  textMuted: '#64748B',          // Better muted
  textSubtle: '#94A3B8',         // Even lighter for hints
  white: '#FFFFFF',

  // Feedback/Status Palette
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Accent Palette
  mintGreen: '#A7F3D0',
  mintGreenDark: '#6EE7B7',
  peach: '#FFD8C2',
  peachDark: '#FDBA74',
  teal: '#14B8A6',
  lightLilac: '#E9D5FF',
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
    title: 28,
    heading: 22,
    body: 18,
    caption: 15,
    micro: 12,
  },
  lineHeight: {
    title: 38,
    heading: 32,
    body: 28,
    caption: 22,
  },
  borderRadius: {
    sm: 10,
    md: 18,
    lg: 26,
    xl: 32,
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
