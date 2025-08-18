import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

// Apply only inside Tactum scopes
const scope = `.tactum, [data-theme]`;

globalStyle(scope, {
  fontFamily: vars.font.sans,
  // numeric features that help dashboards (no CLS)
  fontVariantNumeric: 'tabular-nums lining-nums',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
  color: vars.text.base,
  background: vars.bg,
});

// Controls inherit the font
globalStyle(`${scope} :where(button, input, select, textarea)`, {
  font: 'inherit',
});
