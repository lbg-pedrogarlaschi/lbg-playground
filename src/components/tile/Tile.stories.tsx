import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components/native';
import themeLloyds from '../../style-tokens/re-imaginedlloyds.json';
import Tile from './Tile';

const meta = {
  component: Tile,
  title: "Tile",
  tags: ['autodocs'],
  args: {
    description: "description",
    link: "link",
  },

  decorators: [
    (Story) => <ThemeProvider theme={themeLloyds}><Story /></ThemeProvider>,
  ],
  parameters: {
    backgrounds: {
      default: 'light gray',
      values: [
        { name: 'default', value: '#ffffff' },
        { name: 'light gray', value: '#F1F1F1' }, // Add your custom color here
      ],
    },
  },

} satisfies Meta<typeof Tile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  parameters: {
    backgrounds: {
      default: 'light gray', // Set the default background for this story
    },
  },

  args: {

  },
};
