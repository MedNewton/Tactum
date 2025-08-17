import { style } from '@vanilla-extract/css';

export const card = style({
  display: 'grid',
  gap: '8px',
  borderRadius: '12px',
  padding: '12px',
  border: '1px solid var(--tctm-border, rgba(0,0,0,0.1))',
  background: 'var(--tctm-surface, #fff)',
  color: 'var(--tctm-text, #111)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid var(--tctm-accent, #5b8cff)',
      outlineOffset: '2px',
    },
  },
});
