import { type Meta, type StoryObj } from '@storybook/react';
import StoryWrapper from './StoryWrapper';
import { SpiderChart } from '@/components/Charts';
import { getVariableBackgroundColor } from '@/helpers/getVariableBackgroundColor';

const TEN = 10;

const meta = {
  title: 'modules/charts/RadarChart',
  component: StoryWrapper,
  argTypes: {},
} satisfies Meta<typeof SpiderChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RadarChartPositiveValues: Story = {
  args: {
    data: {
      sets: [
        {
          id: '856114',
          name: 'New Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 582,
            '108501': 253,
            '108504': 402,
            '108589': 788,
            '108597': 115,
          },
        },
        {
          id: '856121',
          name: 'All Products',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 782,
            '108501': 353,
            '108504': 702,
            '108589': 388,
            '108597': 415,
          },
        },
        {
          id: '187292',
          name: 'Common Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 382,
            '108501': 553,
            '108504': 902,
            '108589': 288,
            '108597': 215,
          },
        },
        {
          id: 'reference',
          name: 'Test',
          color: getVariableBackgroundColor(0),
          coordinates: {
            '108500': 0,
            '108501': 0,
            '108504': 0,
            '108589': 0,
            '108597': 0,
          },
        },
      ],
      variables: [
        {
          id: '108500',
          name: 'New Web Site',
        },
        {
          id: '108501',
          name: 'Add product to basket',
        },
        {
          id: '108504',
          name: 'Pick New Product',
        },
        {
          id: '108589',
          name: 'Make Order',
        },
        {
          id: '108597',
          name: 'Return Order',
        },
      ],
    },
  },
};

export const RadarChartNegativeValues: Story = {
  args: {
    data: {
      sets: [
        {
          id: '856114',
          name: 'New Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': -582,
            '108501': -353,
            '108504': -902,
            '108589': -288,
            '108597': -115,
            '108601': -173,
          },
        },
        {
          id: '856121',
          name: 'All Products',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': -882,
            '108501': -153,
            '108504': -702,
            '108589': -288,
            '108597': -115,
            '108601': -278,
          },
        },
        {
          id: '187292',
          name: 'Common Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': -382,
            '108501': -553,
            '108504': -702,
            '108589': -288,
            '108597': -215,
            '108601': -115,
          },
        },
        {
          id: 'reference',
          name: 'Test',
          color: getVariableBackgroundColor(0),
          coordinates: {
            '108500': 0,
            '108501': 0,
            '108504': 0,
            '108589': 0,
            '108597': 0,
            '108601': 0,
          },
        },
      ],
      variables: [
        {
          id: '108500',
          name: 'New Web Site',
        },
        {
          id: '108501',
          name: 'Add product to basket',
        },
        {
          id: '108504',
          name: 'Pick New Product',
        },
        {
          id: '108589',
          name: 'Make Order',
        },
        {
          id: '108597',
          name: 'Return Order',
        },
        {
          id: '108601',
          name: 'Remove From Basket',
        },
      ],
    },
  },
};

export const RadarChartPositiveAndNegativeValues: Story = {
  args: {
    data: {
      sets: [
        {
          id: '856114',
          name: 'New Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 782,
            '108501': 172,
            '108504': -327,
            '108589': 222,
            '108597': 115,
            '108601': 180,
          },
        },
        {
          id: '856121',
          name: 'All Products',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 277,
            '108501': 502,
            '108504': -170,
            '108589': 142,
            '108597': 580,
            '108601': 280,
          },
        },
        {
          id: '187292',
          name: 'Common Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': -977,
            '108501': 302,
            '108504': -277,
            '108589': 542,
            '108597': 180,
            '108601': 480,
          },
        },
        {
          id: 'reference',
          name: 'Test',
          color: getVariableBackgroundColor(0),
          coordinates: {
            '108500': 0,
            '108501': 0,
            '108504': 0,
            '108589': 0,
            '108597': 0,
            '108601': 0,
          },
        },
      ],
      variables: [
        {
          id: '108500',
          name: 'New Web Site',
        },
        {
          id: '108501',
          name: 'Add product to basket',
        },
        {
          id: '108504',
          name: 'Pick New Product',
        },
        {
          id: '108589',
          name: 'Make Order',
        },
        {
          id: '108597',
          name: 'Return Order',
        },
        {
          id: '108601',
          name: 'Remove From Basket',
        },
      ],
    },
  },
};

export const RadarChartTwoValuesPerLine: Story = {
  args: {
    data: {
      sets: [
        {
          id: '856114',
          name: 'New Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 582,
            '108501': 253,
          },
        },
        {
          id: '856121',
          name: 'All Products',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 782,
            '108501': 353,
          },
        },
        {
          id: '187292',
          name: 'Common Taste',
          color: getVariableBackgroundColor(Math.floor(Math.random() * TEN)),
          coordinates: {
            '108500': 382,
            '108501': 553,
          },
        },
        {
          id: 'reference',
          name: 'Test',
          color: getVariableBackgroundColor(0),
          coordinates: {
            '108500': 0,
            '108501': 0,
          },
        },
      ],
      variables: [
        {
          id: '108500',
          name: 'New Web Site',
        },
        {
          id: '108501',
          name: 'Add product to basket',
        },
      ],
    },
  },
};
