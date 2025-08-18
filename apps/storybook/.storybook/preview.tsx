import type { Preview, Decorator } from '@storybook/react';
import React from 'react';

// Tokens + emitted CSS + UI styles + font
import '@tactum/themes';
import '@tactum/themes/styles.css';
import '@tactum/ui/styles.css';
import '@fontsource-variable/inter';
import './preview.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'UI theme',
    defaultValue: 'light' as 'light' | 'dark',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as 'light' | 'dark' | undefined) ?? 'light';

  React.useEffect(() => {
    // Apply theme to the iframe <html>
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Also update all common SB wrappers in case they get re-mounted
    const sels = [
      'body',
      '#storybook-root',
      '.sb-show-main',
      '.sb-main-centered',
      '.docs-story',
      '.sbdocs-wrapper',
      '.sbdocs-content',
      '.innerZoomElementWrapper',
    ] as const;

    sels.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.style.background = 'var(--tctm-bg)';
        el.style.color = 'var(--tctm-text)';
      });
    });
  }, [theme]);

  return (
    <div
      className="tactum"
      data-theme={theme} // keep for consumers that scope to a subtree
      style={{ minHeight: '100vh', padding: 16 }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    backgrounds: { disable: true }, // prevent SB from overriding canvas
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    a11y: { disable: false },
  },
};

export default preview;
