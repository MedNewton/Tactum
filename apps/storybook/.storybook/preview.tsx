import type { Preview, Decorator } from '@storybook/react';
import '@tactum/themes';
import React from 'react';
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
  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        padding: 16,
        background: 'var(--tctm-bg)',
        color: 'var(--tctm-text)',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    a11y: { disable: false },
  },
};

export default preview;
