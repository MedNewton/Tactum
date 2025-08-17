import * as React from 'react';
import * as css from './NFTCard.css';
import type { NFTCardProps } from './NFTCard.types';

/**
 * NFT Card — SDK-agnostic, zero-CLS, SSR-safe.
 * - Pure UI: accepts data + slots; no fetching/SDK calls here.
 * - Zero-CLS: reserved media aspect ratio + fixed-height rows.
 * - A11y: region role, labels, visible focus via tokens.
 */
export function NFTCard({
  media,
  title,
  owner,
  price,
  floor,
  traits,
  badges,
  compact,
  loading,
  errored,
  onMediaError,
  actionSlot,
  footerSlot,
  className,
  style,
}: NFTCardProps) {
  const [imgError, setImgError] = React.useState(false);
  const hasError = !!errored || (media?.kind !== 'video' && imgError);

  // Loading skeleton
  if (loading) {
    return (
      <section
        className={`${css.root} ${className ?? ''}`}
        aria-busy="true"
        aria-live="polite"
        style={style}
      >
        <div className={css.mediaBox}>
          <div className={css.skel.media} aria-hidden />
        </div>
        <div className={css.header}>
          <div className={css.skel.lineWide} style={{ width: '60%' }} />
          <div className={css.skel.line} style={{ width: '25%' }} />
        </div>
        <div className={css.priceRow}>
          <div className={css.skel.line} style={{ width: '40%' }} />
          <div className={css.skel.line} style={{ width: '30%' }} />
        </div>
        <div className={css.traitsRow}>
          <div className={css.skel.chip} />
          <div className={css.skel.chip} />
          <div className={css.skel.chip} />
        </div>
        <div className={css.actionsRow}>
          <div className={css.skel.chip} />
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${css.root} ${className ?? ''}`}
      role="region"
      aria-label={title || 'NFT'}
      style={style}
    >
      <div className={css.mediaBox} aria-label="Media">
        {hasError || !media?.src ? (
          <div className={css.mediaFallback} role="img" aria-label="Media unavailable">
            Media unavailable
          </div>
        ) : media.kind === 'video' ? (
          <video
            className={css.video}
            src={media.src}
            muted
            playsInline
            preload="metadata"
            aria-label={media.alt || title || 'NFT video'}
          />
        ) : (
          <img
            className={css.img}
            src={media.src}
            alt={media.alt || title || 'NFT image'}
            loading="lazy"
            decoding="async"
            onError={() => {
              setImgError(true);
              onMediaError?.();
            }}
          />
        )}
      </div>

      <div className={css.header}>
        <div className={css.title} title={title || undefined}>
          {title || '—'}
        </div>
        {!compact && badges?.length ? (
          <div className={css.badgesRow} aria-label="Badges">
            {badges.slice(0, 3).map((b, i) => (
              <span key={i} className={css.badge}>
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {!compact && (
        <div className={css.owner} title={owner || undefined} aria-label="Owner">
          {owner || '—'}
        </div>
      )}

      <div className={css.priceRow}>
        <div className={css.price} aria-label="Price">
          {price?.formatted ?? '—'}
        </div>
        {!compact && floor?.formatted ? (
          <div className={css.floor} aria-label="Floor">
            Floor {floor.formatted}
          </div>
        ) : null}
      </div>

      {!compact && traits?.length ? (
        <div className={css.traitsRow} aria-label="Traits">
          {traits.slice(0, 4).map((t, i) => (
            <span key={i} className={css.trait}>
              {t.label}: {String(t.value)}
            </span>
          ))}
        </div>
      ) : null}

      <div className={css.actionsRow} aria-label="Actions">
        {actionSlot}
      </div>

      {footerSlot}
    </section>
  );
}
