import React from 'react';
//import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import CompactButton from './CompactButton';
import { ThemeProvider } from 'styled-components/native';
import themeLloyds from '../../style-tokens/_re-imaginedlloyds.json';
import ButtonType  from './ButtonType';

const meta = {
  component: CompactButton,
  title: "CompactButton",
  tags: ['autodocs'],
  args: {
    children: "Button",
    brandAccent: false,
    icon: false,
    disabled: false,
  },
  decorators: [(Story) => <ThemeProvider theme={themeLloyds}><Story /></ThemeProvider>],
} satisfies Meta<typeof CompactButton>;

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