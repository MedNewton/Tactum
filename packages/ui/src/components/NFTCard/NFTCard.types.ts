import * as React from 'react';

export type NFTMedia = {
  src: string;
  alt?: string;
  /** 'auto' (default) tries <img>, if it fails you can flip to 'video' manually in your app */
  kind?: 'image' | 'video' | 'auto';
};

export type Money = {
  formatted?: string; // e.g. "1.24 ETH"
  fiat?: { value?: number; currency?: string }; // e.g. 4123.45, "USD"
};

export type Trait = { label: string; value: string | number };

export type NFTCardProps = {
  media?: NFTMedia;
  title?: string;
  owner?: string;
  price?: Money; // current price or last sale
  floor?: Money; // collection floor (optional)
  traits?: Trait[];
  badges?: string[];
  /** Compact trims paddings and hides some secondary rows */
  compact?: boolean;

  /** UI states */
  loading?: boolean;
  errored?: boolean; // force an error visual
  onMediaError?: () => void;

  /** Slots */
  actionSlot?: React.ReactNode; // buy/list/transfer/custom
  footerSlot?: React.ReactNode; // anything extra

  className?: string;
  style?: React.CSSProperties;
};
