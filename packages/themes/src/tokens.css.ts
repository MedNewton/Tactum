import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

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
};

export const vars = createGlobalThemeContract(contractShape, (_value, path) =>
  `--tctm-${path.join('-').replace('base', '').replace(/--/g, '-')}`.replace(/-$/, ''),
);

const light = {
  bg: '#ffffff',
  surface: { '1': '#F8FAFC', '2': '#F1F5F9', '3': '#E2E8F0' },
  surfaceAlias: '#F8FAFC',
  border: '#E2E8F0',
  text: { base: '#0F172A', secondary: '#334155', muted: '#64748B', inverse: '#ffffff' },
  accent: { base: '#2563EB', contrast: '#ffffff', soft: '#EFF6FF' },
  success: { base: '#15803D', contrast: '#ffffff', soft: '#ECFDF5' },
  warning: { base: '#B45309', contrast: '#ffffff', soft: '#FFFBEB' },
  danger: { base: '#B91C1C', contrast: '#ffffff', soft: '#FEF2F2' },
  info: { base: '#0369A1', contrast: '#ffffff', soft: '#F0F9FF' },
  ring: 'rgba(59,130,246,0.45)',
  overlay: 'rgba(2,6,23,0.60)',
  shadow: 'rgba(2,6,23,0.30)',
} as const;

const dark = {
  bg: '#0B1115',
  surface: { '1': '#0F1621', '2': '#141B26', '3': '#1B2430' },
  surfaceAlias: '#0F1621',
  border: '#243041',
  text: { base: '#F8FAFC', secondary: '#CBD5E1', muted: '#94A3B8', inverse: '#0B1115' },
  accent: { base: '#2563EB', contrast: '#ffffff', soft: '#0B1C36' },
  success: { base: '#15803D', contrast: '#ffffff', soft: '#0C1F17' },
  warning: { base: '#B45309', contrast: '#ffffff', soft: '#241705' },
  danger: { base: '#B91C1C', contrast: '#ffffff', soft: '#2A0E10' },
  info: { base: '#0369A1', contrast: '#ffffff', soft: '#071A25' },
  ring: 'rgba(59,130,246,0.45)',
  overlay: 'rgba(2,6,23,0.60)',
  shadow: 'rgba(2,6,23,0.30)',
} as const;

createGlobalTheme(':root', vars, light);
createGlobalTheme('.tactum', vars, light);
createGlobalTheme('[data-theme="light"]', vars, light);
createGlobalTheme('[data-theme="dark"]', vars, dark);

export const palettes = { light, dark };
