import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@tactum/ui';

/** Inline icons */
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden focusable="false">
    <path
      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Chip> = {
  title: 'Tactum/Chip',
  component: Chip,
  args: {
    text: 'Chip',
    color: 'neutral',
    size: 'md',
    shiny: false,
  },
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Chip>;
type ChipArgs = React.ComponentProps<typeof Chip>;
type BaseChipArgs = Omit<
  ChipArgs,
  'as' | 'href' | 'type' | 'onClick' | 'disabled' | 'aria-disabled'
>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: (args: BaseChipArgs) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, max-content)',
        gap: '12px 16px',
        alignItems: 'center',
      }}
    >
      {(['success', 'error', 'warning', 'neutral'] as const).map((color) => (
        <React.Fragment key={color}>
          <Chip {...args} color={color} text={`${color}`} />
          <Chip {...args} color={color} shiny text={`${color} shiny`} />
          <Chip {...args} color={color} size="sm" text={`${color} sm`} />
          <Chip {...args} color={color} size="sm" shiny text={`${color} sm shiny`} />
        </React.Fragment>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args: BaseChipArgs) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip {...args} color="success" icon={<CheckIcon />} text="Success" />
      <Chip {...args} color="warning" icon={<AlertIcon />} text="Pending" shiny />
      <Chip {...args} color="error" icon={<AlertIcon />} iconPosition="end" text="Failed" />
      <Chip {...args} color="neutral" icon={<CheckIcon />} text="Archived" />
    </div>
  ),
};

export const Interactive: Story = {
  // do NOT spread union-conflicting args; pass only safe ones explicitly
  render: (args: Partial<BaseChipArgs>) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip
        as="button"
        onClick={() => console.log('clicked')}
        color="success"
        icon={<CheckIcon />}
        shiny
        text="Confirm"
        size={args.size ?? 'md'}
      />
      <Chip
        as="a"
        href="#"
        color="warning"
        icon={<AlertIcon />}
        text="Details"
        size={args.size ?? 'md'}
      />
      <Chip as="button" disabled color="error" text="Disabled" size={args.size ?? 'md'} />
      <Chip
        as="a"
        href="#"
        aria-disabled="true"
        color="neutral"
        text="Link (disabled)"
        size={args.size ?? 'md'}
      />
    </div>
  ),
};

export const Truncated: Story = {
  args: { text: 'This is a very very long chip label that should truncate nicely', truncate: true },
  render: (args: BaseChipArgs) => (
    <div style={{ display: 'flex', gap: 12, maxWidth: 320 }}>
      <Chip {...args} color="neutral" style={{ maxWidth: 140 }} />
      <Chip {...args} color="success" shiny style={{ maxWidth: 140 }} />
    </div>
  ),
};

export const DarkMode_AllVariants: Story = {
  ...AllVariants,
  args: {},
  globals: { theme: 'dark' },
};

export const DarkMode_WithIcons: Story = {
  ...WithIcons,
  args: {},
  globals: { theme: 'dark' },
};
