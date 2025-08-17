import { style, styleVariants } from '@vanilla-extract/css';

export const root = style({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: '10px',
  borderRadius: '12px',
  border: '1px solid var(--tctm-border)',
  background: 'var(--tctm-surface-1)',
  color: 'var(--tctm-text)',
  padding: '12px',
  boxShadow: '0 1px 2px var(--tctm-shadow)',
  selectors: {
    '&:focus-within': {
      outline: '2px solid var(--tctm-ring)',
      outlineOffset: '2px',
    },
  },
});

export const mediaBox = style({
  // Zero-CLS: reserve space; square by default; consumer can override via style
  aspectRatio: '1 / 1',
  width: '100%',
  borderRadius: '10px',
  overflow: 'hidden',
  background: 'var(--tctm-surface-2)',
  position: 'relative',
});

export const img = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const video = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const mediaFallback = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  fontSize: '12px',
  color: 'var(--tctm-text-muted)',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  minHeight: 18, // fixed height to prevent shift when title loads
});

export const title = style({
  fontWeight: 600,
  fontSize: '14px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const owner = style({
  fontSize: '12px',
  color: 'var(--tctm-text-muted)',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const badgesRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
});

export const badge = style({
  borderRadius: '999px',
  fontSize: '11px',
  padding: '2px 8px',
  background: 'var(--tctm-accent-soft)',
  color: 'var(--tctm-accent)',
});

export const priceRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  minHeight: 18,
});

export const price = style({
  fontWeight: 600,
  fontSize: '13px',
});

export const floor = style({
  fontSize: '12px',
  color: 'var(--tctm-text-muted)',
});

export const traitsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
});

export const trait = style({
  fontSize: '11px',
  borderRadius: '6px',
  padding: '2px 6px',
  border: '1px solid var(--tctm-border)',
  background: 'var(--tctm-surface-2)',
  color: 'var(--tctm-text-secondary)',
});

export const actionsRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
});

export const skeleton = style({
  background: 'linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06))',
  backgroundSize: '200% 100%',
});

export const skel = styleVariants({
  line: [skeleton, { height: 12, borderRadius: 6 }],
  lineWide: [skeleton, { height: 14, borderRadius: 6 }],
  chip: [skeleton, { height: 16, width: 60, borderRadius: 8 }],
  media: [skeleton, { height: '100%', width: '100%' }],
});
