import * as React from 'react';
import { card } from '../styles/example.css';
import type { ExampleProps } from './Example.types';

/**
 * Example (temporary) component to validate build + SSR-safety.
 * - Pure UI. No side effects.
 * - Zero-CLS: fixed padding/shape.
 * - A11y: focus ring visible.
 */
export function ExampleCard({ title = 'Tactum', children }: ExampleProps) {
  return (
    <section className={card} role="region" aria-label={title}>
      <header style={{ fontWeight: 600 }}>{title}</header>
      <div>{children ?? 'Hello from @tactum/ui 👋'}</div>
    </section>
  );
}
