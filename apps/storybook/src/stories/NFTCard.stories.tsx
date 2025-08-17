import type { Meta, StoryObj } from '@storybook/react';
import { NFTCard } from '@tactum/ui';

const meta: Meta<typeof NFTCard> = {
  title: 'Tactum/NFTCard',
  component: NFTCard,
  args: {
    title: 'Chromie Squiggle #1234',
    owner: '0x1a2b...3c4d',
    media: { src: 'https://picsum.photos/seed/squiggle/800', kind: 'image', alt: 'Squiggle' },
    price: { formatted: '1.24 ETH', fiat: { value: 4123.45, currency: 'USD' } },
    floor: { formatted: '0.95 ETH' },
    traits: [
      { label: 'Colorway', value: 'Rainbow' },
      { label: 'Generation', value: 3 },
      { label: 'Rarity', value: 'Common' },
    ],
    badges: ['Verified', 'On sale'],
  },
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof NFTCard>;

export const Default: Story = {};
export const Compact: Story = { args: { compact: true } };
export const Loading: Story = { args: { loading: true } };
export const ErrorMedia: Story = {
  args: { media: { src: 'https://bad.url/img.png', kind: 'image' } },
};
export const Dark: Story = { args: {}, globals: { theme: 'dark' } };
