import type { Meta, StoryObj } from '@storybook/react';
import { ExampleCard } from '@tactum/ui';

const meta: Meta<typeof ExampleCard> = {
  title: 'Tactum/ExampleCard',
  component: ExampleCard,
  args: {
    title: 'Tactum Card',
    children: 'Hello from @tactum/ui 👋',
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof ExampleCard>;

export const Light: Story = { args: {} };

export const Dark: Story = {
  args: {},
  parameters: { backgrounds: { default: 'dark' } },
  globals: { theme: 'dark' },
};
