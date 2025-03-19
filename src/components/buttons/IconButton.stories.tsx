import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import ButtonType  from './ButtonType';
import { ThemeProvider } from 'styled-components/native';
import themeLloyds from '../../style-tokens/_re-imaginedlloyds.json';
import Icons from './Icons';

const meta = {
  component: IconButton,
  title: "IconButton",
  tags: ['autodocs'],
  args: {
    brandAccent: false,
    disabled: false,
  },
  decorators: [(Story) => <ThemeProvider theme={themeLloyds}><Story /></ThemeProvider>],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: ButtonType.Primary,
  },
};

export const Secondary: Story = {
  args: {
    type: ButtonType.Secondary,
  },
};

export const Tertiary: Story = {
  args: {
    type: ButtonType.Tertiary,
  },
};