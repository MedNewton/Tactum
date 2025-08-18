import * as React from 'react';

/**
 * Visual color role of the chip.
 *
 * @remarks
 * These map to theme tokens in `@tactum/themes`:
 * - `success` → `vars.success`
 * - `error`   → `vars.danger` (naming aligns with common UI copy)
 * - `warning` → `vars.warning`
 * - `neutral` → neutral/text/border tokens
 *
 * No `theme` prop is required; the component adapts to light/dark using CSS variables.
 */
export type ChipColor = 'success' | 'error' | 'warning' | 'neutral';

/**
 * Props shared by all Chip render modes.
 * Use one of the polymorphic variants (`span` | `button` | `a`) below.
 */
export interface ChipBaseProps {
  /**
   * Visual color role for the pill.
   *
   * @defaultValue "neutral"
   * @example
   * ```tsx
   * <Chip color="success" text="Deposited" />
   * ```
   */
  color?: ChipColor;

  /**
   * The text content rendered inside the pill.
   *
   * @remarks
   * - Rendered as plain text for predictable layout (zero-CLS).
   * - Use `truncate` to ellipsize long labels inside tight table cells.
   * - Consider providing `title` if you also enable `truncate`.
   */
  text: string;

  /**
   * Optional icon displayed with the text (typically start/leading).
   *
   * @remarks
   * - Any React node is accepted (SVG, emoji, etc).
   * - The component treats it as **decorative** and sets `aria-hidden`.
   *   If the icon conveys meaning, include that in `text` or `title`.
   */
  icon?: React.ReactNode;

  /**
   * Adds a subtle animated highlight behind the label (see design reference).
   *
   * @remarks
   * - Motion respects `prefers-reduced-motion` and will be disabled for those users.
   * - Purely visual; does not change semantics.
   *
   * @defaultValue false
   */
  shiny?: boolean;

  /**
   * Compactness of the chip.
   *
   * @remarks
   * - `sm` is tuned for dense tables.
   * - `md` works well in cards and general UI.
   *
   * @defaultValue "md"
   */
  size?: 'sm' | 'md';

  /**
   * Placement of the optional `icon` relative to `text`.
   *
   * @defaultValue "start"
   */
  iconPosition?: 'start' | 'end';

  /**
   * When `true`, constrains content to a single line and applies an ellipsis.
   *
   * @remarks
   * Use `title` to expose the full value on hover if truncation is enabled.
   *
   * @defaultValue false
   */
  truncate?: boolean;

  /**
   * ARIA live region politeness for dynamic status chips (e.g., Pending → Success).
   *
   * @remarks
   * Only set this if the chip's text is expected to change after initial render.
   * Overuse can be noisy for screen reader users.
   *
   * @defaultValue "off"
   */
  ariaLive?: 'off' | 'polite' | 'assertive';

  /**
   * Additional class names to merge with the component's styles.
   */
  className?: string;

  /**
   * Inline style escape hatch.
   */
  style?: React.CSSProperties;

  /**
   * Native tooltip and accessibility hint.
   *
   * @remarks
   * Recommended when using `truncate` so the full label is accessible on hover.
   */
  title?: string;
}

/**
 * Non-interactive pill (default). Renders as `<span>`.
 *
 * @remarks
 * Choose this when the chip conveys status only and **is not clickable**.
 */
export interface ChipAsSpanProps extends ChipBaseProps {
  /**
   * Element to render. Omit or set to `"span"` for a non-interactive chip.
   *
   * @defaultValue "span"
   */
  as?: 'span';
}

/**
 * Interactive chip rendered as `<button>`.
 *
 * @remarks
 * - Use when the chip performs an action (e.g., filter toggle).
 * - Forwards standard button attributes (except the HTML `color` attribute).
 * - Receives keyboard focus and shows the focus ring via theme tokens.
 */
export interface ChipAsButtonProps
  extends ChipBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /**
   * Render as a native `<button>`.
   */
  as: 'button';

  /**
   * Click handler for the button form.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Disabled state of the button chip.
   */
  disabled?: boolean;
}

/**
 * Link-style chip rendered as `<a>`.
 *
 * @remarks
 * - Use when the chip navigates to another view (e.g., explorer link).
 * - Forwards standard anchor attributes (except the HTML `color` attribute).
 */
export interface ChipAsAnchorProps
  extends ChipBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Render as a native `<a>`.
   */
  as: 'a';

  /**
   * Destination URL for the anchor chip.
   */
  href: string;
}

/**
 * Public prop union for the Chip component.
 *
 * @example Basic
 * ```tsx
 * <Chip color="warning" text="Pending" shiny icon={<ClockIcon />} />
 * ```
 *
 * @example Button chip
 * ```tsx
 * <Chip as="button" color="neutral" text="Archived" onClick={() => ...} />
 * ```
 *
 * @example Link chip
 * ```tsx
 * <Chip as="a" href="https://etherscan.io/tx/…" color="success" text="Success" />
 * ```
 */
export type ChipProps = ChipAsSpanProps | ChipAsButtonProps | ChipAsAnchorProps;
