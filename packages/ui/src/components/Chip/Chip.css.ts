import { style, styleVariants } from '@vanilla-extract/css';

/**
 * CHIP CSS (token-only)
 * Theme-aware via CSS variables from @tactum/themes.
 */

/* ---------- sizing ---------- */
const HEIGHT = { sm: '20px', md: '28px' };
const PAD_X = { sm: '8px', md: '12px' };
const GAP = { sm: '6px', md: '8px' };
const RADIUS = '9999px';

/* ---------- base ---------- */
export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  verticalAlign: 'middle',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  borderRadius: RADIUS,
  borderWidth: '1px',
  borderStyle: 'solid',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition:
    'background-color .15s ease, border-color .15s ease, box-shadow .15s ease, filter .15s ease',

  selectors: {
    "&[data-truncate='true']": {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    },

    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px var(--tctm-ring)`,
    },

    "&[data-interactive='true']": { cursor: 'pointer' },
    "&[data-interactive='true']:hover": { filter: 'brightness(1.03)' },
    "&[data-interactive='true']:active": { filter: 'brightness(0.98)' },

    '&:where(button[disabled], [aria-disabled="true"])': {
      opacity: 0.6,
      cursor: 'not-allowed',
      filter: 'none',
    },
  },
});

/* ---------- sizes ---------- */
export const size = styleVariants({
  sm: {
    height: HEIGHT.sm,
    paddingInline: PAD_X.sm,
    fontSize: '12px',
    fontWeight: '500',
    gap: GAP.sm,
  },
  md: {
    height: HEIGHT.md,
    paddingInline: PAD_X.md,
    fontSize: '13px',
    fontWeight: '500',
    gap: GAP.md,
  },
});

/* ---------- slots ---------- */
export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
});
export const text = style({ overflow: 'hidden', textOverflow: 'ellipsis' });

/* ---------- tone variants (dark-first defaults) ---------- */
const darkCommon = {
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -6px 18px rgba(0,0,0,0.35)',
};

export const tone = styleVariants({
  success: {
    background: 'color-mix(in srgb, var(--tctm-success) 18%, transparent)',
    borderColor: 'color-mix(in srgb, var(--tctm-success) 38%, transparent)',
    color: 'var(--tctm-success-contrast)',
    ...darkCommon,
  },
  error: {
    background: 'color-mix(in srgb, var(--tctm-danger) 18%, transparent)',
    borderColor: 'color-mix(in srgb, var(--tctm-danger) 38%, transparent)',
    color: 'var(--tctm-danger-contrast)',
    ...darkCommon,
  },
  warning: {
    background: 'color-mix(in srgb, var(--tctm-warning) 18%, transparent)',
    borderColor: 'color-mix(in srgb, var(--tctm-warning) 38%, transparent)',
    color: 'var(--tctm-warning-contrast)',
    ...darkCommon,
  },
  neutral: {
    background: 'color-mix(in srgb, var(--tctm-text-muted) 14%, transparent)',
    borderColor: 'color-mix(in srgb, var(--tctm-text-muted) 28%, transparent)',
    color: 'var(--tctm-text-secondary)',
    ...darkCommon,
  },
});

/* ---------- light theme overrides ---------- */
export const lightThemeOverrides = style({
  selectors: {
    "[data-theme='light'] &[data-color='success']": {
      background: 'var(--tctm-success-soft)',
      borderColor: 'color-mix(in srgb, var(--tctm-success) 22%, #ffffff)',
      color: 'var(--tctm-success)',
    },
    "[data-theme='light'] &[data-color='error']": {
      background: 'var(--tctm-danger-soft)',
      borderColor: 'color-mix(in srgb, var(--tctm-danger) 22%, #ffffff)',
      color: 'var(--tctm-danger)',
    },
    "[data-theme='light'] &[data-color='warning']": {
      background: 'var(--tctm-warning-soft)',
      borderColor: 'color-mix(in srgb, var(--tctm-warning) 22%, #ffffff)',
      color: 'var(--tctm-warning)',
    },
    "[data-theme='light'] &[data-color='neutral']": {
      background: 'var(--tctm-surface-3)',
      borderColor: 'var(--tctm-border)',
      color: 'var(--tctm-text-muted)',
    },
  },
});

/* ---------- shiny overlay (static top light) ---------- */
export const shinyWrap = style({ isolation: 'isolate', position: 'relative' });

/**
 * Host overlay for two static layers:
 *  - ::before → large tinted halo centered above the chip (tinted via overlayTone[color])
 *  - ::after  → thin white rim near the top edge
 */
export const shinyOverlay = style({
  pointerEvents: 'none',
  position: 'absolute',
  inset: 0,
  borderRadius: RADIUS,
  overflow: 'hidden',

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-10%',
      right: '-10%',
      top: '-55%',
      height: '180%',
      borderRadius: '50%',
      filter: 'blur(14px)',
      opacity: 0.7,
      mixBlendMode: 'screen',
      // background set by overlayTone[color]
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      left: '6%',
      right: '6%',
      top: '6%',
      height: '22%',
      borderRadius: '50%',
      background:
        'linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,.15) 60%, transparent)',
      filter: 'blur(10px)',
      opacity: 0.55,
      mixBlendMode: 'screen',
    },

    "[data-theme='light'] &::before": { opacity: 0.35, filter: 'blur(10px)' },
    "[data-theme='light'] &::after": { opacity: 0.35, filter: 'blur(8px)' },
  },
});

/** Per-tone tint for the halo (::before) */
export const overlayTone = styleVariants({
  success: {
    selectors: {
      '&::before': {
        background:
          'radial-gradient(120% 160% at 50% 0%, color-mix(in srgb, var(--tctm-success) 60%, transparent) 0%, transparent 70%)',
      },
    },
  },
  error: {
    selectors: {
      '&::before': {
        background:
          'radial-gradient(120% 160% at 50% 0%, color-mix(in srgb, var(--tctm-danger) 60%, transparent) 0%, transparent 70%)',
      },
    },
  },
  warning: {
    selectors: {
      '&::before': {
        background:
          'radial-gradient(120% 160% at 50% 0%, color-mix(in srgb, var(--tctm-warning) 60%, transparent) 0%, transparent 70%)',
      },
    },
  },
  neutral: {
    selectors: {
      '&::before': {
        background:
          'radial-gradient(120% 160% at 50% 0%, color-mix(in srgb, var(--tctm-text-muted) 55%, transparent) 0%, transparent 70%)',
      },
    },
  },
});
