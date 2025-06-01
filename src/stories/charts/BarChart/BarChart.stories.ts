import { type Meta, type StoryObj } from '@storybook/react';
import StoryWrapper from './StoryWrapper';
import { BarChart } from '@/components/Charts';
import { getVariableBackgroundColor } from '@/helpers/getVariableBackgroundColor';

const ONE_HUNDRED = 100;

const meta = {
  title: 'modules/charts/BarChart',
  component: StoryWrapper,
  argTypes: {},
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BarChartStory: Story = {
  args: {
    indicators: [
      {
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          hasBorder: true,
        },
        bar: {
          name: 'Test 1',
          id: 228858,
          value: 2660565,
        },
        marker: {
          name: 'Test 1',
          id: 228858,
          value: 10.7,
        },
      },
      {
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          hasBorder: true,
        },
        bar: {
          name: 'Test 2',
          id: 166047,
          value: 1950205,
        },
        marker: {
          name: 'Test 2',
          id: 166047,
          value: 12.46,
        },
      },
      {
        theme: {
          color: getVariableBackgroundColor(
            Math.floor(Math.random() * ONE_HUNDRED),
          ),
          hasBorder: true,
        },
        bar: {
          name: 'Test 3',
          id: 145268,
          value: 3950205,
        },
        marker: {
          name: 'Test 3',
          id: 145268,
          value: 5.3,
        },
      },
    ],
  },
};
