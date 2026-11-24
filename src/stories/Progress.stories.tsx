import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '../components/ui/Progress';
const meta = {
  title: '04 Feedback/Progress', component: Progress, tags: ['autodocs'],
  args: { value: 68, max: 100, label: 'Profile completion', showValue: true },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, table: { category: 'Values' } },
    max: { control: { type: 'number', min: 1, max: 1000 }, table: { category: 'Values' } },
    label: { control: 'text', table: { category: 'Content' } },
    showValue: { control: 'boolean', table: { category: 'Appearance' } }
  },
  render: (args) => <div className="cu-story-surface"><Progress {...args} /></div>
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100 } };
export const Minimal: Story = { args: { label: '', showValue: false } };
