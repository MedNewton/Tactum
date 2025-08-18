import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

/** Theme contract — extended with font tokens */
const contractShape = {
  bg: null,
  surface: { '1': null, '2': null, '3': null },
  surfaceAlias: null,
  border: null,
  text: { base: null, secondary: null, muted: null, inverse: null },
  accent: { base: null, contrast: null, soft: null },
  success: { base: null, contrast: null, soft: null },
  warning: { base: null, contrast: null, soft: null },
  danger: { base: null, contrast: null, soft: null },
  info: { base: null, contrast: null, soft: null },
  ring: null,
  overlay: null,
  shadow: null,

  // NEW
  font: {
    sans: null,
    mono: null,
    weight: { regular: null, medium: null, semibold: null, bold: null },
  },
} as const;

export const vars = createGlobalThemeContract(contractShape, (_value, path) =>
  `--tctm-${path.join('-').replace('base', '').replace(/--/g, '-')}`.replace(/-$/, ''),
);

/**
 * Light/Dark palettes (colors unchanged from your current file).
 * Font tokens are identical for both modes.
 */
const sharedFont = {
  // If "InterVariable" is loaded by the app/Storybook it will be used;
  // otherwise we fall back to the platform UI stack (no layout shift).
  sans: 'InterVariable, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
} as const;

const light = {
  bg: '#FAFAFA',
  surface: { '1': '#FFFFFF', '2': '#FAFAFA', '3': '#F5F5F5' },
  surfaceAlias: '#FFFFFF',
  border: '#E5E5E5',
  text: { base: '#171717', secondary: '#404040', muted: '#525252', inverse: '#FFFFFF' },
  accent: { base: '#2563EB', contrast: '#FFFFFF', soft: '#EFF6FF' },
  success: { base: '#16A34A', contrast: '#FFFFFF', soft: '#F0FDF4' },
  warning: { base: '#EA580C', contrast: '#FFFFFF', soft: '#FFF7ED' },
  danger: { base: '#DC2626', contrast: '#FFFFFF', soft: '#FEF2F2' },
  info: { base: '#0891B2', contrast: '#FFFFFF', soft: '#ECFEFF' },
  ring: 'rgba(37, 99, 235, 0.45)',
  overlay: 'rgba(0, 0, 0, 0.60)',
  shadow: 'rgba(0, 0, 0, 0.30)',
  font: sharedFont,
} as const;

const dark = {
  bg: '#000000',
  surface: { '1': '#0A0A0A', '2': '#171717', '3': '#262626' },
  surfaceAlias: '#0A0A0A',
  border: 'rgba(255, 255, 255, 0.16)',
  text: { base: '#F5F5F5', secondary: '#D4D4D4', muted: '#A3A3A3', inverse: '#000000' },
  accent: { base: '#2563EB', contrast: '#FFFFFF', soft: '#172554' },
  success: { base: '#16A34A', contrast: '#FFFFFF', soft: '#052E16' },
  warning: { base: '#EA580C', contrast: '#FFFFFF', soft: '#431407' },
  danger: { base: '#DC2626', contrast: '#FFFFFF', soft: '#450A0A' },
  info: { base: '#0891B2', contrast: '#FFFFFF', soft: '#083344' },
  ring: 'rgba(37, 99, 235, 0.45)',
  overlay: 'rgba(0, 0, 0, 0.60)',
  shadow: 'rgba(0, 0, 0, 0.50)',
  font: sharedFont,
} as const;

createGlobalTheme(':root', vars, light);
createGlobalTheme('.tactum', vars, light);
createGlobalTheme('[data-theme="light"]', vars, light);
createGlobalTheme('[data-theme="dark"]', vars, dark);

export const palettes = { light, dark };
