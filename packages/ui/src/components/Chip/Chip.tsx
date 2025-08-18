import * as React from 'react';
import type { ChipProps, ChipAsButtonProps, ChipAsAnchorProps } from './Chip.types';
import * as s from './Chip.css';

/** internal className joiner (no extra dep) */
const cx = (...v: Array<string | false | undefined>) => v.filter(Boolean).join(' ');

type NativeSpan = React.HTMLAttributes<HTMLSpanElement>;
type NativeButton = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;
type NativeAnchor = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>;

function isButtonProps(p: ChipProps): p is ChipAsButtonProps {
  return (p as { as?: string }).as === 'button';
}
function isAnchorProps(p: ChipProps): p is ChipAsAnchorProps {
  return (p as { as?: string }).as === 'a';
}

/** Keys that belong to the Chip itself and must not leak to DOM. */
const OWN_KEYS = [
  'as',
  'color',
  'text',
  'icon',
  'shiny',
  'size',
  'iconPosition',
  'truncate',
  'ariaLive',
  'className',
  'style',
  'title',
] as const;
type OwnKey = (typeof OWN_KEYS)[number];

/** Create a shallow copy of props without Chip's own keys (keeps aria/data attributes). */
function getNativeProps(obj: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (obj && typeof obj === 'object') {
    const rec = obj as Record<string, unknown>;
    for (const k of Object.keys(rec)) {
      if (!OWN_KEYS.includes(k as OwnKey)) out[k] = rec[k];
    }
  }
  return out;
}

export const Chip = React.forwardRef<
  HTMLSpanElement | HTMLButtonElement | HTMLAnchorElement,
  ChipProps
>(function Chip(props, ref) {
  const {
    color = 'neutral',
    text,
    icon,
    shiny = false,
    size = 'md',
    iconPosition = 'start',
    truncate = false,
    ariaLive = 'off',
    className,
    style,
    title,
  } = props;

  const toneClass =
    color === 'success'
      ? s.tone.success
      : color === 'error'
        ? s.tone.error
        : color === 'warning'
          ? s.tone.warning
          : s.tone.neutral;

  const baseClass = cx(
    s.root,
    s.size[size],
    toneClass,
    s.lightThemeOverrides,
    shiny && s.shinyWrap,
    className,
  );

  // ---- BUTTON BRANCH --------------------------------------------------------
  if (isButtonProps(props)) {
    const nativeUnknown = getNativeProps(props) as unknown as NativeButton;
    // ensure buttons don't submit forms by default
    if (nativeUnknown.type == null) nativeUnknown.type = 'button';
    const disabled = Boolean(nativeUnknown.disabled);
    const interactive = !disabled;

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...nativeUnknown}
        className={baseClass}
        style={style}
        data-color={color}
        data-interactive={interactive ? 'true' : undefined}
        data-truncate={truncate ? 'true' : undefined}
        title={title}
        aria-live={ariaLive === 'off' ? undefined : ariaLive}
      >
        {icon && iconPosition === 'start' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        <span className={s.text}>{text}</span>
        {icon && iconPosition === 'end' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        {shiny && <span className={cx(s.shinyOverlay, s.overlayTone[color])} aria-hidden />}
      </button>
    );
  }

  // ---- ANCHOR BRANCH --------------------------------------------------------
  if (isAnchorProps(props)) {
    const nativeUnknown = getNativeProps(props) as unknown as NativeAnchor;
    const ariaDis = (nativeUnknown as unknown as Record<string, unknown>)['aria-disabled'];
    const disabled = ariaDis === true || ariaDis === 'true';
    const interactive = !disabled;

    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...nativeUnknown}
        className={baseClass}
        style={style}
        data-color={color}
        data-interactive={interactive ? 'true' : undefined}
        data-truncate={truncate ? 'true' : undefined}
        title={title}
        aria-live={ariaLive === 'off' ? undefined : ariaLive}
      >
        {icon && iconPosition === 'start' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        <span className={s.text}>{text}</span>
        {icon && iconPosition === 'end' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        {shiny && <span className={cx(s.shinyOverlay, s.overlayTone[color])} />}
      </a>
    );
  }

  // ---- SPAN BRANCH (default) -----------------------------------------------
  {
    const nativeUnknown = getNativeProps(props) as unknown as NativeSpan;
    const interactive = false;

    return (
      <span
        ref={ref as React.ForwardedRef<HTMLSpanElement>}
        {...nativeUnknown}
        className={baseClass}
        style={style}
        data-color={color}
        data-interactive={interactive ? 'true' : undefined}
        data-truncate={truncate ? 'true' : undefined}
        title={title}
        aria-live={ariaLive === 'off' ? undefined : ariaLive}
      >
        {icon && iconPosition === 'start' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        <span className={s.text}>{text}</span>
        {icon && iconPosition === 'end' && (
          <span className={s.icon} aria-hidden>
            {icon}
          </span>
        )}
        {shiny && <span className={cx(s.shinyOverlay, s.overlayTone[color])} />}
      </span>
    );
  }
});
